import React, { useState, useEffect } from "react";
import axios from "axios";
import Game from "./Game";
import { useParams } from "react-router-dom";
// import AdvSettings from './AdvSettings';
import getURL from "./deploy";
const baseURL = getURL();

const IGDBlookup = ({ term }) => {
    const [searchedGames, setSearchedGames] = useState([]);
    const termSearched = useParams().id;

    const api_call = async (term) => {
        try {
            let response = await axios.get(baseURL + "search/" + term); // Use 'await' here
            console.log(response.data);
            setSearchedGames(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        api_call(termSearched);
    }, [termSearched]);

    return (
        <div>
            <div className="pageContainer">
                <div className="pageTitle">
                    <h1>Results for "{termSearched}"</h1>
                </div>
                <div className="gameListContainer">
                    {searchedGames.map((g) => (
                        <Game key={g.id} game={g} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IGDBlookup;
// made it up to "https://api-docs.igdb.com/#requests" in the documentation
// not sure how to proceed, so I'll just leave this here for now
