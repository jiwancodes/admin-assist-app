import axios from 'axios';

function getUrl(){
    const env_var = (typeof window._env_ !== "undefined")?window._env_:process.env;
    return env_var. DBADMIN_ASSIST_APP_URL;
}
const axiosOrder=axios.create({
    baseURL:getUrl()
})
export default axiosOrder;