/* eslint-env browser */

import { API_URL, REQUEST_OPTIONS, RESPONSE_HANDLER } from '../shared/consts';

global.fetch = require('node-fetch');

export const getAlbum = id =>
  fetch(`${API_URL}albums/${id}`, REQUEST_OPTIONS)
    .then(RESPONSE_HANDLER);

export const getAlbums = ids =>
  fetch(`${API_URL}albums?ids=${ids}`, REQUEST_OPTIONS)
    .then(RESPONSE_HANDLER);

export const getAlbumTracks = id =>
  fetch(`${API_URL}albums/${id}/tracks`, REQUEST_OPTIONS)
    .then(RESPONSE_HANDLER);
