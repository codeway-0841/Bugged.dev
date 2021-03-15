---
title: Next-generation web with isInputPending
description: As we know, almost everything in javascript gets done in a single thread, which gives us a unique model of controlling our work in the browser. With a single thread...
date: 2021-03-16
---

As we know, almost everything in javascript gets done in a single thread, which gives us a unique model of controlling our work in the browser. With a single thread, I mean when we put an infinite loop in our code, it's going to block our page from doing other works, and everything's going to stop suddenly. 

## Does it matter? 🤔

That's why we say javascript does one thing at a time, and it's not a parallel language. For example, we have two ways to optimize our code for the user in the browser; first, we can complete all of the works we have and get them done, then we're going to listen for the user's interactions (events), which prevents the user from interacting with the page for seconds (maybe less) sometimes, but it has a fast load time.

The second way is responding fast, which we split our code into blocks and schedule/run them (I'll explain scheduling in the next article). After getting done every block, we yield to the browser to check if there's a chance of having user/browser events to respond to; thus, we can respond to the user faster, but we'll have a slower load time, and that's how many frameworks/libraries work. 

![Load fast or respond fast, by web.dev](isInputPending1.png)



## `isInputPending()`

But what if we check if there is a waiting event without yielding to the browser. Yes, it's now possible with the experimental `isInputPending`. As you saw, without `isInputPending`, after every block of work, we yielded to the browser compulsory without knowing even if we have a pending event or not. But with `isInputPending`, there's no need to yield to the browser like a loop; instead, we check if there's a pending input, we yield; if not, we'll go to the next job/task. So we're going to have both fast loading and fast responding at the same time. 

![isInputPending, by web.dev](isInputPending2.png)

## How does it work?

Let's create an example to see how it works and when we're going to use it.

> `isInputPending` is an experimental tool, so I don't recommend using it now, and in the future, it's going to help frameworks/libraries schedulers. So it's for packages more than personal/business uses.

Assume we have a huge to calculate function called `expensiveWork`, And we're going to schedule it without breaking the web page.

```jsx
 function expensive() {
  /* Some expensive calculations */
}
function calculate() {
  if(navigator.scheduling.isInputPending()) {
    /* 
      if there's a pending input, yield to the browser, 
      cancel the operation, and put the function in another part of the event loop,
      to check and run it again if it's possible (if there's no pending input)
    */
    setTimeout(calculate, 0)
  }
  // if there's no pending input, run the expensive function
  expensive();
}
calculate();
```

That's it, and that's how we're going to be performant and fast in the future.

> To learn more about event loop and zero delays setTimeout, Check out [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#zero_delays).

I hope you enjoyed this article and learned something new. Don't forget to share and send reactions to my article. If you wanted to tell me something, tell me on [Twitter](https://twitter.com/aslemammadam) or mention me anywhere else, You can even subscribe to my [newsletter](https://bugged.dev/newsletter) and follow me on [Github](https://github.com/Aslemammad). 👋🏻

* isInputPending by [web.dev](https://web.dev/isinputpending)