import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';

import getURL from './deploy';
const baseURL = getURL();

const GameUser = ({game}) => {
  console.log("entered game user")
    const [coverDisplayed, setCoverDisplayed] = useState(
        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg")
        const [game_status, setgame_status] = useState(game.status)

    const coverurl = baseURL + 'cover/' + game.cover 
    const getCover = async () => {
        
        let response = await axios.get(coverurl)
        console.log("Cover response: ", response)
        
        if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].url) {
            
            setCoverDisplayed(response.data[0].url.replace('t_thumb', 't_cover_big'));
        } else {
            // Handle the case when the cover is not available
            console.error('Cover is not available');
            // Optionally, you can set a default cover here
            // setCoverDisplayed('path/to/default/cover.png');
        }
    }

    useEffect(() => {
        getCover()
        console.log(game)},[])
        return (
            <div className="GameContainer">
                <div className="gameListItem">
                    <Link
                        style={{ textDecoration: "none" }}
                        to={"/game/" + game.id}
                    >
                        <div className="gameTitle">{game.name}</div>
                        <img className="gameCover" src={coverDisplayed}></img>
                     
                    </Link>
                </div>
                <div className="gameStatus">
                    <p>{game_status}</p>
                    </div>
            </div>
        );
    }


export default GameUser