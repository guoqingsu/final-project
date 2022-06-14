import axios from 'axios';
import { toast } from 'react-toastify';
const authedRequest = axios.create();

authedRequest.interceptors.request.use(function (config) {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json',
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});

authedRequest.interceptors.response.use(function (response) {
  return response;
}, function (err) {
  toast.error(err.response.data, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return Promise.reject(err);
});



export {
  authedRequest
}
