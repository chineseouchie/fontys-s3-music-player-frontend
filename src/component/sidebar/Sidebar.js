import React, { Component } from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';

import { faHeart, faHome, faList, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Sidebar extends Component {
	componentDidMount() {
		// GET ALL PLAYLIST
	}
	
	render() {
		let playlist = [
			{id: 1, name: 'kpop'},
			{id: 2, name: 'test'},
		];

		return <div className="sidebar">
			<div className="logo flex-center">
				Music Player
			</div>

			<div>
				<div className="nav-item v-center">
					<FontAwesomeIcon className="sidebar-icon" icon={faHome} />
					<Link className="sidebar-link" to="/"> Home</Link>
				</div>
				<div className="nav-item v-center">
					<FontAwesomeIcon className="sidebar-icon" icon={faList} />
					<Link className="sidebar-link" to="/library"> Library</Link>
				</div>
			</div>

				<div className="sidebar-content">
					<div>
						Playlists
					</div>
					<div className="playlist-item v-center">
						<FontAwesomeIcon className="sidebar-icon" icon={faPlusSquare} />
						Create
					</div>
					<div className="playlist-item v-center">
						<FontAwesomeIcon className="sidebar-icon" icon={faHeart} />
						Liked
					</div>

					<div className="playlists">
						{ playlist.map(item =>
							<Link className="sidebar-link" to={`/playlist/${item.id}`} key={item.id}><div className="playlist-item v-center" >{item.name}</div></Link>
						) }
					</div>
				</div>
				
		</div>;
	}
}

export default Sidebar;
