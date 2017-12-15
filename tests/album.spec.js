/* eslint-env mocha */

// getAlbum
// getAlbumTracks

import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { getAlbum, getAlbumTracks } from '../src/album';

//global.fetch = require('node-fetch');

chai.use(dirtyChai);
chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Album', () => {
  describe('Smoke tests', () => {
    it('should have a getAlbum method', () => {
      expect(getAlbum).to.exist();
      expect(getAlbum).to.be.a('function');
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
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/7bNuTiGB4drBIADr515ahJ');
      const album2 = getAlbum('7vncHusEBclbrc6G4vWl7M');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/7vncHusEBclbrc6G4vWl7M');
    });
    it('should return an object', () => {
      promise.resolves({ body: 'json' });
      const album = getAlbum('7vncHusEBclbrc6G4vWl7M');
      expect(album.resolveValue).to.be.eql({ body: 'json' });
    });
  });
});
