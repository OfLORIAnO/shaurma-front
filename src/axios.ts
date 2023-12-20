import axios from 'axios';

const instance: any = axios.create({
  // baseURL: 'http://localhost:10000',
  // baseURL: 'https://korabelka-back.onrender.com',
  baseURL: 'https://shaurma-back.onrender.com',
});

type хз = {headers: {Authorization: string | null}};

instance.interceptors.request.use((config: хз) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
