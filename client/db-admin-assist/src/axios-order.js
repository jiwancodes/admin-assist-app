import axios from 'axios';

function getUrl(){
    const env_var = (typeof window._env_ !== "undefined")?window._env_:process.env;
    console.log(env_var.REACT_APP_SERVER_URL);
    return env_var.REACT_APP_SERVER_URL;
}
const axiosOrder = axios.create({
    baseURL:getUrl()
})
export default axiosOrder;