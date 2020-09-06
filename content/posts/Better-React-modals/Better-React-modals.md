---
title: Better React Modals
description: I know you know that Modals managing is a pain.
date: 2020-07-14
---
I woke up in the morning☕ days ago, I thought It will be a good day, but I checked GitHub and I found a package with Reoverlay name, I changed my thoughts because the day became an amazing day.
So, maybe You ask What… Why an npm package would make your day? It is a great question, if you’re curious about the answer, read this article.
One of the boring concepts in Front-end world and especially React is Modals and managing them.
to understand, Watch this example that I found it on Reoverlay Github:
```jsx 
const HomePage = () => {
  const [isDeleteModalOpen, setDeleteModal] = useState(false)
  const [isConfirmModalOpen, setConfirmModal] = useState(false)
  
  return (
    <div>
      <Modal isOpen={isDeleteModalOpen}>
        Code here...
      </Modal>
      <Modal isOpen={isConfirmModalOpen}>
		Code here...
	  </Modal>
      	Code here...
      <button onClick={() => setDeleteModal(true)}>Show delete modal</button>
      <button onClick={() => setConfirmModal(true)}>Show confirm modal</button>
    </div>
  )
}
```
Yea, Some Modal components, Some buttons for each Modal, Some states for Modals and buttons, It’s confusing.
Now, Imagine you have a bigger project, with more states, more Modals, more buttons, It will be a bad and inefficient way. It’s time to start with Reoverlay because everyone wants to change his life.
## Start
One of the reasons why we use Reoverlay is that it gives us new ways of managing Modals.
Reoverlay has two ways to manage Modals. Using the Components as arguments, or using configs as arguments, I prefer the second one, so we will use it.
First We need our App component like this:
```jsx 
import React from 'react';
import { Reoverlay, ModalContainer } from 'reoverlay';

import { AuthModal, DeleteModal, ConfirmModal } from '../modals';

// Here you pass your modals to Reoverlay
Reoverlay.config([
  {
    name: "AuthModal",
    component: AuthModal
  },
  {
    name: "DeleteModal",
    component: DeleteModal
  },
  {
    name: "ConfirmModal",
    component: ConfirmModal
  }
])

const App = () => {
  return (
    <>
      ...
      <Routes />
      ...
      <ModalContainer />
    </>
  )
}
```
In this simple way, In App.js We need to pass our config array to Reoverlay with config method. The config array must have an object with two properties: component name and the component itself.
We need to put the **ModalContainer** component because Modals will be there.
We can use component names in events later because we should pass the component names.
The benefit of this way is that We don’t need to import The modals everywhere, We just import all of them in the App component and pass them to Reoverlay config.
## Modals
Now take a look at ConfirmModal.js:
```jsx 
import React from 'react';
import { ModalWrapper, Reoverlay } from 'reoverlay';
// reoverlay css 
import 'reoverlay/lib/ModalWrapper.css';

const ConfirmModal = ({ confirmText, onConfirm }) => {

  const closeModal = () => {
    Reoverlay.hideModal();
  }

  return (
    <ModalWrapper>
      {confirmText}
      <button onClick={onConfirm}>Yes</button>
      <button onClick={closeModal}>No</button>
    </ModalWrapper>
  )
}
```
We have two props that We’ll pass them in other components. hideModal as its name, it is for hiding the modals.
## Last Step🙂
In this step, We want to show ConfirmModal component with clicking a button:
```jsx
import React from 'react';
import { Reoverlay } from 'reoverlay';

const PostPage = () => {
  
  const deletePost = () => {
    // showModal("Component name in config", props)
    Reoverlay.showModal("ConfirmModal", {
      confirmText: "Are you sure you want to delete this post",
      onConfirm: () => {
        axios.delete(...)
      }
    })
  }

  return (
    <div>
      <p>This is your post page</p>
      <button onClick={deletePost}>Delete this post</button>
    </div>
  )
}
```
In this component, We created a button for calling deletePost function. What does this function do? It uses showModal method from Reoverlay. This method takes two arguments, The **Modal component** name as the config we created in App.js component and the props of that Modal component. When we click the button, The confirmModal will become visible, And if we click “Yes”, Then axios.delete would be called.
## Let’s watch
code with few changes on codesandbox:
<iframe src="https://codesandbox.io/embed/suspicious-haslett-9fjb0?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="suspicious-haslett-9fjb0"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
/>
I hope you liked the article, before going to bed, make sure to use Reoverlay.

