### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
  React Router is a standard library for routing in React. It allows the app to navigate between different views or pages, change the URL, and keep the UI in sync with the URL without reloading the entire page. It enables single-page applications (SPA) to have a more seamless navigation experience.

- What is a single page application?
  A single-page application (SPA) is a web application that dynamically loads content and updates the view without requiring a full page reload. This is achieved by loading a single HTML page and dynamically updating the content based on user interaction, usually with the help of JavaScript frameworks like React.

- What are some differences between client side and server side routing?
  Client-side routing happens entirely in the browser using JavaScript (with libraries like React Router), allowing users to navigate different parts of the application without refreshing the page.
  Server-side routing involves sending a request to the server each time a user navigates to a new page, and the server responds with a new HTML file for each route.
  Key differences:

  Speed: Client-side routing is generally faster since the page does not reload.
  SEO: Server-side routing is better for search engine optimization (SEO) since the server sends full HTML pages that search engines can crawl easily.


- What are two ways of handling redirects with React Router? When would you use each?

  1.Using <Navigate> component: This is used inside a component to programmatically navigate to a different route, often after performing an action like form submission.

  import { Navigate } from 'react-router-dom';

  function ProtectedRoute({ isAuth }) {
    return isAuth ? <Dashboard /> : <Navigate to="/login" />;
  }

  2. Using useNavigate() hook: This is used when you need to redirect users as a result of an event, like clicking a button or completing an action in the app.

  import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    // After login logic
    navigate('/dashboard');
  };
}


- What are two different ways to handle page-not-found user experiences using React Router? 
Using a * route: You can add a catch-all route at the end of your routing structure that renders a "Page Not Found" component if the user navigates to a non-existent route.

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="*" element={<NotFound />} />
</Routes>

Using programmatic redirection: You can handle unknown routes by redirecting the user to a specific route like the homepage or a custom "not found" page using the <Navigate> component.

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="*" element={<Navigate to="/404" />} />
</Routes>

- How do you grab URL parameters from within a component using React Router?

You can grab URL parameters using the useParams() hook provided by React Router.

import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  return <div>User ID is {userId}</div>;
}


- What is context in React? When would you use it?

Context in React is a feature that allows you to share data (state) between components without having to explicitly pass props through each level of the component tree. It is useful when you need to share data that is considered "global," such as user authentication status, theme settings, or language preferences.

Example use cases include managing a global theme, user authentication, or language preferences across a large application.

- Describe some differences between class-based components and function
  components in React.

  Class-based components:

Use the class syntax and extend React.Component.
Have lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount.
Can hold and manage state using this.state and this.setState().
Function components:

Are simpler and written as JavaScript functions.
Do not have lifecycle methods directly, but you can manage side effects using hooks like useEffect.
Can manage state using the useState hook rather than this.state.
Function components are now the preferred way to write components due to the simplicity and flexibility of hooks.



- What are some of the problems that hooks were designed to solve?

Hooks were designed to solve several problems, including:

State and side effects in function components: Before hooks, only class components could manage state and lifecycle methods, making function components less powerful. Hooks brought state and side effect management (useState, useEffect) to function components.
Reusability: Hooks allow for better code reusability by sharing logic between components via custom hooks, which was difficult to achieve with class components.
Complexity in class components: Managing state and lifecycle methods in class components often led to verbose and complex code. Hooks simplify this by breaking down the logic into smaller, reusable functions.
Component restructuring: Hooks prevent the need for higher-order components (HOCs) or render props to pass down state, which could lead to deeply nested components.
These answers should help clarify the different React concepts you are exploring!