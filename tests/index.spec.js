/* eslint-env mocha */

import { expect } from 'chai';
import SpotifyWrapper from '../src/index';

describe('SpotifyWrapper Library', () => {
  it('should create a new instance of SpotifyWrapper', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });
  it('should receive apiURL as an option', () => {
    let spotify = new SpotifyWrapper({
      apiURL: 'teste',
    });
    expect(spotify.apiURL).to.be.equal('teste');
  });
  it('should use the default URL if not provided', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1/');
  });
  it('should receive token as an option', () => {
    let spotify = new SpotifyWrapper({
      token: 'foo',
    });
    expect(spotify.token).to.be.equal('foo');
  });
});

