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

describe('Album', () => {
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
    it('should have a getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist();
      expect(spotify.album.getAlbum).to.be.a('function');
    });
    it('should have a getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist();
      expect(spotify.album.getAlbums).to.be.a('function');
    });
    it('should have a getTracks method', () => {
      expect(spotify.album.getTracks).to.exist();
      expect(spotify.album.getTracks).to.be.a('function');
    });
  });
  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should call fetch with the correct url', () => {
      const album = spotify.album.getAlbum('7bNuTiGB4drBIADr515ahJ');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}albums/7bNuTiGB4drBIADr515ahJ`);
      const album2 = spotify.album.getAlbum('7vncHusEBclbrc6G4vWl7M');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}albums/7vncHusEBclbrc6G4vWl7M`);
    });
    it('should return an object', () => {
      promise.resolves({ body: 'json' });
      const album = spotify.album.getAlbum('7vncHusEBclbrc6G4vWl7M');
      expect(album.resolveValue).to.be.eql({ body: 'json' });
    });
  });
  describe('getAlbums', () => {
    it('should call the fetch method', () => {
      const albums = spotify.album.getAlbums(['2Bju49iO98LXuJsY2vKEqg', '7MejfRSNnrpcLZIxkeZDqR']);
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should have been called with the correct url', () => {
      const albums = spotify.album.getAlbums(['2Bju49iO98LXuJsY2vKEqg', '7MejfRSNnrpcLZIxkeZDqR']);
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}albums?ids=2Bju49iO98LXuJsY2vKEqg,7MejfRSNnrpcLZIxkeZDqR`);
    });
    it('should return an object', () => {
      promise.resolves({ body: 'json' });
      const albums = spotify.album.getAlbums(['2Bju49iO98LXuJsY2vKEqg', '7MejfRSNnrpcLZIxkeZDqR']);
      expect(albums.resolveValue).to.be.eql({ body: 'json' });
    });
  });
  describe('getTracks', () => {
    it('should call the fetch method', () => {
      const tracks = spotify.album.getTracks('6gN4n4cfXQiVOm1gb8yWW4');
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should call the correct url', () => {
      const tracks = spotify.album.getTracks('6gN4n4cfXQiVOm1gb8yWW4');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}albums/6gN4n4cfXQiVOm1gb8yWW4/tracks`);
    });
    it('should return an object', () => {
      promise.resolves({ body: 'json' });
      const tracks = spotify.album.getTracks('5HsgM9kWoYVQCR0rAPI3tL');
      expect(tracks.resolveValue).to.be.eql({ body: 'json' });
    });
  });
});
