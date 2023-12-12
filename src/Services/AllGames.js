import React, { useState, useEffect } from "react";
import axios from "axios";
import Game from "./Game";

import getURL from "./deploy";
const baseURL = getURL();

const AllGames = () => {
    const [allGames, setAllGames] = useState([]);
    const getAllGames = async () => {
        try {
            let response = await axios.get(baseURL); // Use 'await' here;
            setAllGames(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const [recentGames, setRecentGames] = useState([]);
    const getRecentGames = async () => {
        try {
            let response = await axios.get(baseURL + "recent"); // Use 'await' here;
            setRecentGames(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getAllGames();
        getRecentGames();
    }, []);

    console.log(allGames);
    // Render the component
    return (
        <div className="pageContainer">
            <div className="pageTitle">
                <h1>Recently Released</h1>
            </div>
            <div className="gameListContainer">
                {recentGames.map((g) => (
                    <Game key={g.id} game={g} />
                ))}
            </div>
            <div class="pageTitle">
                <h1>Discover</h1>
            </div>
            <div className="gameListContainer">
                {allGames.map((g) => (
                    <Game key={g.id} game={g} />
                ))}
            </div>
        </div>
    );
}; //covers are grabbed on line 32

export default AllGames;
