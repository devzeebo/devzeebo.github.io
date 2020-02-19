<h1 style="display: flex; align-items: center;">
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Archlinux-icon-crystal-64.svg"
    height="100"
  />
  Arch Linux - Hyper-V
</h1>

Hyper-V? I thought you said you were installing Arch!

I am, but I'm not completely convinced I'm not going to screw up my Windows
install in the process, so I'm going to first install it in a VM until I'm
confident in my skills to get it installed into the empty half of my M.2 boot
drive. Also, have you ever tried to follow an [online
guide](https://wiki.archlinux.org/index.php/Installation_guide) while your
only interface is a terminal?

## VirtualBox

VirtualBox now? Yes. So I have Docker for Windows installed on my Windows
partition, and _also_ WSL 2. It's already a crowded virtualization setup, and
I spent about half an hour messing around with VirtualBox trying to get it to
recognize the Windows Hypervisor Platform and eventually gave up. Why bother
fighting with yet another thing when I could instead just use what's already
installed. I've never used Hyper-V before as a virtual machine platform, so
there was a slight learning experience.

## Hyper-V

Searching for "Hyper-V" in the Windows search box yields the "Hyper-V
Manager". This involves installing Hyper-V through your Windows Features, and
possibly other Windows features like the Windows Hypervisor Platform. I'm not
entirely sure. In the process of setting up WSL 2 and Docker, I enabled those
services. Upon launching the Hyper-V Manager, you should see something like
this:

![Hyper-V Manager](/posts/arch-linux/002.hyperv/002.001.hyperv-empty.png)

Tada! It even has Docker in there. So we're going to go ahead an create a new
virtual machine for Arch Linux.

## The Arch Linux VM

Choosing `New -> Virtual Machine` results in a popup with some generic
blah-blah-blah. Skip that and name your VM (I chose "Arch Linux"), and
optionally where to save it.

Ah VM Generations. Some quick Google-ing (and [clicking the
link](https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/plan/Should-I-create-a-generation-1-or-2-virtual-machine-in-Hyper-V?redirectedfrom=MSDN)
tells us we should probably choose a Gen 2 VM.

For memory, I decided to go with a healthy 16GB (I have 32GB in my machine)
so that I don't run in to any memory snags.

Networking I've chosen the aptly named "Default Switch". I don't need any
crazy network settings, I just want the internet to work.

I chose to create a virtual hard disk, and gave it 500GB of a 2TB storage
drive, and skipped installation. We'll get to that in a minute.

Finish up, and voila! We have a brand new virtual machine created!

![New Arch Linux VM](/posts/arch-linux/002.hyperv/002.002.new-vm.png)

### Settings

![VM Settings](/posts/arch-linux/002.hyperv/002.003.settings.png)

Poking around the settings I first bump the processor count up to 6 of the 24
available on my 3900X and leave the NUMA settings alone. I disable
Checkpoints because why not? I'm not going to have that option while I'm
actually installing things, so I should have the practice of fixing them as I
break them. The only other thing I do is add a DVD Drive to the SCSI
Controller and mount the Arch Linux iso, then go back to the Firmware section
and move the DVD drive to the top of the boot order. I chose to download that
via torrent because the mirrors were _painfully_ slow.

## Starting Up

I start up the VM and... 

![PXE over IPv4](/posts/arch-linux/002.hyperv/002.004.pxe-over-ipv4.png)

I'm dumbfounded. I begin googling for what seems to be the error, and then
discover the VM screen has changed to this!

![Hyper-V UEFI](/posts/arch-linux/002.hyperv/002.005.uefi-error.png)

It appears we have to disable the UEFI boot options for Arch Linux, as
Hyper-V doesn't like the image. Disabling Secure Boot in the settings and
launching the VM is successful!

![The VM Started Successfully!](/posts/arch-linux/002.hyperv/002.006.vm-startup.png)

It quickly goes away and begins dumping what hackers on TV should _actually_
be seeing and dumps you at a `zsh` prompt. We're in. That's it! We've
successfully installed Arch Linux, right? Heh. No. The journey has just begun.
This is the _Live CD_ running. We haven't even _begun_ to install Arch...

![The root prompt displays](/posts/arch-linux/002.hyperv/002.007.arch-prompt.png)

## Conclusions

Hyper-V is going to suit my needs just fine (until it doesn't), so I'll keep
using it. Next steps, I'll be partitioning my virtual disk and starting into
the installation walkthrough.