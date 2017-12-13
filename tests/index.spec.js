/* eslint-env mocha */

import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/index';

global.fetch = require('node-fetch');

chai.use(dirtyChai);
chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Spotify wrapper', () => {
  describe('Smoke tests', () => {
    it('should exists the search method', () => {
      expect(search).to.exist();
    });
    it('should exists the searchAlbums method', () => {
      expect(searchAlbums).to.exist();
    });
    it('should exists the searchArtists method', () => {
      expect(searchArtists).to.exist();
    });
    it('should exists the searchTracks method', () => {
      expect(searchTracks).to.exist();
    });
    it('should exists the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist();
    });
  });
  describe('Generic search', () => {
    let fetchedStub;
    let promise;
    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });
    afterEach(() => {
      fetchedStub.restore();
    });
    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce();
    });
    it('should receive the correct url to fetch', () => {
      context('passing one type only', () => {
        const artists = search('Metallica', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Metallica&type=artist');
        const albums = search('Metallica', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Metallica&type=album');
      });
      context('passing more than one type', () => {
        const artistsAndAlbums = search('Metallica', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Metallica&type=artist,album');
      });
    });
    it('should return the JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Metallica', 'artist');
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });
});

