/* eslint-env mocha */

import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapper from '../src/index';

chai.use(dirtyChai);
chai.use(sinonChai);
sinonStubPromise(sinon);

describe('SpotifyWrapper Library', () => {
  describe('Smoke tests', () => {
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
  describe('Request', () => {
    let stubedFetch;
    let promise;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });
    afterEach(() => {
      stubedFetch.restore();
    });
    it('should have a request method', () => {
      let spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist();
    });
    it('should call fetch when request', () => {
      let spotify = new SpotifyWrapper({});
      spotify.request();
      expect(stubedFetch).to.have.been.calledOnce();
    });
    it('should have been called with the correct url', () => {
      let spotify = new SpotifyWrapper({});
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url');
    });
    it('should call fetch with the rights request headers', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo',
      });
      const REQUEST_OPTIONS = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer foo',
        },
      };
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url', REQUEST_OPTIONS);
    });
  });
});
