import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.tsx";
import SignInSignUp from "./components/SignInSignUp.tsx";
import Feed from "./components/Feed.tsx";
import Profile from "./components/Profile.tsx";
import { Provider } from "react-redux";
import store from "./store/store.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/signin-signup",
    element: <SignInSignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
 
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  
);
