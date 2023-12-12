const InProgress = () => {
    const Game = (paramDict) => {
        return (
            <li className="gameListItem">
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
                    <h1>In Progress</h1>
                </div>
                <div className="gameListContainer">
                    <p>Insert Games List Here</p>
                </div>
            </div>
        );
    } else {
        <div className="pageContainer">
            <div className="pageTitle">
                <h1>In Progress</h1>
            </div>
            <div className="loginMessage">
                <p>Please log in to add games</p>
            </div>
        </div>;
    }
};

export default InProgress;
