// import { search, searchArtist, searchAlbums, searchTracks, searchPlaylists } from './search';
// import { getAlbum, getAlbums, getAlbumTracks } from './album';
import { API_URL } from '../shared/consts';
/* export default {
  search,
  searchArtist,
  searchAlbums,
  searchTracks,
  searchPlaylists,
  getAlbum,
  getAlbums,
  getAlbumTracks,
}; */
export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
  }
}

