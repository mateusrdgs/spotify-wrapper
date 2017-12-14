import { searchAlbums } from './index';

global.fetch = require('node-fetch');

const albums = searchAlbums('Saltatio Mortis');

albums.then(response => console.log(response));
