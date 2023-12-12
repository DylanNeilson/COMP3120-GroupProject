const Planned = () => {
    const Game = (paramDict) => {
        return (
            <li className="game_listitem">
                <div className="game_thumbnail">
                    <img src={paramDict.image} alt="thumbnail" />
                </div>
            </li>
        );
    };

    const user = true;

    // Render the component
    if (user != null) {
        return (
            <div className="pageContainer">
                <div className="pageTitle">
                    <h1>Planned</h1>
                </div>
                <div className="gameListContainer">
                    <p>Insert Games List Here</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="pageContainer">
                <div className="pageTitle">
                    <h1>Planned</h1>
                </div>
                <div className="loginMessage">
                    <p>Please log in to add games</p>
                </div>
            </div>
        );
    }
};

export default Planned;
