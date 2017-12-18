/* eslint-env browser  */

import search from './search';
import album from './album';
import { API_URL } from '../shared/consts';

global.fetch = require('node-fetch');

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
    this.search = search.bind(this)();
    this.album = album.bind(this)();
  }
  request(url) {
    const REQUEST_OPTIONS = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    return fetch(url, REQUEST_OPTIONS);
  }
}
