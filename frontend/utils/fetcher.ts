import axios from 'axios';

const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true // for make cookie
    })
    .then((response) => response.data);

export default fetcher;