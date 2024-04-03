import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.tsx";
import SignInSignUp from "./components/SignInSignUp.tsx";
import Feed from "./components/Feed.tsx";
import Profile from "./components/Profile.tsx";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Bookmark from "./components/Bookmark.tsx";
import UpdateProfile from "./components/User/Update/UpdateProfile.tsx";
import Update from "./components/User/Update/Update.tsx";
import UpdatePassword from "./components/User/Update/UpdatePassword.tsx";

const persistor = persistStore(store);

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
      {
        path: "/bookmark/:id",
        element: <Bookmark />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignInSignUp />,
  },
  {
    path: "/account/edit",
    element: (
      <Update activeTab={0}>
        <UpdateProfile></UpdateProfile>
      </Update>
    ),
  },
  {
    path: "/account/password/change",
    element: (
      <Update activeTab={1}>
        <UpdatePassword />
      </Update>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
