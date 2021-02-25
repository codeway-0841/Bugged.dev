---
title: React Context without Provider + useMutableSource
description: A while ago, I was reading an RFC from react's RFCs called useMutableSource; it was an experimental feature that, in a nutshell, lets you safely read, write and even edit an external source.
date: 2021-02-24
img: nicolas-thomas-3GZi6OpSDcY-unsplash.jpg
---
![Experiment, Nicolas Thomas, unsplash](nicolas-thomas-3GZi6OpSDcY-unsplash.jpg)

A while ago, I was reading an RFC from react's RFCs called [`useMutableSource`](https://github.com/reactjs/rfcs/blob/master/text/0147-use-mutable-source.md); it was an experimental feature that, in a nutshell, lets you safely read, write and even edit an external source (outside of the react components tree). It's a banger feature, which I'm really chuffed for it, but it's experimental at the same time. You may know that I'm working on an Open-source state-management library called jotai. This library announced a new feature, the Provider-less mode. To know what it is, think of React Context, but no need for a `Provider` component, it's not exactly that, but it gives you the idea.

## Why a new one?

Yea, we have patterns and libraries that allow us to read and write from an external source, but as I said, this one lets you do things safely; no tearing anymore.

## Tearing

Think of tearing as something like if we have a value(state) that A and B read from it, but somehow in the rendering, the value changes. The B component is later than A, So in Rendering, the value in the A component is 0, and in the newer component (B), the value is 1. We call this tearing; it means you see two different values in the viewport from one exact source. It's a new and hard to understand implementation in React concurrent mode; for more information, see [this](https://stackoverflow.com/questions/54891675/what-is-tearing-in-the-context-of-the-react-redux). 

## Experimental, Why should I use it?

So I thought about this, we have two options:

- Experimental version of react: `yarn add react@experimental`
- Consistent version of `useMutableSource`, you can copy paste it from [here](https://gist.github.com/Aslemammad/0e0a4eff774f991df47fa7c6cd219174)

I recommend the second option because it's not going to change, and good for now as long as we don't have `useMutableSource` in a major react version.

## Context with no Provider

I think we have reached what brought you here, but wait before all of this, don't forget to look at my [Github](https://github.com/Aslemammad) and [Twitter](https://twitter.com/aslemammadam); you're going to see cool stuff there and help me with my learning journey too. So let's start.

> Some of the code below is written with typescript, so it will be more understandable, even for people who don't know typescript.

### Start

First we need to create a simple global object, which contains three properties:

```tsx
 const globalStore = {
  state: { count: 0 },
  version: 0,
  listeners: new Set<() => any>()
};
```

- `state`: simple value like react Context value
- `version`: important part that has to change whenever any part of the state changes
- `listeners`: a set of functions that we call them every time we change part of the `state`, so we notify them about the changes

Now we need to create a mutable source from `globalStore` and give it the version, so it'll help it with triggering new changes, so we're going to access it in `getSnapshot` and `subscribe`; we'll talk about these soon.

```tsx
const globalStoreSource = createMutableSource(
  globalStore,
  () => globalStore.version // (store) => store.version (Optional) if you use the consistent and non-experimental version of useMutableSource
);
```

Now it's the time to talk about `getSnapshot`; in a nutshell, it's a function that `useMutableSource` returns its returned value whenever the state changes.

```tsx
const cache = new Map();

const getSnapshot = (store: typeof globalStore) => {
  const setState = (
    cb: (prevState: typeof store.state) => typeof store.state
  ) => {
    store.state = cb({ ...store.state });
    store.version++;
    store.listeners.forEach((listener) => listener());
  };
  if (!cache.has(store.state) || !cache.has(store)) {
    cache.clear(); // remove all the old references
    cache.set(store.state, [{ ...store.state }, setState]); // we cache the result to prevent useless re-renders
    // the key (store.state) is more consistent than the { ...store.state },
    // because this changes everytime as a new object, and it always going to create a new cache
    cache.set(store, store); // check the above if statement, if the store changed completely (reference change), we'll make a new result and new state
  }

  return cache.get(store.state) as [typeof store.state, typeof setState]; // [state, setState]
};
// later: const [state, setState] = useMutableSource(...)
```

Take a look at the `setState` function, first we use `cb` and pass it the previous state, then assign its returned value to our state, then we update the store version and notify all the listeners of the new change.

> we used the spread operator `({ ...store.state })` because we have to clone the value, so we make a new reference for the new state object and disable direct mutations.

We don't have any `listener` yet, so how we can add one? with the `subscribe` function, take a look at this:

```tsx
const subscribe = (store: typeof globalStore, callback: () => any) => {
  store.listeners.add(callback);
  return () => store.listeners.delete(callback);
};
```

This function's going to get called by `useMutableSource`, So it passes `subscribe` two parameters:

- `store`: which is our original store
- `callback`: this is going to cause our component a re-render (by `useMutableSource`)

So when `useMutableSource` calls the subscribe, we're going to add the `callback` to our listeners. Whenever something changes in the state (`setState`), we call all of our listeners so that the component will get re-rendered. That's how we have the updated value every time with `useMutableSource`.

So you may wonder we delete the callback in return, the answer is that when the component unmounts, `useMutableSource` will call `subscribe()`, or in another term, we call it `unsubscribe`. When it gets deleted, we'll no longer call a useless callback that will cause a re-render to an unmounted (or sometimes an old) component.

### `useContext`

Now we reached the end line, don't think too much about the name, we just wanted to mimic the Provider-less version of React context. 

```tsx
export function useContext() {
  return useMutableSource(globalStoreSource, getSnapshot, subscribe);
} // returns [state, setState]
```

Now we can use this function everywhere we want. Take a look at this example, or if you want, you could go straight for the [codesandbox](https://codesandbox.io/s/usemutablesource-react-context-spyhu?file=/src/App.tsx). 

```tsx
function Display1() {
  const [state] = useContext();
  return <div>Display1 component count: {state.count}</div>;
}
function Display2() {
  const [state] = useContext();
  return <div>Display2 component count: {state.count}</div>;
}
function Changer() {
  const [, setState] = useContext();
  return (
    <button
      onClick={() =>
        setState((prevState) => ({ ...prevState, count: ++prevState.count }))
      }
    >
      +1
    </button>
  );
}
function App() {
  return (
    <div className="App">
      <Display1 />
      <Display2 />
      <Changer />
    </div>
  );
}
```

Now whenever you click the +1 button, you can see the beautiful changes without any `Provider`.

I hope you enjoyed this article, and don't forget to share and reaction to my article. If you wanted to tell me something, tell me on [Twitter](https://twitter.com/aslemammadam) or mention me anywhere else, You can even subscribe to my [newsletter](https://bugged.dev/newsletter).