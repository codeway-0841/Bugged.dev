---
title: Let's build 2 hooks to manage Next.js Queries
description: Sometimes we have complete APIs, but maybe at the same time, they're not, but I am happy with that. We can’t expect everything we need to be in one specific tool.
img: marc-sendra-martorell--Vqn2WrfxTQ-unsplash-min.jpg

date: 2020-10-28
---
![Marc Sendra Martorell, unsplash](marc-sendra-martorell--Vqn2WrfxTQ-unsplash-min.jpg)
  

Sometimes we have complete APIs, but maybe at the same time, they're not, but I am happy with that. We can’t expect everything we need to be in one specific tool.
  

In React or Next, the same thing applies. They can’t implement all of the hooks we need, but they can permit us to, and they do. The permit that I'm talking about is something like [IOC](https://kentcdodds.com/blog/inversion-of-control).

  

## The problem 🤔

The problem was I wanted the same state in my component to be in the query, that's possible and easy to think, but not that easy to write in every component.

  

Let's bring some solutions that I don't like.

```jsx
const [count, setCount] = useState(0);

const { pathname, push, asPath } = useRouter();

const [query, setQuery] = useState({});

useEffect(() => {
  push(pathname, { query: { count: count } }, { shallow: true });
}, [count]);

useEffect(() => {
    setQuery(parseUrl(asPath).query);
}, [asPath]);
```

I've no problem with this code but imagine when we have a ton of components that we need to manage the query in them, it would be awful.

We'll use the **router** hook in every component, two **useEffect**s (we can put them in one), we need to parse the path and push the changes to the query, It's hard for me to do such a thing.

## The solution 😍

