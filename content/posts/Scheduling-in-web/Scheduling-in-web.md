---
title: Scheduling in web
description: Imagine doing 10 tasks continuously; maybe we don't get tired after those 10 tasks, but how about 50 tasks or 100 tasks?
date: 2021-03-26
---

Imagine doing 10 tasks continuously; maybe we don't get tired after those 10 tasks, but how about 50 tasks or 100 tasks? We cannot even do this amount of tasks continuously.

But there's one solution for that, and that's **scheduling**. With scheduling, we can do any amount of tasks easily, and we're going to increase our productivity. For example, After every 10 tasks, we take a rest for 5 minutes, or better than that, we can keep doing tasks until we get tired, then we take a rest and continue doing the rest of the tasks. 

The same goes for javascript, For example, this code will block our thread for 5 seconds, and everything will stop working.

```tsx
let current = Date.now()
while (Date.now() < current + 5 * 1000) {
	console.log(`I'm blocking your thread for 5sec`)
}
```

But that's not fair, because it's not heavy work. Libraries like Reactjs can handle 100x heavier work without blocking the browser. The reason is that such libraries use scheduling.

## Scheduling 🤩

Scheduling is about:

- *work queue*: list of works that we want to schedule and get done
- *[micro & macro](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide) tasks*: two different kinds of tasks which we can move our own tasks into one of these phases, so the browser's going to handle it later(micro task) or immediately(macro task or task)

> First, each time a task (macro task) exits, the event loop checks to see if the task is returning control to other JavaScript code. If not, it runs all of the microtasks in the microtask queue. The microtask queue is, then, processed multiple times per iteration of the event loop, including after handling events and other callbacks. [*developer.mozilla.org*](http://developer.mozilla.org/)

Now it's time to schedule some stuff, let's see.

First of all, imagine we have many expensive work units in our work queue, like this:

```tsx
function expensive() {
  console.log('I wanna block the event loop')
}
const workQueue = new Array(1000000).fill(expensive); // [expensive, expensive, ...]
// 1000000 amount of work units 🤯🤯
// workQueue.map(job => job()) will destroy the event loop and everything will stop working
```

If we want to schedule these units, we have to consider two things: a *deadline* for running the units. If it's done, we yield to the browser to handle the user input events and then return to run the rest of the units; second, a user input event (clicking, typing, ...) happened when running the units, so we yield back immediately to the browser again, for checking if we have user input events, we use [isInputPending](https://bugged.dev/post/Next-generation-web-with-isInputPending).

Let's set the deadline time, which I prefer setting it as one frame.

```tsx
const DEADLINE_TIME = 1000 / 60 // 1000ms / 60frames
```

For now, we need to create the `schedule` function.

```tsx
function schedule() {
  const DEADLINE = performance.now() + DEADLINE_TIME;
  while (workQueue.length > 0) {
    if (navigator?.scheduling?.isInputPending() || performance.now() >= DEADLINE) {
      // Yield to the browser if we have to handle an input event, or we're out of time.
      setTimeout(schedule); // re-running the schedule function later as a macro task
      return; // stop
    }
	// execute the current work unit 
    let job = workQueue.shift();
    job();
  }
}
```

So if we have a user input event waiting or we're out of time, we put our `schedule` function on a different part of the event loop (`setTimeout`), so the browser can handle the input event and other things that sit before it; after that, It's going to re-run it and let the `schedule` function execute the rest of the units if possible.

Now, if you try running the `schedule` function, 1 million logs will not stop everything from working, and everything's going to work well.

```tsx
schedule()
```

That's it, easy and fast like that.

I hope you enjoyed this article. Don't forget to share and send reactions to my article. If you wanted to tell me something, tell me on [Twitter](https://twitter.com/aslemammadam) or mention me anywhere else, You can even subscribe to my [newsletter](https://bugged.dev/newsletter) and follow me on [Github](https://github.com/Aslemammad).