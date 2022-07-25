//import express from 'express';
//import morgan from 'morgan';
//import SpotifyClient from './SpotifyClient';

const express = require('express');
const morgan = require('morgan');

//import fetch from 'isomorphic-fetch';
//import URI from 'urijs';
//import camelcaseKeys from 'camelcase-keys';
//import btoa from 'btoa';
const fetch = require('isomorphic-fetch');
const URI = require('urijs');
const btoa = require('btoa');
const camelcaseKeys = require('camelcase-keys');

const app = express();

app.set('port', (process.env.API_PORT || 3001));

if (process.env.NODE_ENV !== 'TEST') {
  app.use(morgan('combined'));
}

// A fake API token our server validates
//export const API_TOKEN = 'D6W69PRgCoDKgHZGJmRUNA';
const API_TOKEN = 'D6W69PRgCoDKgHZGJmRUNA';

const extractToken = (req) => (
  req.query.token
);

const authenticatedRoute = ((req, res, next) => {
  const token = extractToken(req);

  if (token) {
    if (token === API_TOKEN) {
      return next();
    } else {
      return res.status(403).json({
        success: false,
        error: 'Invalid token provided',
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      error: 'No token provided. Supply token as query param `token`',
    });
  }
});

app.get('/api/check_token', (req, res) => {
  const token = extractToken(req);

  if (token) {
    if (token === API_TOKEN) {
      return res.json({ valid: true });
    } else {
      return res.json({ valid: false });
    }
  } else {
    return res.status(400).json({
      valid: false,
      error: 'No token found in `Authorization` header',
    });
  }
});

app.get('/api/albums', authenticatedRoute, (req, res) => {
  const albumIds = req.query.ids.split(',');

  SpotifyClient.getAlbums(albumIds).then((albums) => (
    res.json(albums)
  )).catch((error) => (
    res.status(500).json({
      success: false,
      message: 'There was an error when interfacing with Spotify',
      error: error,
    })
  ));
});

// Make things more noticeable in the UI by introducing a fake delay
// to logins
const FAKE_DELAY = 500; // ms
app.post('/api/login', (req, res) => {
  setTimeout(() => (
    res.json({
      success: true,
      token: API_TOKEN,
    })
  ), FAKE_DELAY);
});

//export default app;

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});


/**
 * import SpotifyClient
*/
const SPOTIFY_CLIENT_ID = '6518e61ac2a54a968ad5db5fc9d4806f';
const SPOTIFY_CLIENT_SECRET = '24492f0774a0437181877887cb68ac9e';
const BASE_64_ENCODED_CLIENT_CREDENTIALS = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)

const getFirstImageUrl = (images) => (
  images && images[0] && images[0].url
);

// Makes the artist page more interesting by removing albums that are dupes
// like deluxe editions, remasters, etc.
const filterDupes = (albums) => (
  albums.reduce((memo, album) => {
    if (!memo.find((m) => m.name === album.name)) {
      return memo.concat(album);
    } else {
      return memo;
    }
  }, [])
);

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log('Error communicating with Spotify:');
    console.log(error);
    throw error;
  }
}

function parseJson(response) {
  return response.json();
}

function parseAlbum(album) {
  return {
    id: album.id,
    tracks: album.tracks && album.tracks.items.map((i) => parseTrack(i)),
    artist: parseArtist(album.artists[0]),
    year: album.releaseDate && album.releaseDate.slice(0, 4),
    imageUrl: getFirstImageUrl(album.images),
    name: album.name.replace(/\s\(.+\)$/, ''),
  };
}

function parseArtist(artist) {
  return {
    imageUrl: getFirstImageUrl(artist.images),
    name: artist.name,
    id: artist.id,
  };
}

function parseTrack(track) {
  return {
    albumImage: track.album && getFirstImageUrl(track.album.images),
    name: track.name,
    durationMs: track.durationMs,
    id: track.id,
    trackNumber: track.trackNumber,
    previewUrl: track.previewUrl,
  };
}

const SPOTIFY_BASE_URI = 'https://api.spotify.com/v1';

const SpotifyClient = {

  _getWithToken(url, token) {
    return fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(checkStatus)
      .then(parseJson)
      .then((data) => camelcaseKeys(data, { deep: true }));
  },

  _get(url) {
    if (this.token) {
      return this._getWithToken(url, this.token)
    } else {
      return this._getApiToken().then((token) => (
        this._getWithToken(url, token)
      ));
    }
  },

  _getApiToken() {
    return fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${BASE_64_ENCODED_CLIENT_CREDENTIALS}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then(checkStatus)
      .then(parseJson)
      .then((json) => json.access_token)
      .then((token) => this.token = token)
  },

  getAlbum(albumId) {
    return this._get(
      SPOTIFY_BASE_URI + '/albums/' + albumId
    ).then((data) => parseAlbum(data));
  },

  getAlbums(albumIds) {
    return this._get(
      SPOTIFY_BASE_URI + '/albums?ids=' + albumIds.join(',')
    ).then((data) => (
      data.albums.map((a) => parseAlbum(a))
    ));
  },

  getArtist(artistId) {
    return this._get(
      SPOTIFY_BASE_URI + '/artists/' + artistId
    ).then((data) => parseArtist(data));
  },

  getArtistTopTracks(artistId) {
    const url = URI(
      SPOTIFY_BASE_URI + '/artists/' + artistId + '/top-tracks'
    ).query({ country: 'us' });

    return this._get(url).then((data) => (
      data.tracks.map((t) => parseTrack(t))
    ));
  },

  getArtistAlbums(artistId) {
    const url = (
      SPOTIFY_BASE_URI + '/artists/' + artistId + '/albums?album_type=album'
    );

    return this._get(url).then((data) => (
      data.items.map((a) => parseAlbum(a))
    ));
  },

  getArtistAlbumsDetailed(artistId) {
    return this.getArtistAlbums(artistId)
             .then((albums) => this.getAlbums(
               albums.map((a) => a.id)
             ));
  },

  getArtistDetailed(artistId) {
    return Promise.all([
      this.getArtist(artistId),
      this.getArtistTopTracks(artistId),
      this.getArtistAlbumsDetailed(artistId),
    ]).then(([ artist, topTracks, albums ]) => ({
      artist,
      topTracks,
      albums: filterDupes(albums),
    }));
  },
}