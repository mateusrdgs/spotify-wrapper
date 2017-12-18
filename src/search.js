export default function search() {
  return {
    searchBy: (query, type) => this.request(`${this.apiURL}/search?q=${query}&type=${type}`),
    searchArtist: query => this.search.searchBy(query, 'artist'),
    searchAlbums: query => this.search.searchBy(query, 'album'),
    searchTracks: query => this.search.searchBy(query, 'tracks'),
    searchPlaylists: query => this.search.searchBy(query, 'playlists'),
  };
}
