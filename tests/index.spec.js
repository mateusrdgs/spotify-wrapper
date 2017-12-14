/* eslint-env mocha */

import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { search, searchArtist, searchAlbums, searchTracks, searchPlaylists } from '../src/index';

global.fetch = require('node-fetch');

chai.use(dirtyChai);
chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Spotify wrapper', () => {
  describe('Smoke tests', () => {
    it('should exists the search method', () => {
      expect(search).to.exist();
    });
    it('should exists the searchArtist method', () => {
      expect(searchArtist).to.exist();
    });
    it('should exists the searchAlbums method', () => {
      expect(searchAlbums).to.exist();
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
  describe('Search artists', () => {
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
      const artist = searchArtist('Lamb of God');
      expect(fetchedStub).to.have.been.calledOnce();
    });
    it('should fetch with the correct url', () => {
      const artist = searchArtist('Lamb of God');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Lamb of God&type=artist');

      const artist2 = searchArtist('Gojira');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Gojira&type=artist');
    });
  });
  describe('Search albums', () => {
    let fetchedStub;
    let promise;
    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });
    afterEach(() => {
      fetchedStub.restore();
    });
    it('should call the fetch function', () => {
      const albums = searchAlbums('Metallica');
      expect(fetchedStub).to.have.been.calledOnce();
    });
    it('should have been called with the correct url', () => {
      const albums = searchAlbums('Meshuggah');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Meshuggah&type=albums');
    });
  });
  describe('Search tracks', () => {
    let fetchedStub;
    let promise;
    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });
    afterEach(() => {
      fetchedStub.restore();
    });
    it('should call the fetch function', () => {
      const tracks = searchTracks('Trivium');
      expect(fetchedStub).to.have.been.calledOnce();
    });
    it('should have been called with the correct url', () => {
      const tracks = searchTracks('Trivium');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Trivium&type=tracks');
    });
  });
  describe('Search playlists', () => {
    let fetchedStub;
    let promise;
    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });
    afterEach(() => {
      fetchedStub.restore();
    });
    it('should call the fetch function', () => {
      const playlists = searchPlaylists('Týr');
      expect(fetchedStub).to.have.been.calledOnce();
    });
    it('should to have been called with the correct url', () => {
      const playlists = searchPlaylists('Týr');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Týr&type=playlists');
    });
  });
});
