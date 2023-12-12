import React, { useState } from "react";
import signup from "./sign_up";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const SignupForm = ({ user, setUserState, setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [flag, setflag] = useState(0);
    const formHandler = (event) => {
        event.preventDefault();
        console.log("Form Submitted", username, password, firstname, lastname);
        try {
            signup.signup({ username, password, firstname, lastname, setflag });
        } catch (error) {
            console.log("Unable to create user");
        }
    };
    if (flag == 0) {
        return (
            <div className="pageContainer">
                <div className="formContainer">
                    <div className="formTitle">
                        <p>Sign Up</p>
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
                                type="text"
                                name="firstname"
                                placeholder="Firstname"
                                onChange={(e) => setfirstname(e.target.value)}
                            ></input>
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Lastname"
                                onChange={(e) => setlastname(e.target.value)}
                            ></input>
                            <input
                                className="formButton"
                                type="submit"
                                value="Sign Up"
                            ></input>
                        </form>
                    </div>
                    <p>
                        Already have an account?{" "}
                        <Link to="/sign_up">Login</Link>
                    </p>
                </div>
            </div>
        );
    } else if (flag == 1) {
        return (
            <div className="formTitle">
                <p>Sign Up Completed, please proceed to Login page</p>
            </div>
        );
    } else if (flag == -1) {
        return (
            <div className="pageContainer">
                <div className="formContainer">
                    <div className="formTitle">
                        <p>Sign Up Unsucessful, please try again</p>
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
                                type="text"
                                name="firstname"
                                placeholder="Firstname"
                                onChange={(e) => setfirstname(e.target.value)}
                            ></input>
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Lastname"
                                onChange={(e) => setlastname(e.target.value)}
                            ></input>
                            <input
                                className="formButton"
                                type="submit"
                                value="Sign Up"
                            ></input>
                        </form>
                    </div>
                    <p>
                        Already have an account?{" "}
                        <Link to="/sign_up">Login</Link>
                    </p>
                </div>
            </div>
        );
    }
};
export default SignupForm;
