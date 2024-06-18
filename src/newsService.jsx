import axios from 'axios';

const API_KEY = '603cac94f6754be3bcd0791c3f6ba9f6';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = (page) => {

  console.log(page);
  return axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      country: 'in',
      apiKey: API_KEY,
      page: page,
      pageSize: 6, // Adjust page size as needed
    },
  });
};
