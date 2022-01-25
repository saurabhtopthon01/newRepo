const devURL = "http://localhost:3001/";
const proURL = "";

const baseURL = process.env.NODE_ENV === "production" ? proURL : devURL;

export default baseURL;
