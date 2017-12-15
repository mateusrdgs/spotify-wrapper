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
    let stubedFetch;
    let promise;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });
    afterEach(() => {
      stubedFetch.restore();
    });
    it('should call fetch function', () => {
      const artists = search();
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should receive the correct url to fetch', () => {
      context('passing one type only', () => {
        const artists = search('Metallica', 'artist');
        expect(stubedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Metallica&type=artist');
        const albums = search('Metallica', 'album');
        expect(stubedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Metallica&type=album');
      });
      context('passing more than one type', () => {
        const artistsAndAlbums = search('Metallica', ['artist', 'album']);
        expect(stubedFetch).to.have.been
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
    let stubedFetch;
    let promise;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });
    afterEach(() => {
      stubedFetch.restore();
    });
    it('should call fetch function', () => {
      const artist = searchArtist('Lamb of God');
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should fetch with the correct url', () => {
      const artist = searchArtist('Lamb of God');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Lamb of God&type=artist');

      const artist2 = searchArtist('Gojira');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Gojira&type=artist');
    });
  });
  describe('Search albums', () => {
    let stubedFetch;
    let promise;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });
    afterEach(() => {
      stubedFetch.restore();
    });
    it('should call the fetch function', () => {
      const albums = searchAlbums('Metallica');
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should have been called with the correct url', () => {
      const albums = searchAlbums('Meshuggah');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Meshuggah&type=album');
    });
  });
  describe('Search tracks', () => {
    let stubedFetch;
    let promise;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });
    afterEach(() => {
      stubedFetch.restore();
    });
    it('should call the fetch function', () => {
      const tracks = searchTracks('Trivium');
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should have been called with the correct url', () => {
      const tracks = searchTracks('Trivium');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Trivium&type=tracks');
    });
  });
  describe('Search playlists', () => {
    let stubedFetch;
    let promise;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });
    afterEach(() => {
      stubedFetch.restore();
    });
    it('should call the fetch function', () => {
      const playlists = searchPlaylists('Týr');
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should to have been called with the correct url', () => {
      const playlists = searchPlaylists('Týr');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Týr&type=playlists');
    });
  });
});
