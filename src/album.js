/* eslint-env browser */

require('dotenv').config();

export const getAlbum = id =>
  fetch(`https://api.spotify.com/v1/albums/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
    },
  })
    .then(response => response.json());

export const getAlbumTracks = () => {};
