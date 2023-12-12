import React, { useState } from "react";
import login from "./login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const LoginForm = ({ user, setUserState, setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const formHandler = (event) => {
        event.preventDefault();
        console.log("Form Submitted", username, password);
        login.login({ username, password }).then((data) => {
            if (data.error) {
                console.log("error", data);
                // setUserState(data)
                setUser(data);
            } else {
                console.log("success", data);
                // setUserState(data);
                setUser(data);
                window.location = "/";
            }
        });
    };

    console.log(user);

    if (user) {
        return (
            <div className="pageContainer">
                <div className="pageTitle">
                    <h1>You are already logged in</h1>
                </div>
            </div>
        );
    } else
        return (
            <div className="pageContainer">
                <div className="formContainer">
                    <div className="formTitle">
                        <p>Login</p>
                    </div>
                    <div className="formWrapper">
                        <form onSubmit={formHandler}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            ></input>

                            <input
                                type="text"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <input
                                className="formButton"
                                type="submit"
                                value="Login"
                            ></input>
                        </form>
                    </div>
                    <p>
                        Don't have an account?{" "}
                        <Link to="/sign_up">Sign up</Link>
                    </p>
                </div>
            </div>
        );
};
export default LoginForm;
