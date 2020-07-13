import axios from 'axios';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/',
  timeout: 1000,
  headers: {
    Authorization: "Client-ID NnCKhkA_GXY8YUfZGaUXJNYCfiba-4QeKYFH1Oxedrs"
  }
});

export const search = searchString => {
  return unsplashApi.get(`/search/photos?query=${encodeURIComponent(searchString)}`);
};

export const getPhoto = id => {
  return unsplashApi.get(`/photos/${id}`);
};

export default unsplashApi;