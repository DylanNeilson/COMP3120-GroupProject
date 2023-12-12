const deployed = true;
const baseURL = deployed
    ? "https://group-ajld-comp3120-assignment2.onrender.com/"
    : "http://localhost:3001/";
// const baseURL =    "http://localhost:3001/";
const getURL = () => {
    return baseURL;
};

export default getURL;
