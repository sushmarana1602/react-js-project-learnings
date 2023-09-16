import axios from "axios";
const baseUrl = 'http://127.0.0.1:8000/api/visualization/v1';


const client = axios.create({
    baseURL: baseUrl
  });

export const api = async (endpoint, requestData)=> {
    try {
    return await client.post(`/${endpoint}`, requestData).then((res) => {
        return res;
    }).catch((error) => {
        return error.response;
    });
    } catch (error) {
        console.error(error);
    } finally {
      console.log("error")
    }
}
