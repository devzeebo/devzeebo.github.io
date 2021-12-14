export default {
  homePage: [
    'arch-linux-001-welcome',
    'lodash-fp-primer',
    'a-tale-of-two-meetings',
    'redux-horizontal-and-vertical-reducers',
    'nunit-and-threadlocal',
    'exceptions-are-exceptional',
    'welcome',
  ],
  posts: {
    ids: [],
    entities: {
      'arch-linux-003-partitioning': {
        title: 'Arch Linux - Partitioning Drives',
        filename: 'arch-linux/003.partitioning/index.md',
        description: `Partitioning the drives is the scary part of installing
      a new OS. One small mistake and I'll erase my boot sector, rendering
      my Windows install useless. I'm going to test it out on the VM before
      I run it against my main drive.`,
      },
      'arch-linux-002-hyper-v': {
        title: 'Arch Linux - Hyper-V',
        filename: 'arch-linux/002.hyperv/index.md',
        description: `Before grabbing a USB and potentially nuking my working
      Windows installation, I decided to try installing Arch Linux into a
      virtual machine to prove to myself I can configure and set it up while
      I still have a full web browser on my other monitor.`,
      },
      'arch-linux-001-welcome': {
        title: 'Arch Linux - My Slow Descent into Madness',
        filename: 'arch-linux/001.intro/index.md',
        description: `Arch Linux is a bare bones Linux distribution where you
      are required to set up nearly everything yourself, from partitioning
      disks to installing windowing toolkits. I have decided to take the
      plunge into Arch Linux and chronicle my adventures along the way.`,
      },
      'lodash-fp-primer': {
        title: 'Lodash/fp - A Primer',
        filename: 'lodashFpPrimer.md',
        description: `Functional programming doesn't have to be scary. With
      lodash/fp you can experiment with functional programming in a familiar
      environment. Before you begin, there are some terms you should learn
      so that the docs don't scare you away.`,
      },
      'a-tale-of-two-meetings': {
        title: 'A Tale of Two Meetings',
        filename: 'aTaleOfTwoMeetings.md',
        description: `When passionate people collide over implementation
      details, tempers can get out of hand. A perspective piece on
      identifying aggressive situations and how avoiding escalation can
      lead to all involved feeling as if they've won and leaving the
      meeting without regrets`,
      },
      'redux-horizontal-and-vertical-reducers': {
        title: 'Redux - Horizontal and Vertical Reducers',
        filename: 'reduxHorizontalAndVerticalReducers.md',
        description: `Redux reducers are mystifying and often complex pieces
      of code - but they don't have to be! By decoupling our reducers from
      the domain logic and tying them to our view logic, we can simplify
      code, reduce regression risks, and make our project a joy to work in`,
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
      and leave our code more expressive along the way`,
      },
      welcome: {
        title: 'Welcome!',
        filename: 'welcome.md',
        description: `Welcome to my blog about software design, agile, unit
      testing, and generally geeking out!`,
      },
    }
  },
};
