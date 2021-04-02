import React, { Component } from 'react';
import $ from "jquery";

import Wrapper from '../../hoc/Wrapper/Wrapper';
import LandingPage from '../Screens/LandingPage/LandingPage';

import { authEndpoint, clientId, redirectUri, scopes } from '../../helpers/secrets.js';
import hash from '../../helpers/hash.js';
import AUDIO_FEATURES from '../../helpers/audioColorMap.js';
import "../../App.css";

class Abyss extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            token: null,
            topGenres: null,
            tracklist: null,
            noTopGenres: false,
            noRecommendations: false,
        };

        this.ajaxHelper = this.ajaxHelper.bind(this);
        this.createTrackList = this.createTrackList.bind(this);
        this.getTopGenres = this.getTopGenres.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    componentDidMount = () => {
        let token = hash.access_token;
        if (token) {
            this.setState({
                token: token
            });
        }
    }

    ajaxHelper = (args) => {
        $.ajax({
            url: args.url,
            type: args.httpMethod,
            beforeSend: xhr => { xhr.setRequestHeader("Authorization", "Bearer " + this.state.token) },
            success: args.onSuccess,
            error: args.onError
        });
    }

    loginHandler = () => {
        let hyperlink = document.createElement("a");
        let linkSrc = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
        // debugger;

        hyperlink.setAttribute("href", linkSrc);
        hyperlink.click();
    }

    getTopGenres = callback => {
        if (this.state.token) {
            this.ajaxHelper({
                url: `https://api.spotify.com/v1/me/top/artists?limit=5`,
                onSuccess: response => {
                    if (!response) { this.setState({ noTopGenres: true }); }

                    let topGenres = "";
                    for (let i = 0; i < response.items.length; i++) {
                        let item = response.items[i];
                        topGenres += encodeURIComponent(item.genres[0]) + ",";
                    }

                    this.setState({ topGenres: topGenres });
                    callback();
                },
                onError: error => { if (error.status === "401") { this.setState({ token: null }); } }
            });
        }
    }

    createTrackList = colorKeyword => {
        if (this.state.token) {
            this.setState({ loading: true });
            const retrieveTracks = () => {
                let audioFeatures = AUDIO_FEATURES[colorKeyword];
                this.ajaxHelper({
                    url: `https://api.spotify.com/v1/recommendations?seed_genres=${this.state.topGenres}&max_popularity=40&limit=10&${audioFeatures}`,
                    onSuccess: response => {
                        if (!response) { this.setState({ noRecommendations: true }); }
                        let tracks = response.tracks;
                        let parsedTracks = [];

                        for (let i = 0; i < tracks.length; i++) {
                            let track = tracks[i];
                            parsedTracks.push({
                                trackId: track.id,
                                albumImage: track.album.images[1].url,
                                songTitle: track.name,
                                artist: track.artists[0].name,
                                album: track.album.name,
                                externalURL: track.external_urls.spotify
                            });
                        }
                        
                        this.setState({ tracklist: parsedTracks, loading: false });
                    },
                    onError: error => { if (error.status === "401") { this.setState({ token: null }); } }
                });
            }
            this.getTopGenres(retrieveTracks);
        }
    }

    render() {
        return (
            <Wrapper>
                <LandingPage
                    loading={this.state.loading}
                    hasToken={this.state.token}
                    tracklist={this.state.tracklist}
                    onLogin={this.loginHandler}
                    onCreatePlaylist={this.createTrackList}
                />
            </Wrapper>
        );
      }
    
}

export default Abyss;