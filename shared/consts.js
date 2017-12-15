require('dotenv').config();

export const API_URL = 'https://api.spotify.com/v1/';
export const REQUEST_OPTIONS = {
  method: 'GET',
  headers: {
    Authentication: `Bearer ${process.env.SPOTIFY_TOKEN}`,
  },
};
export const RESPONSE_HANDLER = response => response.json();
