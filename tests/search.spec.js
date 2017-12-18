/* eslint-env mocha */

import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';
import { API_URL } from '../shared/consts';

chai.use(dirtyChai);
chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Search', () => {
  let spotify;
  let stubedFetch;
  let promise;
  beforeEach(() => {
    spotify = new SpotifyWrapper({
      apiURL: 'https://api.spotify.com/v1',
      token: 'BQBTk_DaocGZlvW64gXf1AFlvbE1iQEA6rMya65wcjGzILAvM0GFqAKAFgFTDupHfbQmU81rsySqX7_6z4WxlmHyaH9AJ2g-XsZEkXM-LM_yiUeaF5ckbh5fEMrwqGKg2btXCps5bfaAc2PnEestduYrLBXtokpuAAmIRA',
    });
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });
  afterEach(() => {
    stubedFetch.restore();
  });
  describe('Smoke tests', () => {
    it('should exists the searchBy method', () => {
      expect(spotify.search.searchBy).to.exist();
    });
    it('should exists the searchArtist method', () => {
      expect(spotify.search.searchArtist).to.exist();
    });
    it('should exists the searchAlbums method', () => {
      expect(spotify.search.searchAlbums).to.exist();
    });
    it('should exists the searchTracks method', () => {
      expect(spotify.search.searchTracks).to.exist();
    });
    it('should exists the searchPlaylists method', () => {
      expect(spotify.search.searchPlaylists).to.exist();
    });
  });
  describe('Generic search', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.searchBy();
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should call fetch with the correct url', () => {
      context('passing one type only', () => {
        const artists = spotify.search.searchBy('Metallica', 'artist');
        expect(stubedFetch).to.have.been
          .calledWith(`${API_URL}search?q=Metallica&type=artist`);
        const albums = spotify.search.searchBy('Metallica', 'album');
        expect(stubedFetch).to.have.been
          .calledWith(`${API_URL}search?q=Metallica&type=album`);
      });
      context('passing more than one type', () => {
        const artistsAndAlbums = spotify.search.searchBy('Metallica', ['artist', 'album']);
        expect(stubedFetch).to.have.been
          .calledWith(`${API_URL}search?q=Metallica&type=artist,album`);
      });
    });
    it('should return the JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = spotify.search.searchBy('Metallica', 'artist');
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });
  describe('Search artists', () => {
    it('should call fetch function', () => {
      const artist = spotify.search.searchArtist('Lamb of God');
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should call fetch with the correct url', () => {
      const artist = spotify.search.searchArtist('Lamb of God');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}search?q=Lamb of God&type=artist`);
      const artist2 = spotify.search.searchArtist('Gojira');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}search?q=Gojira&type=artist`);
    });
  });
  describe('Search albums', () => {
    it('should call the fetch function', () => {
      const albums = spotify.search.searchAlbums('Metallica');
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should call fetch with the correct url', () => {
      const albums = spotify.search.searchAlbums('Meshuggah');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}search?q=Meshuggah&type=album`);
    });
  });
  describe('Search tracks', () => {
    it('should call the fetch function', () => {
      const tracks = spotify.search.searchTracks('Trivium');
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should call fetch with the correct url', () => {
      const tracks = spotify.search.searchTracks('Trivium');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}search?q=Trivium&type=tracks`);
    });
  });
  describe('Search playlists', () => {
    it('should call the fetch function', () => {
      const playlists = spotify.search.searchPlaylists('Týr');
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should call fetch with the correct url', () => {
      const playlists = spotify.search.searchPlaylists('Týr');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}search?q=Týr&type=playlists`);
    });
  });
});