I think sometimes we can write a little bit more code that could make our lives easier, that's what we're going to do. We'll use more functions and hooks for our new hooks.
I wanted to implement a simple pattern like **[useQuery](https://react-query.tanstack.com/docs/guides/queries)** or **useEffect**, see this:
```jsx 
const {
  queries,
  addQueries,
  deleteQuery,
  clearQueries
} = useNextQuery(() => ({}));
```
In the first hook we make, we can see the queries state, add new queries, and delete one. WOOOOW.
```jsx
useNextQueryEffect(() => {
  return { count: count };
}, [count]);
```
And the second hook is based on the first one, and it's similar to **useEffect**, it takes some dependencies and when they change, it sets the returned object as the new query object. if the last argument is true, it will clear the previous query.

## Let's build
First we need to access the routing system in Next.js, so we shall use **useRouter** hook. 
```jsx 
const useNextQuery = (initialQuery = {}, shallow = true) => {
  const { asPath, push, pathname } = useRouter();
};
```
If you don't know about **asPath**, **push**, and **pathname**, Here's Next.js docs explanation:
* **asPath**: Actual path (including the query) shown in the browser.
* **pathname**: Current route. That is the path of the page in */pages*
* **push**: Handles client-side transitions, this method is useful for cases where *next/link* is not enough.

In this hook, we take the first argument from the user as an Initial State( or Initial Query), and the second one is for shallow transition, I'll talk about it.
### Initial state
When the component mounts, we need to access the queries in the url and return them as the first queries.
```jsx
const [state, setState] = useState(() => {
  const { query: initialRouteQuery } = queryString.parseUrl(asPath);
  return { ...initialQuery, ...initialRouteQuery };
})
```
In useState we pass a callback, It's called [lazy initialization](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates), and it's a perfect thing for performance.
[Query-string](https://www.npmjs.com/package/query-string) package is so useful, we use it to parse the **asPath** string, But if you don't like to use foreign libraries, you can implement your algorithm. If we pass our initial query to the hook, it will be mixed with the url-based initial query, then we set the query in the url. So:

* Take the initial query parameter as **initialQuery**
* convert the **asPath** to an object called **initialRouteQuery**
* Mix them and set them or push them( in the next steps)

### Push
The query shall be up-to-date and when the state changes the query must change too. We can use **useEffect** to watch the state changes. 
```jsx 
useEffect(() => {
  push(
    pathname,
    {
      query: state
    },
    { shallow: shallow }
  );
}, [state]);
```
So whenever the query state changes, we push the changes to the route. We don't want the route changes, so we keep the same pathname. 
The [shallow](https://nextjs.org/docs/routing/shallow-routing) option gives us the ability to manage server-side rerunning and we take it from the second parameter in **useNextQuery**.

### Up-to-date
The state needs to be up-to-date with the query too, and this can be done with listening to **asPath**( I'm not sure about this solution's performance, if you have better one, [comment](https://github.com/Aslemammad/Bugged.dev/issues/new) me😅).
```jsx 
useEffect(() => {
  const { query } = queryString.parseUrl(asPath);
  setState({ ...state, ...query });
}, [asPath]);
```
Here when the state changes, the upper useEffect will run again and keep the state and the query up-to-date.

### Methods
It's a simple step, we just create three functions that modify the state and then the query will change.
```jsx
const addQueries = (newQueries) =>
  setState((prevState) => ({ ...prevState, ...newQueries }));

const deleteQuery = (oldQuery) =>
  setState((prevState) => {
    const { [oldQuery]: deletedQuery, ...rest } = prevState;
    return rest;
  });

const clearQueries = () => setState({});

return {
  queries: state,
  addQueries,
  deleteQuery,
  clearQueries
};
```
Haha, we finished the first hook, there is another small one and then 💣💥.

## useNextQueryEffect
I really like this one, everytime I look at it, i feel how much my life is easier now( little exaggeration😅). We give it the dependencies and whenever they change, this hook will push the query based on the returned value from our callback. 
### Parameters
This hook needs one **callback** for running after every state changing, **dependencies** to watch, and **clear** option if we needed to clear the unnecessary queries.
### Let's start  
```jsx
const useNextQueryEffect = (cb, deps, clear) => {
  const { queries, addQueries, clearQueries } = useNextQuery({}, true);
  ...
};
```
Absolutely we won't rewrite everything, we'll use our previous hook and its methods to manage the query.

The first goal we wanted to achieve by this hook is listening to the dependencies, so we're going to use **useEffect** again.
```jsx
useEffect(() => {
  ...
}, deps);
```
The callback should be in the **useEffect** because we need to call its returned value every time the state changes, I said the returned value and not the callback itself, so we're gonna pass its returned value to the **addQueries**.
So: 
```jsx 
useEffect(() => {
  addQueries(cb());
}, deps);
```
 Now I think we have a good hook, but I feel there is something that I missed, Yesss, like **setState**'s previous state, I need the previous query. 

 For the third parameter( clear option), I just need the clearQueries method from our previous hook. 
 ```jsx
useEffect(() => {
  const prevQueries = queries;
  if (clear) {
    clearQueries();
  }
  addQueries(cb(prevQueries));
 }, deps);
``` 
I put the **previousQueries** before the clear condition, as you know we can't put it after, because sometimes the clear option will clear the queries and the **prevQueries** will be an empty object.
And Yesss, that's it.
## Conclusion
I always struggled with such problems, and I made a [package](https://github.com/Aslemammad/contextism) from one of them once, So If you wanted to make a npm package from this idea, no problem, I'll be the first one  to use it.

So let's party, Hooora🎉🥳, we've made our lives easier now. I've gotten a good example for you, feel free to fork it. If you wanted to see how the query works with the url, press the *open Sandbox*.

<iframe src="https://codesandbox.io/embed/query-article-7h20b?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="query-article"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

I hope you enjoyed this small article and You know we don't have likes or comments here, but you can share it. If you wanted to tell me something, tell me on Twitter or mention me anywhere else, You can create an [issue](https://github.com/Aslemammad/Bugged.dev/issues/new) in GitHub too. 