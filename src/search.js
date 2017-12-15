/* eslint-env browser */

import { API_URL, REQUEST_OPTIONS, RESPONSE_HANDLER } from '../shared/consts';

global.fetch = require('node-fetch');

export const search = (query, type) =>
  fetch(`${API_URL}search?q=${query}&type=${type}`, REQUEST_OPTIONS)
    .then(RESPONSE_HANDLER);

export const searchArtist = query =>
  search(query, 'artist');

export const searchAlbums = query =>
  search(query, 'album');

export const searchTracks = query =>
  search(query, 'tracks');

export const searchPlaylists = query =>
  search(query, 'playlists');
