/* eslint-env browser */

require('dotenv').config();

export const search = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
    },
  })
    .then(response => response.json());


export const searchArtist = query =>
  search(query, 'artist');

export const searchAlbums = query =>
  search(query, 'album');

export const searchTracks = query =>
  search(query, 'tracks');

export const searchPlaylists = query =>
  search(query, 'playlists');
