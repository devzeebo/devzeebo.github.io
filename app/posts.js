module.exports = {
  homePage: [
    'nunit-and-threadlocal',
    'exceptions-are-exceptional',
    'welcome',
  ],
  posts: {
    'redux-horizontal-and-vertical-reducers': {
      title: 'Redux - Horizontal and Vertical Reducers',
      filename: 'reduxHorizontalAndVerticalReducers.md',
      description: '',
    },
    'nunit-and-threadlocal': {
      title: 'NUnit and ThreadLocal',
      filename: 'nunitAndThreadlocal.md',
      description: `Recently I had a situation where I wanted my unit tests
      to be run in parallel while maintaining a style of unit testing I
      recently learned and love from Claudio Lassala. Much experimentation
      went in to figuring out the cleanest way to use ThreadLocals to
      maintain variable state across the individual tests`,
    },
    'exceptions-are-exceptional': {
      title: 'Exceptions are Exceptional',
      filename: 'exceptionsAreExceptional.md',
      description: `The phrase "exceptions are exceptional" sounds like
      common knowledge, but far too often are they misused, feared, or
      ignored. Let's explore a better way to handle errors within our stack
      and leave our code more expressive along the way.`,
    },
    welcome: {
      title: 'Welcome!',
      filename: 'welcome.md',
      description: `Welcome to my blog about software design, agile, unit
      testing, and generally geeking out!`,
    },
  },
};
