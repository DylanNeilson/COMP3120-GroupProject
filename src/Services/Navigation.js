import LoginForm from "./LoginForm";
import SignupForm from "./Signupform";
import IGDBlookup from "./IGDBlookup";
import AllGames from "./AllGames";
import InProgress from "./InProgress";
import Planned from "./Planned";
import Finished from "./Finished";
import User_info from "./UserInfo";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import GamePage from "./GamePage";
// Define CSS styles as an object
const styles = {};

// Create a functional component named 'Navigation'
const Navigation = () => {
    useEffect(() => {
        console.log("Rendering the Navigation component");
    }, []);

    const [searchTerm, setSearchTerm] = useState(null);
    const defaultUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUserState] = useState(defaultUser);
    // save user to local storage
    const setUser = (data) => {
        if (data === undefined) {
            user = null;
        }
        setUserState(data);
        localStorage.setItem("user", JSON.stringify(data));
    };
    const Logout = () => {
        localStorage.setItem("user", "null");
        setUserState(JSON.parse(localStorage.getItem("user")));
    };

    // Render the component
    if (user != null) {
        return (
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Discover</Link>
                        </li>
                        <li className="liRight">
                            <button className="buttonIcon" onClick={Logout}>
                                <span className="material-symbols-outlined buttonIconSize">
                                    logout
                                </span>
                            </button>
                        </li>
                        <li className="liRight">
                            <Link className="buttonIcon" to="/user_info">
                                <span class="material-symbols-outlined buttonIconSize">
                                    account_circle
                                </span>
                            </Link>
                        </li>

                        <li>
                            <div className="searchContainer">
                                <form
                                    className="searchForm"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        console.log("submit");
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Search.."
                                        name="search"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setSearchTerm(e.target.value);
                                        }}
                                    />
                                    <div className="searchButton">
                                        <Link to={"lookup/" + searchTerm}>
                                            <span className="material-symbols-outlined">
                                                search
                                            </span>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<AllGames />} />
                    <Route
                        path="/game/:id"
                        element={<GamePage user={user} />}
                    />
                    <Route path="/in_progress" element={<InProgress />} />
                    <Route path="/planned" element={<Planned />} />
                    <Route path="/finished" element={<Finished />} />
                    <Route
                        path="/login"
                        element={<LoginForm user={user} setUser={setUser} />}
                    />
                    <Route path="/sign_up" element={<SignupForm />} />
                    <Route
                        path="/user_info"
                        element={<User_info user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/lookup/:id"
                        element={<IGDBlookup term={searchTerm} />}
                    />
                </Routes>
            </Router>
        );
    } else {
        return (
            //Login is working, however once page refreshed login info is lost, might have to ask for help in workshop on that
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Discover</Link>
                        </li>
                        <li>
                            <div className="searchContainer">
                                <form
                                    className="searchForm"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        console.log("submit");
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Search.."
                                        name="search"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setSearchTerm(e.target.value);
                                        }}
                                    />
                                    <div className="searchButton">
                                        <Link to={"lookup/" + searchTerm}>
                                            <span className="material-symbols-outlined">
                                                search
                                            </span>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </li>
                        <li className="liRight">
                            <Link className="buttonIcon" to="/login">
                                <span class="material-symbols-outlined buttonIconSize">
                                    login
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<AllGames />} />
                    <Route
                        path="/game/:id"
                        element={<GamePage user={user} />}
                    />
                    <Route path="/in_progress" element={<InProgress />} />
                    <Route path="/planned" element={<Planned />} />
                    <Route path="/finished" element={<Finished />} />
                    <Route
                        path="/login"
                        element={
                            <LoginForm
                                user={user}
                                setUserState={setUserState}
                                setUser={setUser}
                            />
                        }
                    />
                    <Route path="/sign_up" element={<SignupForm />} />
                    <Route
                        path="/lookup/:id"
                        element={<IGDBlookup term={searchTerm} />}
                    />
                </Routes>
            </Router>
        );
    }
};

export default Navigation;
