import axios from 'axios';

async function getData(apiURL) {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/${apiURL}`);
  return response.data;
}



export {
  getData,
}