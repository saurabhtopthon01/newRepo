const devURL = "http://localhost:3001/";
const proURL = "https://internrepo.herokuapp.com/";

const baseURL = process.env.NODE_ENV === "production" ? proURL : devURL;

export default baseURL;
