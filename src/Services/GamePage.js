import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddingForm from "./AddingForm";

import getURL from "./deploy";
const baseURL = getURL();
const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

const GamePage = (user) => {
    const chicken = user; // change from chicken
    const [gameDisplayed, setGameDisplayed] = useState([]); // might need to change to prevent page crash
    const baseurl = baseURL + "gameinfo/" + useParams().id;
    const [coverDisplayed, setCoverDisplayed] = useState(noImage);
    const [update_status, setupdatestatus] = useState('');
    const getCover = async (id) => {
        const coverurl = baseURL + "cover/" + id;
        let response = await axios.get(coverurl);
        console.log("Cover response: ", response);

        if (
            Array.isArray(response.data) &&
            response.data.length > 0 &&
            response.data[0].url
        ) {
            setCoverDisplayed(
                response.data[0].url.replace("t_thumb", "t_cover_big")
            );
        } else {
            // Handle the case when the cover is not available
            console.error("Cover is not available");
        }
    };

    const fetchGame = async () => {
        let response = await axios.get(baseurl);
        console.log("response: ", response);
        setGameDisplayed(response.data[0]);
        getCover(response.data[0].cover);
    };

    useEffect(() => {
        fetchGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(gameDisplayed)
    if (chicken.user != null) {
        return (
            <div className="pageContainer">
                <div className="pageTitle">
                    <h1>{gameDisplayed.name}</h1>
                </div>
                <div className="gamePageDisplay">
                    <img className="gameImage" src={coverDisplayed}></img>
                    <div className="gameDescription">
                        <h2>Summary:</h2>
                        <p>{gameDisplayed.summary}</p>
                        <AddingForm user={chicken} game={gameDisplayed} setupdatestatus={setupdatestatus} />
                    </div>
                </div>
                <p>{update_status}</p>
            </div>
        );
    } else
        return (
            <div className="pageContainer">
                <div className="pageTitle">
                    <h1>{gameDisplayed.name}</h1>
                </div>
                <div className="gamePageDisplay">
                    <img className="gameImage" src={coverDisplayed}></img>
                    <div className="gameDescription">
                        <h2>About</h2>
                        <p>{gameDisplayed.summary}</p>
                        <div className="loginMessage">
                            <p>Please log in to add game</p>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default GamePage;
