import axios from 'axios';

export async function getData(apiURL) {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/${apiURL}`);
  return response.data;
}

export async function postData(apiURL, body) {
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/${apiURL}`, body);
  return response.data;
}

export async function postDataForm(apiURL, data) {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/${apiURL}`, 
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
}

export async function putData(apiURL, body) {
  const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/${apiURL}`, body);
  return response.data;
}

export async function deleteData(apiURL, data) {
  const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/${apiURL}`, {data});
  return response.data;
}