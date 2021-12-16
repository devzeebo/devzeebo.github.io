![](https://upload.wikimedia.org/wikipedia/commons/7/74/Arch_Linux_logo.svg)

# My Slow Descent into Madness

So I've recently decided to start dual booting again after playing with
Docker and [not being satisfied with WSL 2's performance across the virtual
boundaries](https://github.com/microsoft/WSL/issues/4197). I debated
installing Ubuntu, poked in to see how Debian was doing, and checked out Mint
again. Nothing really different, same bloat, same predefined options I'll be
too busy to change even though they really bother me, etc. Then I asked
myself... why not Arch? I began researching Arch Linux, reading up on as many
horror stories as I could find, and trying to convince myself NOT to do it.
However, I wouldn't be writing this blog series if I had managed to do so.

Here it begins, the chronicles of my journey to install Arch Linux and
configure it into something resembling a real distribution. I hope my
victories bring you joy, and may my slow descent into madness be a warning
for those who follow. This is your last chance to leave before we dig in.

## Goals

Arch Linux. Where to begin. [_Real_ Linux nerds use Arch
Linux](https://en.wikipedia.org/wiki/No_true_Scotsman)... **Nope. False.**
Arch Linux is different than other distros for sure, but not everyone should
use it. If you want to _use_ Linux, go install [Ubuntu](https://ubuntu.com/)
or [Mint](https://linuxmint.com/). Both are great systems, work out of the
box, and are familiar to people who don't primarily work in the terminal.
Arch Linux isn't just an operating system, _it's a work of art_, and not the
type of art that someone else has created and you're simply using (that's
Ubuntu!). Arch Linux is **_your_** work of art. Once you get it completely
set up you'll know the in's and out's of **_your_** system which will be set
up exactly how **_you_** want it.

Could you start from Ubuntu and prune it down to what you want? Of course!
But where's the fun in that? I decided I wanted to explore the world of Arch
Linux and learn what I could from it. I have set some goals that will
determine if I am "successful" at setting up Arch:

1. Repeatable setup. Record the setup steps in a yet-to-be-determined Git repo
2. Use VS Code as a development environment
3. Have both Docker and Docker Compose installed and working
4. NVidia driver installed and not crashing

Primarily I plan to use Linux as a development machine, so VS Code is a must.
I've had some problems getting it installed and working with WSL (both 1 and
2), so I don't know if it'll take work to set up in a real OS.

Docker and Docker Compose are things I want to learn/get much more familiar
with so I need these set up and working. This will also make sure that
virtualization works in the Arch environment.

The NVidia driver used to be notoriously hard to set up in Linux, so that's
a good stretch goal.

Lastly (also firstly) I want a repeatable setup process. If I'm going to go
through the trouble of setting up Arch Linux from scratch, I want to be able
to start over and spin it up again with very little effort. It's going to be
hard, but I'm not _completely_ insane... yet.

## Conclusion

So there. I've done it. I've declared my intent, and I'm going to follow
through on it. [Follow me over to the first
part](/post/arch-linux-002-hyper-v) as we begin.