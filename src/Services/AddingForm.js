import axios from "axios";
import { useState, useEffect } from "react";
import getURL from "./deploy";
const baseURL = getURL();

const AddingForm =  ({user,game,setupdatestatus}) => {
    const [status, setStatus] = useState("In_progress"); // default value will make it more tailored to logged in user if time is available

    console.log(game)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you might want to do something with the selected status, such as sending it to an API.
        console.log(`Status selected: ${status}`);
        statuschange(user,game.id,status,game.cover)
    };

    const statuschange = async (user,game_id,status,game_cover) => {
        console.log("this will be a new status" + status)
        console.log("this will be the user id/username")
        console.log(user)
        console.log("this will be the game")
        console.log(game_id)

try{
    console.log("trying to add game")
    let response = await axios.post(baseURL + "user/" + user.user.id + "/gamelist", {
        username: user.user.username,
        id: user.user.id,
        game_id: game_id,
        status: status,
        cover: game_cover
    })
    // return axios
    // .post(baseURL + "user/" + user.user.id + "/gamelist", {
    //     username: user.user.username,
    //     id: user.user.id,
    //     game_id: game_id,
    //     status: status,
    //     cover: game_cover
    // })
    // .then((response) => response.data)
    // .then((data) => {
console.log("chicken2")
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log("chicken3")
    setupdatestatus("Successfully Updated Status, please refresh page")    
        console.log(response.data)
    // });
}catch(error){
    console.log("unable to add game")
    setupdatestatus("Failed to  Updated Status")
}

    };
    return (
        <div className="statusFormContainer">
            <form onSubmit={handleSubmit} className="statusForm">
                <div className="formControl">
                    <label>
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="In_progress">In Progress</option>
                            <option value="Finished">Finished</option>
                            <option value="Planned">Planned</option>
                            <option value="Dropped">Dropped</option>
                        </select>
                    </label>
                </div>
                <button
                    type="submit"
                    className="submitButton"
                    // onChange={statuschange}
                >
                    Update Status
                </button>
            </form>
        </div>
    );
};

export default AddingForm;
