const currentHost = window.location.host;
//const baseURL = `http://${currentHost}/`;
const baseURL = "http://127.0.0.1:8000/";
export const variables = {
    Server_URL: baseURL,
    API_URL: `${baseURL}Api/`,
    PHOTO_URL: `${baseURL}Photos/`
};