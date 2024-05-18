import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://contact.herokuapp.com",
});

export default customFetch;
