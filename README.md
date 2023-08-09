# git-main-repo
This is the main repo to research about best way to handle child repos

## Introduction
This repo is created to research about best way to handle child repos. The main idea is to have a main repo that will contain all the child repos.

## Submodules
The first approach is to use submodules. This is the most common way to handle child repos. The main repo will contain a reference to the child repo. The main repo will not contain the child repo code, it will only contain a reference to the child repo. The main repo will contain a file called .gitmodules that will contain the reference to the child repo. The main repo will contain a folder called .git/modules that will contain the child repo code. The main repo will contain a file called .git/config that will contain the configuration of the child repo.

### Pros
- The main repo will contain a reference to the child repo.
- The main repo will not contain the child repo code.

### Cons
- Bad experiences using submodules with last projects, it is not easy to use and also it can be generate a lot of problems if you don't know how to use it.
- A lot of issues can be generated if you need to change something in the child repo such as folder name, branch name, path of the child repo, etc.

### Commands
- git submodule add <child-repo-url> <child-repo-folder>
- git submodule init

```bash
# add new child repo
git submodule add https://github.com/trentinrossi/git-child-repo-a.git submodules/git-child-repo-a
```

```bash
git submodule init
```

## Subtree
The second approach is to use subtree. This is a new way to handle child repos. The main repo will contain the child repo code. The main repo will contain a folder called submodules that will contain the child repo code. The main repo will contain a file called .git/config that will contain the configuration of the child repo.

### Pros
- The main repo will contain the child repo code.
- It is easy to use.

### Cons
- The main repo will contain the child repo code.

### Commands
- git subtree add --prefix=<child-repo-folder> <child-repo-url> <child-repo-branch> --squash

```bash
# add new child repo
git subtree add --prefix=example-c https://github.com/trentinrossi/git-child-repo-c.git main
From https://github.com/trentinrossi/git-child-repo-c --squash
```

```bash
# pull changes from child repo
git subtree pull --prefix=example-c https://github.com/trentinrossi/git-child-repo-c.git main
From https://github.com/trentinrossi/git-child-repo-c
```

