import React, { useState } from "react";
import x from "../assets/x.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../store/userSlice";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";

const SignInSignUp = () => {
  const [signIn, setSignIn] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (signIn) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_USER_API_ENDPOINT}/signin`,
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        dispatch(getUser(res?.data?.user));
        if (res.data.success) {
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      // SIGN UP
      let isValid = true;
      let toastMessage = "";

      if (!name.trim()) {
        isValid = false;
        toastMessage += "Name is required.\n";
      }

      const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
      if (username.length < 6) {
        isValid = false;
        toastMessage += "Username must be at least 6 characters long.\n";
      } else if (!username.match(usernameRegex)) {
        isValid = false;
        toastMessage +=
          "Username can only contain alphanumeric characters and must start with a letter.\n";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.match(emailRegex)) {
        isValid = false;
        toastMessage += "Invalid email address.\n";
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (!password.match(passwordRegex)) {
        isValid = false;
        toastMessage +=
          "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 6 characters long.\n";
      }

      if (isValid) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_APP_USER_API_ENDPOINT}/signup`,
            { name, username: username.toLowerCase(), email, password },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          if (res.data.success) {
            setSignIn(true);
            setLoading(false);
            toast.success(res.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error(toastMessage);
        setLoading(false);
      }
    }
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const signInSignUpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSignIn(!signIn);
  };
  return (
    <>
      <Helmet>
        <title>X. It's what's happening / X</title>
      </Helmet>
      <Toaster />
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex items-center justify-evenly w-[80%]">
          <div>
            <img className="ml-5" src={x} width={"500"} alt="x-logo"></img>
          </div>
          <div>
            <div className="my-5">
              <h1 className="font-bold text-6xl">Happening now</h1>
            </div>
            <h1 className="mt-4 mb-3 ml-2 text-2xl font-medium">
              {signIn ? "Sign in" : "Sign up"}
            </h1>
            <form className="flex flex-col md:w-[60%]" onSubmit={submitHandler}>
              {!signIn && (
                <>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="outline-blue-400 border border-gray-400 px-3 py-2 rounded-full my-1"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="outline-blue-400 border border-gray-400 px-3 py-2 rounded-full my-1"
                    required
                  />
                </>
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-blue-400 border border-gray-400 px-3 py-2 rounded-full my-1"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="outline-blue-400 border border-gray-400 px-3 py-2 rounded-full my-1"
                required
              />
              <button
                className="bg-[#1D98F0] border-none py-2 my-4 rounded-full text-white flex items-center justify-center"
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <ClipLoader color={"#ffffff"} loading={true} size={20} /> // Display spinner when loading
                ) : signIn ? (
                  "Sign in"
                ) : (
                  "Create Account"
                )}
              </button>
              <h1>
                {signIn ? "Don't have an account?" : "Already have an account?"}
              </h1>
              <button
                className="border py-1 my-2 border-gray-500 rounded-full hover:text-blue-700"
                onClick={signInSignUpHandler}
              >
                {signIn ? "Sign up" : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInSignUp;
