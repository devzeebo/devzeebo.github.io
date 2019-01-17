# NUnit and ThreadLocal

Recently, I was experimenting with some alternative ways to write unit tests.
I've recently adopted the **G**iven **W**hen **T**hen mode of unit testing
and had great success with it. After discussing things with a friend of mine,
[Claudio Lassala](https://lassala.net), I really got in to his style of unit
tests, even though they violate C# naming norms. Basically, keep your test
methods short and human readable, hiding variables and messy code behind
methods with pretty names:
```csharp
[TestFixture]
public partial class CalendarTests {

  [Test]
  public void Adding_EVEN_numbers() {

    Given_calculator();

    When_adding_odd_numbers();

    Then_result_is_EVEN();
  }

  [Test]
  public void Memory_test() {
    
    Given_calculator_with_value_stored();

    When_adding_single_number();

    Then_memory_is_added_to_operand();
  }
}
```

I really like how clean the unit tests become and how they translate into
user stories. Additionally, the implementation details of these methods are
only a single `F12` away. The downside, is now we have to abstract the actual
implementation of these tests into separate methods that don't communicate
with each other via returns or arguments... so the only way is via local
fields on the test class (or some other static context... ew.)

```csharp
public partial class CalculatorTests {
  #region locals
  Calculator calculator;
  double result;
  #endregion

  #region givens
  void Given_calculator() {
    calculator = new Calculator();
  }
  void Given_calculator_with_value_stored() {
    calculator = new Calculator {
      Memory = double[] { 5 }
    };
  }
  #endregion

  #region whens
  void When_adding_odd_numbers() {
    result = calculator.Add(1, 3);
  }
  void When_adding_single_number() {
    result = calculator.Add(5);
  }
  #endregion

  #region thens
  void Then_result_is_even() {
    (result % 2).Should().Be(0);
  }
  void Then_memory_is_added_to_operand() {
    result.Should().Be(10);
  }
  #endregion
}
```

This is all fine and yields some very readable unit tests. Running any of
these unit tests individually will yield successful tests passing. The
problem comes when you accidentally run these tests in parallel. With both
tests running at the same time, the race condition might blow away the
calculator in either test, given a different system under test. Imagine
the chaos when there are mocks being verified involved! So, to prevent
this we have two options:

1) Don't run our tests in parallel and suffer the performance penalty
2) Make our tests thread safe.

I wasn't satisfied with option 1 because these are _unit_ tests, not
integration tests, and should be able to be run in parallel since they're
doing all the setup they need. This leaves us with option 2.

## Introducing ThreadLocal

C# has a fancy class called `ThreadLocal`
([msdn](https://docs.microsoft.com/en-us/dotnet/api/system.threading.threadlocal-1)).
It is kind of like a `Nullable` type, except instead of turning a value type
into a reference, it guarantees your variable is unique per thread! Sounds
like exactly what we want! Through the magic of `ThreadLocal` we can easily
fix our parallel problem! (If we wanted to remove the call to `.Value`
everywhere, we could treat the `ThreadLocal` like the backing field to
properties)


```csharp
public partial class CalculatorTests {
  #region locals
  ThreadLocal<Calculator> calculator = new ThreadLocal<Calculator>();
  ThreadLocal<double> result = new ThreadLocal<double>();
  #endregion

  #region givens
  void Given_calculator() {
    calculator.Value = new Calculator();
  }
  void Given_calculator_with_value_stored() {
    calculator.Value = new Calculator {
      Memory = double[] { 5 }
    };
  }
  #endregion

  #region whens
  void When_adding_odd_numbers() {
    result.Value = calculator.Add(1, 3);
  }
  void When_adding_single_number() {
    result.Value = calculator.Add(5);
  }
  #endregion

  #region thens
  void Then_result_is_even() {
    (result.Value % 2).Should().Be(0);
  }
  void Then_memory_is_added_to_operand() {
    result.Value.Should().Be(10);
  }
  #endregion
}
```

## NUnit and Parallelism

Having improved our tests to allow for parallelism, we run our tests and...
we still have a problem. Sometimes. Just like before, our tests will succeed
if we run them individually, but in parallel there are random failures.

But we turned our local variables into `ThreadLocal` variables! They aren't
used between threads!

Correct! Except NUnit is reusing threads to run our tests, so we are
**reusing the `ThreadLocal` values across tests**. We've only half solved the
problem. We guarantee that the tests won't interfere with each other when
they execute in parallel, but we might actually interfere running the tests
serially! We need to fix both problems.

## Solution

We still need to keep the `ThreadLocal`s around to protect while we're
running in parallel, but to ensure we have a clean `ThreadLocal` in the
chance the thread is reused, we should also add a method marked with
`[TearDown]` to handle resetting our `ThreadLocal`, ensuring ALL values (even
ones we don't use in that test!) are wiped clean and fresh for the next test.

```csharp
public partial class CalculatorTests {

  [TearDown]
  public void TearDown() {
    calculator.Value = default;
    result.Value = default;
  }
}
```

While not pretty, we can eek out a bit more performance with parallel tests,
and have more confidence in our test suite at the same time knowing that we
properly clear our local state between tests in the off chance that the
thread is reused.