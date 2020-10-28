---
title: Next Dynamic imports
description: In this little article, I'm not teaching you about dynamic import, but I'll give some ideas about dynamic imports in Next.js specifically ...
date: 2020-09-09
---

> **Dynamic import()** introduces a new function-like form of import that unlocks new capabilities compared to static import. This article compares the two and gives an overview of what’s new. V8 implementation

I assume you know the regular **import** syntax, It's cool, but you know, it's too static and strict, if you don't know about it, read [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to take the idea. We're gonna take a look at something like it in Next.js.

## Intro 👋

In this little article, I'm not teaching you about dynamic import, but I'll give some ideas about dynamic imports in **Next.js** specifically and You should know that I'm a learner like you, Maybe I'll say wrong things, So I expect you to correct them if I did.

For a review or introduction, We can implement dynamic import like this examples but It's a bad idea, I'll do just for your eyes:

```jsx
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
// example from https://javascript.info/modules-dynamic-imports
// another file

// regular import 
import { bye, hi } from './say.js';
// dynamic import  
let { bye, hi } = await import('./say.js');
```

## Next

In Next.js, Where We use it? I don't know specifically, but I know some situations where I use it, For example:

* A huge component annoys us and slows us down in the loading of the page, So We can kick it with**dynamic import**, That means We load it after the initial loading page (lazily loading it), because We don't want the browser to waste its time on it. That means Next.js split our code into other manageable chunks. With this, We give the ability to load just the needed components.
* handling other huge files like perfect pictures with the same method.

Next.js implemented it in another and similar way, because [React.Lazy & Suspense](https://reactjs.org/docs/code-splitting.html) aren't ready for SSR or ... now. I think there are other reasons, And are.

The reason why I'm writing this article is that I had problems with [TTFB](https://web.dev/time-to-first-byte/) in the Blog that you are reading this article in, So I wanted to share here.

### Huge components

This Blog is a markdown blog, So We need a markdown engine, and inside the markdown, we use code samples and code samples need their syntax highlighter that needs to be passed to the markdown engine or component. Here is the point, The **markdown component** and **syntax highlighter** are too huge components, And when I used them regularly, They affect the TTFB (page loading), I used them like this:

```jsx
import ReactMarkdown from "react-markdown/with-html"; // 157.2 KB
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // 495.1 KB
```

Just see the size, It's crazy.
So, I learned about dynamic imports in Next.js, And I implemented it like this:

```jsx
import dynamic from 'next/dynamic'; // Next.js dynamic
// const Component = dynamic(() => import('Your component'),{...options})
const ReactMarkdown = dynamic(() => import('react-markdown/with-html'), { loading: () => '🐞...' });
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter/dist/cjs/prism'));
```

In React we used React.Lazy syntax but in Next.js, it's a little bit different and We use dynamic instead and wrap the **import()** in it. There are some options for this method that We can use, like:

* **ssr**: Default is true, And if you make it false, the component will be handled in the client-side.
* **loading**: Show something when the component is in loading situation.

### Others

If you have huge image or something else too, you can handle it using just the **import()** or **require()**, We don't need *dynamic*, for example:

```jsx
<Image
        src={require(`../path/to/image.png`)}
        className='w-full'
    />
```

## Note

Don't be Obsessive like me, Sometimes you don't have a TTFB problem or huge components, So you don't need **dynamic import**, Imagine you are the browser, and someone thinks that you are too weak for handling 15 lines components, What you're going to do?
It's like using pure components or memo when you don't have any problem with React re-rendering.

I hope you enjoyed this small article and You know we don't have likes or comments here, but you can share it. If you wanted to tell me something, tell me in twitter or mention me anywhere else, You can create an issue in GitHub too. 🐞
