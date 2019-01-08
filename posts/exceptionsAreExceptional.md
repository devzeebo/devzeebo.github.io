# Exceptions are Exceptional

Recently I've encountered a lot of code that uses some variation of the pseudo
[Operational Result](https://medium.com/@cummingsi1993/the-operation-result-pattern-a-simple-guide-fe10ff959080) pattern.
While it can be useful to encapsulate your business logic into common response formats, it can also lead to 
unnecessarily complex code. I wouldn't go so far as to call operational results an anti-pattern, but they're close.

## TL;DR

1. Assume the happy path is the normal path through the code
2. Only catch exceptions that you can actually recover from (e.g. don't "log and throw")
3. Only throw an exception if something violates a business constraint (e.g. no duplicate ids, requesting an id that doesn't exist)

## An Example

Let's look at some code. E-Commerce is a common business and fairly easy to pick up as a domain, so we'll
pretend we're "Online Business" selling "Things". When a customer arrives at our site, they add some "Things"
to their cart, and eventually check out. The cart page needs to display a list of items, prompt for the user's
shipping information, and ask for a credit cart. If the user is logged in and has purchased some "Things"
before, we want to retrieve their shipping information and stored credit cards. (We're going to ignore all the
security stuff and pretend we've done it right behind the magic of Black Boxes.) Carts (and the selections in
them) will be persisted to the database, and we will retrieve all of this from the user's session. We'll return
a list of product details to the cart, along with the shipping information we've (possibly) retrieved.
Pseudo-code as follows:

```csharp
public CartModel GetCartModel(SessionData session) {
  // get the session's cart id
  // load the cart and product ids from the cart domain
  // load the product details from the product domain for the items in the cart

  // if the user is logged in
    // get the user's last shipping info
    // get the user's encrypted credit cards
    // set these on the response object
  
  // return the response object to the UI
}
```

In an attempt to keep a consistent interface, all of our service layers will return a `Result<T>`:

```csharp
public class Result<T> {
    public T Result { get; set; }
    public string FailureMessage { get; set; }
    public Exception Exception { get; set; }

    public bool Success { get; set; }
}
```

Our `GetCartModel` now calls a bunch of services and has to check for success. Since we're going to have to
handle all the possible failures, we've written a helper method for converting a `Result<T>` to an
`ActionResult`.

```csharp
public IActionResult ToActionResult(this Result<T> result) {
  if (result.Success) {
    return Ok(result.Result);
  }

  if (result.Exception == default) {
    return BadRequest(result.FailureMessage);
  }
  
  return InternalServerError(result.Exception);
}
```

```csharp
public class CartService {
  public Result<List<Guid>> GetCart(Guid cartId) {
    try {
      var carts = _db.Carts
        .Where(it => it.Uid == cartId)
        .Include(it => it.LineItemIds)
        .ToList();

      if (carts.Count == 0) {
        return Result<List<Guid>>.Failure("Cart not found");
      }
      if (carts.Count > 1) {
        return Result<List<Guid>>.Failure("More than one cart with id found");
      }

      return Result<List<Guid>>.Success(carts.Single());
    }
    catch(Exception e) {
      return Result<List<Guid>>.Exception(e);
    }
  }
}
```

```csharp
public CartModel GetCartModel(SessionData session) {
  var cartId = session.CartId;

  var response = new CartModel();

  var cartResult = _cartService.GetCart(cartId);
  if (!cartResult.Success) {
    return cartResult.ToActionResult();
  }

  var productDetailsResult = _productService.GetProductDetails(cartResult.Result.LineItemIds);
  if (!productDetailsResult.Success) {
    return productDetailsResult.ToActionResult();
  }

  response.Items = productDetailsResult.Result;

  if (session.IsLoggedIn) {
    var shippingInfoResponse = _userService.GetPreferredShippingInformation();
    if (shippingInfoResponse.Success) {
      response.DefaultShippingInformation = shippingInfoResponse.Result;
    }
    else if (shippingInfoResponse.Exception != default) {
      _log.Error(shippingInfoResponse.Exception);
    }
    
    var creditCardResponse = _userService.GetPreferredShippingInformation();
    if (creditCardResponse.Success) {
      response.DefaultCreditCardInformation = creditCardResponse.Result;
    }
    else if (creditCardResponse.Exception != default) {
      _log.Error(creditCardResponse.Exception);
    }
  }

  return response;
}
```

While this is correct code, it isn't easy to read or understand why business cases are the way they are.
Comments could help, but then the code isn't self documenting. The reason for this disconnect is we didn't
implement the business case. There are 3 different return points from that method, and each one represents
a partial view of the story. If you compare our implementation with the pseudo code, the difference is apparent:

### _By wrapping our code in `Result<T>`, we assume the exception case is the norm._

By assuming the exception is normal, we clutter up our code by checking each and every result,
assuming it failed because we can't move on until we've guaranteed that the result _didn't_ fail.
It's exhausting!


## It Gets Worse

This is only one layer deep. Imagine a situation where you have multiple layers of these `Result<T>` responses.
You now have the task of converting a `Result<A>` to a `Result<B>` in the case of exceptions and failures, and
lose the context that it was the `Result<A>` that actually failed, as your `Result<B>` hides the underlying
error and instead pretends that it itself failed with the same exception or failure message that the `Result<A>`
had!

Not only do you have to check every step for failure, you also have to convert it on failure. What if I can
handle the case where the cart doesn't exist, but if the products don't exist I should throw the exception?
Now we have two choices, create manual exceptions or do string comparison on the `FailureMessage` property.
String comparison is smelly, and if we're going to make manual exceptions, it isn't a 500, but a 400, and now
we have more convoluted logic determining a business logic error and a real exception.

By just throwing an exception the code is both readable and _assumes everything succeeds_. If we want to, we
can optionally handle the specific exception we know we can handle, and let all other _exceptional_ cases
be unhandled to be picked up by the global exception handler.

Another point of confusion comes when you start returning `Result<T>` over HTTP. HTTP already has status
code reporting built in. So now you have two options (neither of which is very good):

1. **Return a 200 with a body that indicates an error.**
   Unless you're intimately familiar with the API, you're not going to know that a 200 can actually be an
   error until the API unexpectedly returns an error and your client code blows up because `result` is null
2. **Return either a 400 or 500 with a body that has another level of indirection**
   We're double encoding the information. Should we trust the HTTP status code or the status code in the
   response? What if we receive a 500 that isn't in that format? Now our client code has to handle two
   different exception message formats for 500's, or not at all.


## A Better Way

What if, instead, we assumed that the result of the service call was successful?
It's right in the name: an _Exception_ is NOT normal, so why are we treating the Exception case as the default?
In the event of a business logic failure (i.e. the session's cart id doesn't exist), we can handle
that in the service and throw a tailored exception detailing what went wrong, and let the code calling it decide if it
even wants to handle that specific exception.

```csharp
public class CartService {
  public Result<List<Guid>> GetCart(Guid cartId) {
    var carts = _db.Carts
      .Where(it => it.Uid == cartId)
      .Include(it => it.LineItemIds)
      .ToList();

    if (carts.Count == 0) {
      // or a CartNotFoundException
      throw new BusinessLogicException("Cart not found");
    }
    if (carts.Count > 1) {
      // maybe an AmbiguousCartException?
      throw new BusinessLogicException("More than one cart with id found");
    }

    return carts.Single();
}
```

```csharp
public CartModel GetCartModel(SessionData session) {
  var cartId = session.CartId;

  var response = new CartModel();

  var cart = _cartService.GetCart(cartId);
  response.Items = _productService.GetProductDetails(cart.LineItemIds);

  if (session.IsLoggedIn) {
    var shippingInfo = _userService.GetPreferredShippingInformation();
    if (shippingInfo != default)
      response.DefaultShippingInformation = shippingInfo;
    }
    
    var creditCard = _userService.GetPreferredShippingInformation();
    if (creditCart != default) {
      response.DefaultCreditCardInformation = creditCard;
    }
  }

  return response;
}
```

Look at how much cleaner and easier to read the code is! We can easily discern the business case this method
expects and we can write unit tests detailing what we expect to happen when in the exceptional cases.
We can also now write a single exception middleware to catch our exceptions across all controllers and return responses
without duplicating  the exception handling logic in all of our controller code:

```csharp
// pseudo code for exception handler middleware
public void HandleException(ExceptionContext context) {
  context.Response.StatusCode = context.Exception is BusinessLogicException ? 400 : 500;
  context.Response.Content = new StringContent(context.Exception.Message);
}
```

### _Exceptional cases should either be explicitly handled or completely ignored_

In the case of the two user service queries, it probably isn't an error to not have saved shipping information or credit
cards, so _we shouldn't throw errors if its not an error_. If it isn't exceptional, just return `default` or if you're
feeling particularly functional, an empty object. There's no logic to be performed even if it does fail, so why should
we care if its not there?

## Conclusions

When we analyze business requirements and discuss them with non-technical people, we have to poke and prod
to discover the edge cases that aren't part of the happy path. Why then do we then assume that our code
should be terrified of all the exceptional cases? If it isn't part of the business requirements to handle a
specific case, let the exception bubble up. Don't "log and throw" for the sake of "handling" the exception
If we can generate a readable message so the user can take action, then we're already catching and generating
a pretty error message which is NOT an unhandled exception, and is often the user's fault in the form of bad
inputs. For unhandled exceptions, log it for later analysis, and let the user know that it WAS NOT THEIR FAULT
and that you're looking in to it.

This significantly simplifies error handling code as you only have two cases: Bad requests have a uniform
shape and can be fed into a nice dialog or notification, and internal server errors are easy to identify
and can largely be ignored by the client as there is no action to be taken.

It also improves your user experience, leaving your users confident that they did everything right,
explaining what they did wrong, or explain that it wasn't their fault and that you've acknowledged 
something went wrong. (Bonus points if you provide them with a ticket number attached to the log message!)
rather than frustrated and attempting to change things to force the submission through, or worse, 
abandoning the transaction all together.

Other developers will have an easier time reading your code and being onboarded because the method has
a singular purpose and clearly lays out the business logic put forth by the story, instead of
interspersing it with exception handling code that isn't called 90% of the time, and often is just
"log and throw".