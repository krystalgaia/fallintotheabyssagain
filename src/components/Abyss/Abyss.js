import React, { Component } from 'react';
import $ from "jquery";

import Wrapper from '../../hoc/Wrapper/Wrapper';
import LandingPage from '../Screens/LandingPage/LandingPage';

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
        let linkSrc = process.env.REACT_APP_ABYSS_AUTHENDPOINT +
                        "?client_id=" + process.env.REACT_APP_ABYSS_CLIENT_ID +
                        "&redirect_uri=" + process.env.REACT_APP_ABYSS_REDIRECT_URI +
                        "&scope=" + process.env.REACT_APP_ABYSS_USER_SCOPES +
                        "&response_type=" + process.env.REACT_APP_ABYSS_RESPONSE_TYPE;

        hyperlink.setAttribute("href", linkSrc);
        hyperlink.click();
    }

    getTopGenres = callback => {
        if (this.state.token) {
            this.ajaxHelper({
                url: `${process.env.REACT_APP_ABYSS_TOP_GENRES_ENDPOINT}?limit=${process.env.REACT_APP_ABYSS_GENRE_LIMIT}`,
                onSuccess: response => {
                    if (!response) { this.setState({ loading: false, noTopGenres: true }); return; }

                    let topGenres = "";
                    for (let i = 0; i < response.items.length; i++) {
                        let item = response.items[i];
                        topGenres += encodeURIComponent(item.genres[0]) + ",";
                    }

                    if (topGenres === "") {
                        this.setState({ loading: false, noTopGenres: true });
                    } else {
                        this.setState({ topGenres: topGenres });
                        callback();
                    }
                },
                onError: error => {
                    if (error.status === "401") {
                        this.setState({ loading: false, token: null });
                    } else {
                        this.setState({ loading: false, noTopGenres: true });
                    }
                }
            });
        }
    }

    createTrackList = colorKeyword => {
        if (this.state.token) {
            this.setState({ loading: true });
            const retrieveTracks = () => {
                let audioFeatures = AUDIO_FEATURES[colorKeyword];
                this.ajaxHelper({
                    url: process.env.REACT_APP_ABYSS_TRACKLIST_ENDPOINT +
                            "?seed_genres=" +this.state.topGenres +
                            "&max_popularity=" + process.env.REACT_APP_ABYSS_MAX_POPULARITY +
                            "&limit=" + process.env.REACT_APP_ABYSS_TRACKLIST_LIMIT +
                            "&" + audioFeatures,
                    onSuccess: response => {
                        if (!response) { this.setState({ loading: false, noRecommendations: true }); return; }
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

                        if (parsedTracks.length === 0) {
                            this.setState({ loading: false, noRecommendations: true });
                        } else {
                            this.setState({ tracklist: parsedTracks, loading: false });
                        }
                    },
                    onError: error => {
                        if (error.status === "401") {
                            this.setState({ loading: false, token: null });
                        } else {
                            this.setState({ loading: false, noRecommendations: true });
                        }
                    }
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
                    noData={this.state.noRecommendations || this.state.noTopGenres}
                    tracklist={this.state.tracklist}
                    onLogin={this.loginHandler}
                    onCreatePlaylist={this.createTrackList}
                />
            </Wrapper>
        );
      }
    
}

export default Abyss;