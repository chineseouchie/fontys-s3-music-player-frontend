import React, { Component } from 'react';
import {formatUnixToDMY} from '../util/util';

class MpLibrary extends Component {
	constructor(props) {
		super();
		this.state = {
			songs: {},
			loaded: false
		};

	}

	componentDidMount() {
		// const formdata = new FormData();
		// formdata.append('userId', 18);

		fetch('http://localhost:8080/song?userId=18')
		.then(result => result.json())
		.then(data => {
			data.songs.forEach(item => {
				item.dateAdded = formatUnixToDMY(item.dateAdded);
			});
			this.setState({
				songs: [...data.songs],
				loaded: true
			});
		});
	}

	onClickSong = (id, e) => {
		e.preventDefault();
		this.state.songs.forEach(element => {
			if (element.songId === id) {
				this.props.getCurrentSong(element);
			}
		});
		
    }

	render() {
		let songs = this.state.songs;
		let data;
		if(this.state.loaded) {
			data = <div className="list">
				{ songs.map((item, index) =>
					<div className="playlist-song-item flex-center" key={item.songId} onClick={this.onClickSong.bind(this, item.songId)}>
						<div className="song-id flex-center">{index + 1}</div>
						<div className="song-info">
							<div>{item.name}</div>
							<div>{item.artistName}</div>
						</div>
						<div className="date-added">{item.dateAdded}</div>
						<div className="song-time flex-center">{item.duration}</div>
					</div>
				) }
			</div>;
		}

		return <div>
			{data}
		</div>;
	}
}

export default MpLibrary;
