import React, { Component } from 'react';
import './Footer.css';
import SockJsClient from 'react-stomp';
import {convertMinutesToSeconds, formatTime, getByteArray, websocketMessage} from '../util/util';
import { faHeart, faVolumeUp, faBackward, faForward, faPlay, faPause  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Footer extends Component {
	constructor(props) {
		super();
		this.state = {
			song: {},
			currentTime: '0:00',
			songPlaying: false,
			volume: null,
			defaultVolume: 30
		};

		this.audioRef = React.createRef();
		this.sockJs = React.createRef();
		this.onPlayPause = this.onPlayPause.bind(this);
		this.onEnded = this.onEnded.bind(this);
		this.updateTime = this.updateTime.bind(this);
		this.changeVolume = this.changeVolume.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	static getDerivedStateFromProps(nextProps){
		return {song: nextProps.currentSong};
	}

	componentDidUpdate(prev) {
		if (prev.currentSong !== this.state.song) {
			this.playSongById(this.state.song.songId);
		}
	}

	componentDidMount() {
		this.setState({
			volume: parseFloat(localStorage.getItem('joeyify-volume'))
		});
	}

	playSongById(id) {
		console.log('loading');
		const audio = this.audioRef.current;

		fetch(`http://localhost:8080/song/play?songId=${id}`)
		.then(result => result.json())
		.then(data => {
			let byteArray = JSON.parse(data.songData);
			
			const blob = new Blob([getByteArray(byteArray)], { type: 'audio/mpeg' });
			const url = URL.createObjectURL(blob);

			audio.src = url;
			audio.play();
			audio.volume = !(Number.isNaN(this.state.volume) || this.state.volume == null) ? this.state.volume / 100 : this.state.defaultVolume / 100;
			
			this.setState({
				songPlaying: true
			});
			console.log('loaded');

			this.sendMessage(JSON.stringify(websocketMessage(this.state.song)));
		});
	}

	updateTime() {
		const audio = this.audioRef.current;
		const currentTime = document.getElementById('currentTime');
		const progress = document.getElementById('song-progress');

		currentTime.innerHTML = formatTime(audio.currentTime);
		progress.value = Math.floor(audio.currentTime);
	}

	onPlayPause() {
		const audio = this.audioRef.current;
		if (this.state.songPlaying) {
			if (audio){
				audio.pause();
			}
			this.setState({
				songPlaying: false
			});
		} else {
			// if(audio) {
				
			// }
			audio.play();
			this.setState({
				songPlaying: true
			});
		}

	}

	onEnded() {
		console.log('ended');
	}
	
	changeProgress(e) {
		e.preventDefault();
		const audio = document.getElementById('audio-player');
		audio.currentTime = e.target.value;
	}

	changeVolume(e) {
		e.preventDefault();
		const newVolume = e.target.value;
		const audio = this.audioRef.current;


		audio.volume = newVolume / 100;
		this.setState({
			volume: newVolume
		});

		localStorage.setItem('joeyify-volume', newVolume);
	}

	sendMessage(msg) {
		this.sockJs.current.sendMessage('/app/history/ouchie', msg);
	}

	render() {
		let { song } = this.state;
		return(
		<footer>
			<SockJsClient
				url='http://localhost:8080/websocket'
				topics={['/topic/histories/ouchie']}
            	onMessage={(msg) => {}}
            	ref={this.sockJs}
			/>
			
			<div className="song">
				<div className="song-image">
					<img id="song-image" src="https://via.placeholder.com/105x105" alt="Song cover art"></img>
				</div>
				<div className="song-info">
					<div className="song-name" data-testid="song-name">{song.name}</div>
					<div className="song-artist-name" data-testid="artist-name">{song.artistName}</div>
				</div>
			</div>

			<div className="media-controls">
				<audio
				id="audio-player" 
				onTimeUpdate={this.updateTime}
				ref={this.audioRef}
				onEnded={this.onEnded}></audio>
				<div className="media-button">
					<button className="control-button" id="previous"><FontAwesomeIcon icon={faBackward} /></button>
					<button className="control-button" onClick={this.onPlayPause} id="play">
						{this.state.songPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
					</button>
					<button className="control-button" id="next"><FontAwesomeIcon icon={faForward} /></button>
				</div>
				<div className="media-time">
					<span id="currentTime">0:00</span>
					<input
					type="range"
					className="song-progress"
					min="0"
					max={this.state.song ? convertMinutesToSeconds(this.state.song.duration) : 0}
					id="song-progress"
					onChange={this.changeProgress} />
					<span data-testid="duration">{this.state.song ? song.duration : '0:00'}</span>
				</div>
			</div>

			<div className="extra-button">
				<button>
					<FontAwesomeIcon className={`heart ${song.liked ? 'heart-active' : '' }`} icon={faHeart} />
				</button>
				<div className="volume">
					<FontAwesomeIcon icon={faVolumeUp} />
					<input
					type="range"
					min="0"
					max="100"
					value={!(Number.isNaN(this.state.volume) || this.state.volume == null) ? this.state.volume : this.state.defaultVolume}
					name="volume"
					onChange={this.changeVolume}/>
				</div>
			</div>
		</footer>
	);
	}
}

export default Footer;
