### Conceptual Exercise

Answer the following questions below:

1. What is React? When and why would you use it?
React is a JavaScript library developed by Facebook for building user interfaces, particularly for single-page applications. It is component-based, allowing developers to build encapsulated components that manage their own state and compose them to make complex UIs. You would use React when you need to create dynamic, fast, and scalable web applications with reusable components. It excels in handling user interfaces where data changes over time.

2. What is Babel?
Babel is a JavaScript compiler that allows developers to use the latest JavaScript features and syntax (such as ES6/ES7) that may not be natively supported by all browsers. It compiles this modern JavaScript into a backwards-compatible version that can run in older browsers.

3. What is JSX?
JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML elements directly within JavaScript code, making it easier to build UIs. JSX is transformed into JavaScript by tools like Babel and helps keep the logic (JavaScript) and the presentation (HTML-like syntax) together.


4. How is a Component created in React?
A React component can be created in two ways:

Functional Components: A simple JavaScript function that returns JSX

function MyComponent() {
  return <div>Hello, World!</div>;
}

Class Components: A class that extends React.Component and defines a render() method to return JSX.

class MyComponent extends React.Component {
  render() {
    return <div>Hello, World!</div>;
  }
}


5. What are some differences between state and props?
State: Managed within the component itself. It is mutable and can change over time based on user interaction or events. State updates trigger re-renders.
Props: Short for properties, passed from parent components to child components. They are read-only and cannot be modified by the receiving component.

6. What does "downward data flow" refer to in React?
"Downward data flow" refers to the flow of data from parent components to child components through props. In React, the data can only flow in one direction—from parent to child—making it easier to track data changes.

7. What is a controlled component?
A controlled component is a form element (such as <input>, <textarea>, or <select>) whose value is controlled by React state. In controlled components, every change to the input is handled by the component’s state, making the UI the source of truth.

function ControlledInput() {
  const [value, setValue] = useState("");

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}


8. What is an uncontrolled component?
An uncontrolled component is a form element where the value is managed by the DOM itself, rather than React state. You access its value through refs, making it similar to traditional HTML forms.

function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return <input ref={inputRef} />;
}


9. What is the purpose of the key prop when rendering a list of components?
The key prop helps React identify which elements in a list have changed, been added, or been removed. This improves the performance of rendering lists by allowing React to update only the changed elements rather than re-rendering the entire list.

10. Why is using an array index a poor choice for a key prop when rendering a list of components?
Using an array index as the key can lead to issues when the list items are reordered, added, or removed. React uses the key to track each item’s identity, and if the index changes, it can cause bugs and inefficient re-renders since React may confuse which items have actually changed.

11. Describe useEffect. What use cases is it used for in React components?
useEffect is a hook that allows you to perform side effects in functional components. It can be used for tasks like data fetching, subscriptions, timers, or manually manipulating the DOM. useEffect runs after the render cycle and can optionally clean up resources or dependencies when the component re-renders or unmounts.

useEffect(() => {
  // Perform side effect here (e.g., data fetching)
  return () => {
    // Cleanup (e.g., cancel subscriptions)
  };
}, [dependencies]);


12. What does useRef do? Does a change to a ref value cause a rerender of a component?
useRef is a hook that provides a way to persist values across renders without causing re-renders. A ref can hold a reference to a DOM element or any other mutable value. Changing the current property of a ref does not cause a re-render of the component.

const myRef = useRef(null);


13. When would you use a ref? When wouldn’t you use one?
Use a ref when you need to:
Access a DOM element directly (e.g., focusing an input field).
Store mutable values that don’t need to trigger re-renders (e.g., timers, external libraries).
Avoid using a ref for:
Storing application state that should trigger re-renders when updated. For this, use useState or useReducer.

14. What is a custom hook in React? When would you want to write one?
A custom hook is a JavaScript function that allows you to encapsulate reusable logic in a clean and organized way by using built-in React hooks. Custom hooks are useful when you need to reuse logic across multiple components without duplicating code, such as handling form state, API calls, or subscription management.

function useFetch(url) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data));
  }, [url]);
  
  return data;
}

