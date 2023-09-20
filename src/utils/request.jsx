import axios from "axios";
const baseUrl = 'http://127.0.0.1:8000/api/visualization/v1';


const client = axios.create({
    baseURL: baseUrl
  });

export const api = async (endpoint, requestData=null, method='get')=> {
    const organization = localStorage.getItem('organization') && JSON.parse(localStorage.getItem('organization'));
   // if (organization) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') && `Bearer ${localStorage.getItem('token')}`,
        'Organization': organization && organization.id && organization.id
      }
   // }
    try {
    return await client.request({
        method : method, 
        url: `/${endpoint}`, 
        data: requestData,
        headers: headers
    }).then((res) => {
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
