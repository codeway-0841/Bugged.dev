---
title: Big useEffect mistake 
description: In Reactjs, we encountered infinite loops or useless re-rendering a lot. It's something unavoidable, but we can be more attentive about it sometimes.
date: 2021-03-07
---

In Reactjs, we encountered infinite loops or useless re-rendering a lot. It's something unavoidable, but we can be more attentive about it sometimes. One of the reasons that cause us this kind of problems is useEffect; I'm going to talk about one of the mistakes we can make with it and learn how to be aware of it.

## The mistake

Check this out:

```tsx
const [state, setState] = React.useState(0);
React.useEffect(() => {
  console.log("re-rendering");
}, [{ ...someData }])
```

Now if we do `setState`multiple times, we're going to see this in console:

```tsx
re-rendering
re-rendering
re-rendering
```

Wait; what? We just passed `someData` as a dependency list; why it logs that? That's not even related to `state`. Yes, it's not related, but pay more attention to the dependency list; We passed an inline object, which means it's always different from its previous version; we create it every time we cause a re-render to the component. Check this:

```tsx
{ ...someData } === { ...someData } // false
{} === {} // false
[] === [] // false
// all are inline and have different references
```

`useEffect` somehow cache the dependency list and check if it's equal to the next value. That's why inline non-primitive values (`[]`, `{}`, `{...data}`, ...) are always different in this tool's eyes.

> `Symbol()` is an exception here, it's different every time we create it, but it's a primitive value.

For example, check this, I saw many developers that they check part of an array like this:

```tsx
const [state, setState] = React.useState([1, 2, 3, 4, 5]);
React.useEffect(() => {
  console.log("re-rendering");
}, [state.slice(0, 2)]); 
/* 
	prevVal = state.slice(0, 2) // first render
		***
	nextVal = state.slice(0, 2) // second render
		***
	prevVal === nextVal // false
*/
```

The expected behaviour is checking 1 to 3 values, but it doesn't work like that because the `slice` method will always return a new array (reference).

I hope you enjoyed this article. Don't forget to share and send reactions to my article. If you wanted to tell me something, tell me on [Twitter](https://twitter.com/aslemammadam) or mention me anywhere else, You can even subscribe to my [newsletter](https://bugged.dev/newsletter) and follow me on [Github](https://github.com/Aslemammad).