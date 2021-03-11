---
title: How JSX works?
description: Every ReactJS developer knows about the jsx magic, it let us write some HTML in javascript, and that's how the magic happens. We can do this kind of stuff in tools like babel.
date: 2021-03-11
---

> I put a [post](https://twitter.com/asleMammadam/status/1369633033737928712) on my Twitter account and had a little brief talk on how jsx works, So I want to explain more about it here.

Every ReactJS developer knows about the jsx magic, it let us write some HTML in javascript, and that's how the magic happens. We can do this kind of stuff in tools like babel.

For example, we have a babel plugin named `@babel/plugin-transform-react-jsx` that gives us the ability to work with JSX syntax.

## Prerequisites

We just need `@babel/plugin-transform-react-jsx` to start, you can install it with npm or yarn:

```bash
npm install --save-dev @babel/plugin-transform-react-jsx
# or
yarn add -D @babel/plugin-transform-react-jsx
```

## Magic

It's the time to dig into the magic and see what happens inside. In React 17, React core team replaced the classic `React.createElement` with the `jsx` and `jsx` functions, so you don't need to import React anymore to write jsx. Now, the `@babel/plugin-transform-react-jsx` uses the `jsx` function by default now, check out this: 

```jsx
const profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(" ")}</h3>
  </div>
);
```

By default, babel is going to compile that jsx to this plain javascript:

```jsx
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const profile = _jsxs("div", {
  children: [
    _jsx("img", {
      src: "avatar.png",
      className: "profile",
    }),
    _jsx("h3", {
      children: [user.firstName, user.lastName].join(" "),
    }),
  ],
});
```

That's how the magic works, easy as that!

## Let's be a magician

We all love to do magical things, why we don't do it now, so let's do it! We need that babel plugin to do some magic. 

Now we can tell the plugin to use our own function instead of react's functions. For that, we need to write a small comment to tell it.

```jsx
/** @jsx logJsx */
```

Here we tell it, we want to use `logJsx` for jsx syntax. For the `logJsx` function, we turn the jsx into a logged statement like "It's a div, Hello Mohammad". Now let's define the `logJsx` function:

```jsx
// the babel plugin is going to pass this function the type and props/attributes 
function logJsx(type, props) {
  console.log(`It's a ${type}, Hello ${props.name}`);
}
```

We did it, check this:

```jsx
<title name="Mohammad"></title> // type: "title" props: { name: "Mohammad" }
// console: It's a title, Hello Mohammad
```

That's how jsx works, but in React, instead of logging, it gives us an object like this:

```jsx
{
    type: "title",
    key: null,
    ref: null,
    props: {
        name: "Mohammad"
    },
    _owner: null,
    _store: {}
}
```

Now we saw what's going on underneath in React. If you know any other magic, comment it or mention me on Twitter and tell me about it. 

I hope you enjoyed this article and learned something new. Don't forget to share and send reactions to my article. If you wanted to tell me something, tell me on [Twitter](https://twitter.com/aslemammadam) or mention me anywhere else, You can even subscribe to my [newsletter](https://bugged.dev/newsletter) and follow me on [Github](https://github.com/Aslemammad). 👋🏻