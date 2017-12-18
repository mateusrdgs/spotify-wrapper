import SpotifyWrapper from './src/index';

const spotifyWrapper = new SpotifyWrapper({
  apiURL: 'https://api.spotify.com/v1',
  token: 'BQB2_lKkq4WoJnMqQqjF4jTKt8ctUrK_q-YSS1Nsl1lZFCuuh4nvxX_8VY2emRjLZTxefDKLJAGO9xl1aEI-ITrCtks_mSoe5BT0rXhQGf6P-oRS0-f7XsE9Jv5VQLid4fkvlHjII8Z1tT6e4z3PUK3h-1STTyMQ_2IKng',
});

spotifyWrapper
  .search.searchArtist('DVBBS')
  .then(response => response.json())
  .then((data) => {
    const { items } = data.artists;
    console.log(items);
  });
