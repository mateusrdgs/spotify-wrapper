/* eslint-env mocha */

import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { getAlbum, getAlbums, getAlbumTracks } from '../src/index';
import { API_URL } from '../shared/consts';

chai.use(dirtyChai);
chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Album', () => {
  describe('Smoke tests', () => {
    it('should have a getAlbum method', () => {
      expect(getAlbum).to.exist();
      expect(getAlbum).to.be.a('function');
    });
    it('should have a getAlbums method', () => {
      expect(getAlbums).to.exist();
      expect(getAlbums).to.be.a('function');
    });
    it('should have a getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist();
      expect(getAlbumTracks).to.be.a('function');
    });
  });
  describe('getAlbum', () => {
    let stubedFetch;
    let promise;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });
    afterEach(() => {
      stubedFetch.restore();
    });
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should call fetch with the correct url', () => {
      const album = getAlbum('7bNuTiGB4drBIADr515ahJ');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}albums/7bNuTiGB4drBIADr515ahJ`);
      const album2 = getAlbum('7vncHusEBclbrc6G4vWl7M');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}albums/7vncHusEBclbrc6G4vWl7M`);
    });
    it('should return an object', () => {
      promise.resolves({ body: 'json' });
      const album = getAlbum('7vncHusEBclbrc6G4vWl7M');
      expect(album.resolveValue).to.be.eql({ body: 'json' });
    });
  });
  describe('getAlbums', () => {
    let stubedFetch;
    let promise;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });
    afterEach(() => {
      stubedFetch.restore();
    });
    it('should call the fetch method', () => {
      const albums = getAlbums(['2Bju49iO98LXuJsY2vKEqg', '7MejfRSNnrpcLZIxkeZDqR']);
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should have been called with the correct url', () => {
      const albums = getAlbums(['2Bju49iO98LXuJsY2vKEqg', '7MejfRSNnrpcLZIxkeZDqR']);
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}albums?ids=2Bju49iO98LXuJsY2vKEqg,7MejfRSNnrpcLZIxkeZDqR`);
    });
    it('should return an object', () => {
      promise.resolves({ body: 'json' });
      const albums = getAlbums(['2Bju49iO98LXuJsY2vKEqg', '7MejfRSNnrpcLZIxkeZDqR']);
      expect(albums.resolveValue).to.be.eql({ body: 'json' });
    });
  });
  describe('getAlbumTracks', () => {
    let stubedFetch;
    let promise;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });
    afterEach(() => {
      stubedFetch.restore();
    });
    it('should call the fetch method', () => {
      const tracks = getAlbumTracks('6gN4n4cfXQiVOm1gb8yWW4');
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should call the correct url', () => {
      const tracks = getAlbumTracks('6gN4n4cfXQiVOm1gb8yWW4');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}albums/6gN4n4cfXQiVOm1gb8yWW4/tracks`);
    });
    it('should return an object', () => {
      promise.resolves({ body: 'json' });
      const tracks = getAlbumTracks('5HsgM9kWoYVQCR0rAPI3tL');
      expect(tracks.resolveValue).to.be.eql({ body: 'json' });
    });
  });
});
