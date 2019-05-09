# A Tale of Two Meetings

>In the best of times we forget the worst of times exist. In our attempts to
be wise, we often act foolish. Seeking to prove our beliefs, we entrench
behind incredulity. We turn the spotlight on ourselves, hiding others in
darkness. We preach hope to others while wading through despair ourselves.
With all the potential solutions before us, we can see no way forward.

I recently read a [series of interesting
studies](https://faculty.chicagobooth.edu/nicholas.epley/EpleyandDunning2001.pdf)
about our ability to estimate other's abilities and how we rate our own
ability. In the studies, the proctors discovered that we often rate our own
abilities significantly above average, and estimate other's abilities fairly
accurately. For example, the proctors ran a study asking students how many
flowers they would personally buy during an upcoming fundraiser and how many
they expected their peers to buy. The study found the participants severely
overestimated how many they personally would buy, but correctly guessed the
average number of flowers participants would buy. Give it a read if you're
interested. The point is, we are inherently biased in our own opinions and
seek to pump up our self-esteem by assuming we're better than everyone else.
Unfortunately, this bias towards our own ideas tends to rear its ugly head
when two people with dominant personalities differ on ideas. Each person
entrenches in their idea, and refuses to acknowledge the other side, even
going so far as to ignore valid evidence presented by the other person.

## Backstory

Recently I found myself in a meeting over the refactoring of a feature
adjacent to a well-known business requirement. The business requirements had
been in place for 2 or 3 years with very little change, had well defined case
studies, and had unit tests showing required inputs and outputs to the
domain. The business case was not being refactored, but the code calling it
was. Initially, months earlier, my team had presented the business case and
the domain to the refactor team, and had shown them the math and case studies
behind the implementation so they had some idea of what to expect when they
fed values in to the domain.

## The First Meeting

The first meeting of our tale occurred for unknown reasons. No one knew who
called the meeting, no one wanted to head the meeting, and no one knew what
the meeting was about. A very bad start. Eventually, as a group we discovered
the meeting was about discussing the right way to implement the domain. Which
had already been implemented, which meant this meeting was to rehash
something that had been decided months ago. A very bad start indeed.

So the meeting begins. The confusion has made everyone involved very tense,
and it very quickly descended into chaos. Multiple conversations were
happening about disparate yet tangentially related subjects, blame began
cropping up, and everyone entrenched in defensive positions from which they
could lob irrelevant and pointed accusations about past mistakes. No one
abstained and no one was spared being targeted, myself included. My sparring
partner and I were oblivious to the other conflicts going on. I allowed
myself to return barb for barb, and launched my own inquisitions into why
things were implemented incorrectly (from my biased point of view). I would
ask for an explanation of how my sparring partner was using the domain
library, only to be met with defensive questions back as to why the domain
was implemented the way it was. I would parry this off as "that's the way the
business wants it" without clearly explaining why and thrust again into
usage, convinced that it was the implementation of the refactor code that was
incorrect. _Obviously_ my code couldn't be wrong; it had 95% coverage in unit
tests! This went on for minutes. Eventually I realized I wasn't getting
anywhere, and observed what was happening around me. No one was getting
anywhere. Realizing both what was happening and what I had allowed myself to
take part in, I proceeded to walk out of the meeting. I took a walk, grabbed
a soda, checked in on a colleague on a completely different team, clear my
head, and try to make sense of the chaos I both witnessed and took part of.

> The only thing I did right in that meeting was leave it.
 
Approximately five minutes later one of the meeting attendees came and found
me and asked me to return, as we had moved into a room with a whiteboard and
they wanted me to diagram out the domain implementation again. I happily
obliged, as this was something I knew well and knew there was no way to
contest. There's that bias poking it's head out again. Entering the meeting
room was completely different than the chaos I had walked out of. Everyone
was listening to one person talk, and legitimately attempting to understand
what they were saying. I observed quietly, being careful not to escalate
things. Once it was my turn to explain the domain, I did so with mathematical
formulas and presented the case studies that defined the business cases. My
old sparring partner finally explained how he was using the domain library
once he realized one of the case studies wouldn't work under his
implementation. After walking through the study step-by-step, he relented,
and agreed that the domain was correct. We ended the meeting and all went
back to our desks to fix what had been discussed.

The rest of the morning was terrible. Everyone was on edge, no one was
communicating across the teams, and we avoided each other like the plague,
worried that a leftover ember might burst into flame again. I was distracted
thinking about how things got out of hand so quickly and what I could have
done differently to have prevented the situation from propagating. There
were a few things I immediately recognized as trust behaviors I had broken:

1. **Demonstrate Respect** - Everyone should be treated with respect
regardless of seniority. There was no excuse for how I reacted
2. **Right wrongs** - Apologize to the attendees of the meeting. My
behavior wasn't appropriate and I needed to fess up to what I had
participated in
3. **Listen First** - When a tense situation arose next, I told myself I
would listen to the other side and attempt to understand what they were
experiencing before letting my inner bias out
4. **Confront Reality** - Part of what came out of the meeting is there were
business cases that were not represented by the domain library, and there
were a number of outstanding bugs in the library. Addressing and accepting
the fact that my code and my ideas are not perfect nor the best solution all
the time would help keep that bias restrained
5. **Create Transparency** - I realized I had held information back during
the argument just in case I needed a trump card. By revealing that
information, confusion could have been avoided and potentially deescalated
the situation

After apologizing to the attendees, the day got back on track. We worked
together to fix the outstanding bugs, fixed many bugs in the domain library,
and added more unit tests to cover the new logic we added. Everyone got along
great for a while, until...

## The Second Meeting

The second meeting took place probably two weeks after the first. This
meeting setup was the polar opposite of the first. We knew who scheduled it,
why we were meeting, what we were supposed to discuss and decide on. A very
good start. We began the meeting, and I practiced listening first to the
problem, everyone's opinions on the problem, and how they were planning to
implement it. Without attacking, I brought up some flaws in the
implementation and warned of future modifications that would be required
should certain business needs come up. So far so good.

Except that the refactor team from the first meeting took issue with my
suggestions, saying those scenarios weren't required today so we shouldn't
worry about them. My team sprang into action, defending our position as I sat
quietly. Uh oh. Here we found ourselves in the same situation we were during
the first meeting, despite the best intentions. A brief exchange occurred and
in the momentary silence between blows, I had two choices: Engage in the
escalation, or attempt deescalation. Escalation was the easier choice. I had
more than enough (biased!) proof, multiple people to back me up, and no skin
in the game if my prophecies came true. Deescalation meant attempting to set
my implicit bias aside, side with my opponent, and walk down his logical path
with the intent of making it work.

> Escalation is easy yet destructive, Deescalation requires humility and work

I chose the latter, despite the monumental task. Starting from the top, I
accepted his solution as an equally valid solution and began cooperatively
brainstorming where we were going to put certain parts, what they would be
shaped like, and how to prevent common mistakes. My team remained wary, ready
to jump in at a moments notice, launching the occasional repeated defensive
volley. However, once I had listened to my opponent and legitimately
attempted to work with him to solve the implementation, my own team's
comments were easy to dismiss. Eventually, we ended with a compromise that we
both were happy with.

## Conclusions

Looking back on the second meeting, it very easily could have ended in the
same chaos the first one did. It was avoided by two people on both sides
setting aside personal bias and attempting to work together. Even though both
sides were entrenched in their ideal solution, the opposing individual and
myself managed to compromise simply by treating each other with respect. We
listened to what the other had to say and were not quick to dismiss each
other's concerns as invalid. We confronted reality and agreed early on that
the solution we were discussing was not the final solution and work might
have to be done in the future if requirements change. We all left the meeting
on good terms and grabbed a beer after work.

Tense situations are going to arise. There's no way to prevent them. When
people are passionate about their work, there is bound to be conflict. How we
resolve these can either be destructive or productive. We must strive to
avoid our internal bias and accept that we are not as extraordinary as we
believe ourselves to be. We should work to understand our opponents, not so
that we can beat them, but so that we can find common ground. Doing so will
create a far, far better meeting that we ever did, and leave a far, far
better solution that we could ever come up with on our own.