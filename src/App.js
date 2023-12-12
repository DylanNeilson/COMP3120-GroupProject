import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Navigation from "./Services/Navigation";

function App() {
    // handle case where local storage is empty
    console.log("App.js Object");
    const defaultUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUserState] = useState(defaultUser);
    // save user to local storage
    const setUser = (user) => {
        if (user === undefined) {
            user = null;
        }
        setUserState(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    useEffect(() => {
        console.log("Rendering the App component");
    }, []);

    // const Game = (paramDict) => {
    //     return (
    //         <li className="game_listitem">
    //            <div className="game_thumbnail">
    //                <img src={paramDict.image} alt="thumbnail" />
    //           </div>
    //       </li>
    //   );
    // };

    // const GameList = () => {
    //    return (
    //      <ul className="game_list">
    //        <Game image="" />
    //  </ul>
    // );
    //};

    const UserProfile = (paramDict) => {
        return (
            <div className="user">
                <table>
                    <tr class="left_column">
                        <td>{paramDict.userimage}</td>
                        <td>{paramDict.username}</td>
                        <td>{paramDict.userdesc}</td>
                    </tr>
                    <tr className="right_column">
                        <td>{paramDict.gameslist}</td>
                    </tr>
                </table>
            </div>
        );
    };
    return (
        // change this so the Gamelist is only displayed on home page, currently will load on every page
        <div className="App">
            <div className="title">
                <span className="material-symbols-outlined titleIcon">
                    stacked_bar_chart
                </span>
                <p>GameStack</p>
            </div>
            <Navigation />
            <footer>
                <hr></hr>
                <p>
                    Developed by Dylan Neilson, Adrian Mariani, Justin Kimble,
                    Luke Jennings
                </p>
            </footer>
        </div>
    );
}

export default App;
