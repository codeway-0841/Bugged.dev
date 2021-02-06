---
title: How to read open-source js libraries 
description: All of us, for one time at least, have plotted to contribute to one open-source library, it goes well but when we take a look at the source code, we become incapable and dumb...
date: 2021-02-06
img: tim-trad-AIwlyvpQJ18-unsplash.jpg
---
![Chicago Skydeck, Tim Trad, unsplash](tim-trad-AIwlyvpQJ18-unsplash.jpg)

All of us, for one time at least, have plotted to contribute to one open-source library, it goes well but when we take a look at the source code, we become incapable and dumb, we can't even get our head around it.

Today I want to show you my approach to read libraries and understand them thoroughly, I don't think it's the best approach, but let's give it a shot, it worked so well for me.

> If you don't know what library you must start with, I suggest you check [this](https://kentcdodds.com/blog/what-open-source-project-should-i-contribute-to) article by Kent C Dodds.

## Needs

- VS code( or any code editor that you can attach a debugger to it)
- Debugger
- VS code jest extension( we can work without) or node debugger🤷🏻‍♂️
- Your favourite project( I use [jotai](https://github.com/pmndrs/jotai) this time)

> Sometimes we need to set our own node version on 14 because I saw the debugger has some struggles with the 15 version.

Make sure you have some background of the library docs, then open the library's source code, so let's start our journey and drink the coffee( I don't do actually) because I'm really passionate to get it out of my system. 

## Start

Most of the times I won't open the `index.js` file, because many branches of the library tree are there, and we don't have clue about any of that yet. I suggest that you check the tests first, so you can debug the tests and see how the library works. 

## Settings

Jotai has jest tests, so I can debug its tests with [jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) extension. I just need to create a config file there.

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "name": "vscode-jest-tests",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      "args": ["--runInBand", "${file}"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true
    }
  ]
}
```

I use this config most of the times, but it depends on your project sometimes, for example in the Reactjs source code, you have to link the `jest-cli.js` as a program instead of the jest itself.

## Breakpoints

For example, I'd love to see how `useAtom` works, so I just need to go to the related test and set a breakpoint on the line that I want to know more about. Then, we can run the `vscode-jest-tests`

config, so it's gonna run the file we were in, and it would be stopped on the line we set a breakpoint⏹️ on.

![vscode-jest-debugger](vscode-jest-debug.png)

Now we have to play with the debugger bar( right corner) and watch the code execution flow, we can just set many breakpoints wherever we want and understand what's happening there.

I hope this article encourages you to do more open source and kills your fears( not all of them actually). It's time to party again, so don't forget to share this little article, It's my first 2021 article after 3 bloody months, I'm trying to post more, so help me to do so with your reactions.