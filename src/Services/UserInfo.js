import axios from "axios";
import { useState, useEffect } from "react";
import GameUser from "./GameUser";
import getURL from "./deploy";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InProgress from "./InProgress";
import Planned from "./Planned";
import Finished from "./Finished";
const baseURL = getURL();

const User_info = (user, setUser) => {
    const statuses = ["in_progress", "planned", "finished", "dropped", "all"];
    const [status, setStatus] = useState("all");
    const [userinfo, setuserinfo] = useState("");
    const [usergames, setusergames] = useState([]);
    const [flag, setflag] = useState(0);
    const [summary_change, setsummary_change] = useState("");

    // function changeStatus(e) {
    //     // valid status check, use current if invalid
    //     if (!statuses.includes(e.target.value)) {
    //         return;
    //     // if all, display all games in list, regardless of status
    //     } else if (e.target.value == "all") {
    //         setusergames(user.user.gamelists);
    //     // otherwise, display only games with specified status
    //     } else {
    //         var games = [];
    //         for (let i = 0; i < user.user.gamelists.length; i++) {
    //             if (user.user.gamelists[i].status == e.target.value) {
    //                 games.push(user.user.gamelists[i]);
    //             }
    //         }
    //         setusergames(games);
    //     }
    // }

    async function getusergames(setusergames, gamelists) {
        var games_to_get_info = [];
        var url = baseURL + "gameinfo/";
        var url_to_send;

        for (let i = 0; i < gamelists.length; i++) {
            if (i == gamelists.length - 1) {
                console.log("entered end loop thing");
                url = url + gamelists[i].id;
            } else {
                console.log("looping");
                url = url + gamelists[i].id + "&";
            }
        }
        try {
            console.log("this is the sendin url");
            console.log(url);
            let response = await axios.get(url); // Use 'await' here;
            console.log("all the games");
            console.log(response.data);

            for (let i = 0; i < response.data.length; i++) {
                response.data[i].status = gamelists[i].status;
            }
            console.log("after adding status");
            console.log(response.data);
            setusergames(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        setuserinfo(user.user);
    }, []);

    useEffect(() => {
        getusergames(setusergames, user.user.gamelists);
    }, []);

    const summary_edit = () => {
        console.log("button lcicked");
        setflag(1);
    };
    const summary_submit = (setUser) => {
        console.log("working" + summary_change);
        console.log(userinfo);
        return axios
            .post(baseURL + "user/" + userinfo.id + "/summary", {
                username: userinfo.username,
                id: userinfo.id,
                summary: summary_change,
            })
            .then((response) => response.data)
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                setflag(0);
                setuserinfo(data);
            });
    };
    const summary_discard = () => {
        setflag(0);
    };

    if (flag == 0) {
        return (
            <div className="pageContainer">
                <div className="pageTitle">
                    <h1>{userinfo.username}</h1>
                </div>
                <div className="formContainer">
                    <div className="formTitle">
                        <p>Bio</p>
                    </div>
                    <p>{userinfo.summary}</p>
                    <div className="formWrapper">
                        <form
                            className="bioForm"
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log("submit");
                            }}
                        >
                            <input
                                className="formButton"
                                type="submit"
                                value="Edit"
                                onClick={summary_edit}
                            ></input>
                        </form>
                    </div>
                </div>
                <div className="pageTitle">
                    <h1>My Library</h1>
                </div>
                <div className="libraryButtonsContainer">
                    <Link className="libraryButton" to="/in_progress">
                        In Progress
                    </Link>
                    <Link className="libraryButton" to="/planned">
                        Planned
                    </Link>
                    <Link className="libraryButton" to="/finished">
                        Finished
                    </Link>
                    <Link className="libraryButton" to="/finished">
                        Dropped
                    </Link>
                </div>
                <div className="gameListContainer">
                    {usergames.map((g) => (
                        <GameUser key={g.id} game={g} />
                    ))}
                </div>
            </div>
        );
    } else
        return (
            <div className="pageContainer">
                <div className="pageTitle">
                    <h1>{userinfo.username}</h1>
                </div>
                <div className="formContainer">
                    <div className="formTitle">
                        <p>Bio</p>
                    </div>
                    <div className="formWrapper">
                        <form
                            className="bioForm"
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log("submit");
                            }}
                        >
                            <input
                                type="text"
                                name="summary"
                                defaultValue={userinfo.summary}
                                onChange={(e) => {
                                    e.preventDefault();
                                    console.log(e.target.value);
                                    setsummary_change(e.target.value);
                                }}
                            />
                            <input
                                className="formButton"
                                type="submit"
                                value="Confirm"
                                onClick={summary_submit}
                            ></input>
                            <input
                                className="formButton"
                                type="submit"
                                value="Cancel"
                                onClick={summary_discard}
                            ></input>
                        </form>
                    </div>
                </div>
                <ul>
                    {usergames.map((g) => (
                        <GameUser key={g.id} game={g} />
                    ))}{" "}
                </ul>
            </div>
        );
};

export default User_info;
