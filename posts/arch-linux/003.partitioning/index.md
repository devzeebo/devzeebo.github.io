<h1 style="display: flex; align-items: center;">
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Archlinux-icon-crystal-64.svg"
    height="100"
  />
  Arch Linux - Partitioning Drives
</h1>

Upon logging in, we're greeted with a cheery root prompt, an no further
instructions. Time to [follow the
guide](https://wiki.archlinux.org/index.php/installation_guide#Partition_the_disks)!


Because I'm only installing in a VM without UEFI support, I'm going to have
to skip that part and hope I don't mess up my EFI partition when I install it
for real.

The guide recommends having a `/mnt` partition and a swap partition. This
seems reasonable. There's more information in the [partitioning
article](https://wiki.archlinux.org/index.php/installation_guide#Partition_the_disks
) about setting up multiple different partitions for things, like `/home`,
`/var`, and `/data`, but I'm okay not doing that. The idea is to migrate to
Arch and only use Windows primarily for gaming, so sharing between OS's isn't
important to me. If I decide I want to share, one of the advantages of Arch
Linux is I can change it later!

## Partitioning

Before I can install anything, I have to partition the disk. Partitions are
simply segments of the disk that have a file system. These partitions are
kept in track by the partition table. There are two main types of partition
tables: Master Boot Record (MBR) and GUID Partition Table (GPT). MBR is
older, while GPT is much newer. These days GPT is the standard, as any OS
that requires UEFI needs GPT.

For editing the partition tables, I have to make a choice. There are more
utilities out there, but the two in the Arch guid are `fdisk` or `parted`.
The internet seems divided as to which one is "better". From my quick
Googling, `fdisk` seems to be better for MBR style partitions, and `parted`
for GPT. I'm going with GPT because it's the newer format and UEFI requires
it, so I might as well learn
[parted](https://wiki.archlinux.org/index.php/Parted).

![parted help](/posts/arch-linux/003.partitioning/001.parted-help.png)

Creating a GPT table is easy with:
```
(parted) mklabel gpt
```

I noticed when I ran `print` that parted reported my disk size as 537GB! That
seems... wrong. I only made the disk 500GB in Hyper-V. Turns out parted starts
with the unit scale set to "GB", which is 1000MB = 1GB! Running
```
unit GiB
```
fixes the problem and now it reports 500GiB as expected.

![parted gb vs gib](/posts/arch-linux/003.partitioning/002.parted-gib.png)

And now filesystem. Another choice! `help mkpart` dumps out the list of all the `fs-type`s I can choose from:
```
udf, btrfs, nilfs2, ext4, ext3, ext2, fat32, fat16, hfsx, hfs+, hfs, jfs,
swsusp, linux-swap(v1), linux-swap(v0), ntfs, feiserfs, hp-ufs, sun-ufs, xfs,
apfs2, apfs1, asfs, amufs4, amufs3, amufs2, amufs1, amufs0, amufs, affs7,
affs6, affs5, affs4, affse, affs2, affs1, affs0, linux-swap, linux-swap(new),
linux-swap(old)
```

I haven't heard of most of these. I'm going to go with `ext4` since it's the
one I'm most familiar with.
```
(parted) mkpart primary ext4 0% -2GiB
```

![parted mkpart](/posts/arch-linux/003.partitioning/003.parted-mkpart.png)

And the swap now. I've no idea the difference between `linux-swap`,
`linux-swap(new)`, `linux-swap(old)`, `linux-swap(v1)`, and `linux-swap(v0)`.
From my best guess, they're aliases for each other, with the one I want being
`linux-swap`. I'm going to try it out.

```
(parted) mkpart primary linux-swap -2GiB 100%
```

![parted mkpart](/posts/arch-linux/003.partitioning/004.parted-mkpart-swap.png)

After reading through the docs some more, it seems I could have done this without
the interactive mode with:
```
parted /dev/sda \
mklabel gpt \
mkpart primary ext4 0% -2GiB \
mkpart primary linux-swap -2GiB 100% \
name 1 root
name 2 swap
```

Running this throws an error!

![parted command line error](/posts/arch-linux/003.partitioning/005.parted-command-line-error.png)

In order to use negative offsets, we have to tell `zsh` to ignore arguments
prefixed with `-` as flags. We do that by adding `--`, which tells `zsh` to
ignore remaining arguments with `-` and treat them as strings instead.

```
parted /dev/sda -- \
mklabel gpt \
mkpart primary ext4 0% -2GiB \
mkpart primary linux-swap -2GiB 100% \
name 1 root
name 2 swap
```

![parted command line](/posts/arch-linux/003.partitioning/006.parted-command-line.png)

I check the print before moving on and see... nothing? Apparently when you
run it in one line, the `mklabel gpt` prompts you to override, however the
other `parted` commands have already run and when you say "yes" to override,
it wipes out the partition table! So I have to run the `mklabel gpt` first,
then the other commands.

```
parted /dev/sda mklabel gpt

parted /dev/sda -- \
mkpart primary ext4 0% -2GiB \
mkpart primary linux-swap -2GiB 100% \
name 1 root
name 2 swap
```

![parted command line, still not right!](/posts/arch-linux/003.partitioning/007.parted-command-line-still-not-right.png)

Still not right! The first partition is supposed to start at zero! Turns out
it _is_ actually right, but when you print in GB instead of GiB, the start
offset is wrong? I've no idea how that works, but it looks right when you set
`unit GiB`, so moving on!

![parted command line, correct and confusing](/posts/arch-linux/003.partitioning/008.parted-command-line-correct-but-confusing.png)

## The File System

After partitioning the disk, I need to format the file system so I can
actually install things. Just like the partition table, the file system keeps
track of where files exist within the partition. There's a plethora of file
systems out there, and I'm most comfortable with `ext4` as I know that's what
the mainstream Linux distros use.

Since I used ext4, I have to run:
```
mkfs.ext4 /dev/sda1
```
It's `/dev/sda1` since it's the first partition on `/dev/sda` (the number in
parted)

This command takes a little bit to run, probably about a minute. I realized I
should have timed the command to see how long it took. Because it was already
formatted, running it again took four seconds. Oh well!

![formatting the ext4 partition](/posts/arch-linux/003.partitioning/009.formatting-mkfs.ext4.png)

Swap creation was _much_ quicker:
```
mkswap /dev/sda2
swapon /dev/sda2
```

![formatting the swap partitiong](/posts/arch-linux/003.partitioning/010.formatting-swap.png)

All that's left to do now is mount the filesystem!

```
mount /dev/sda1 /mnt
```

And we're done!

## Conclusions

`parted` is a pretty nifty tool for organizing the partitions. I attempted
using `fdisk`, but most of the documentation referred to MBR style schemes,
and even in the GPT docs, it referred to options only available when editing
MBR. The one advantage I saw with `fdisk` over `parted` is that `fdisk` will
hold off writing your changes until you're ready, where `parted` runs the
commands as you run them. I might revisit `fdisk` in the future as it seems
more powerful, but for now I'll do my work in parted.

Formatting the filesystem was straight forward, and apparently there's
something later that will detect the swap for us (`genfstab`).

Next up is actually installing Arch Linux onto our filesystem!