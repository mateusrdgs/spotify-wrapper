/* eslint-env browser */

export const search = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`)
    .then(response => response.json());

export const searchArtist = query =>
  search(query, 'artist');

export const searchAlbums = query =>
  search(query, 'albums');

export const searchTracks = query =>
  search(query, 'tracks');

export const searchPlaylists = query =>
  search(query, 'playlists');
