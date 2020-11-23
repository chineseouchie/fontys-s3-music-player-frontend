import React, { Component } from 'react';
import './Playlist.css';

class Playlist extends Component {
	constructor(props) {
		super();
		this.state = {
			playlistId: props.match.params.id,
			songs: [
				{id: 1, songName: 'BBIBBI', artist: 'IU', time: '3:32', dateAdded: '15-01-2020', liked: true},
				{id: 2, songName: 'Icecream Cake', artist: 'Red Velvet', time: '3:23', dateAdded: '15-01-2020', liked: false}
			]
		};
	}

	static getDerivedStateFromProps(nextProps){
		return {playlistId: nextProps.match.params.id};
	}

	onClickSong = (id, e) => {
		e.preventDefault();
		for (var i=0; i < this.state.songs.length; i++) {
			if (this.state.songs[i].id === id) {
				this.props.getCurrentSong(this.state.songs[i]);
			}
		}
    }

	render() {
		return <div>
			<div data-testid="playlistId">{this.state.playlistId}</div>
			
			<div className="list">
				{ this.state.songs.map((item) => 
					<div className="playlist-song-item flex-center" key={item.id} onClick={this.onClickSong.bind(this, item.id)}>
						<div className="song-id flex-center">{item.id}</div>
						<div className="song-info">
							<div>{item.songName}</div>
							<div>{item.artist}</div>
						</div>
						<div className="date-added">{item.dateAdded}</div>
						<div className="song-time flex-center">{item.time}</div>
					</div>
				) }
			</div>
		</div>;
	}
}

export default Playlist;
