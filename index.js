import { getAlbum, getAlbums, getAlbumTracks } from './src/_index';

getAlbum('1E72ED2DF9qg7Dr08yCkHx').then(response => console.log(response));
getAlbums(['2k2dsjEAwQVhmjAyMQCCcl', '60B5KOeXnnJVHWqWcXH56f']).then(response => console.log(response));
getAlbumTracks(['7l0L2YHlQwAyI4QyZTIWGS']).then(response => console.log(response));
