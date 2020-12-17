import React, { Component } from 'react';
import './App.css';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import Playlist from '../playlist/Playlist';
import Home from '../home/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MpLibrary from '../mpLibrary/MpLibrary';
import History from '../history/History';


class App extends Component {
	constructor(props){
        super();
        this.state = {
			song: '',
        };
	}

	currentSong = (song) => {
		this.setState({song: song});
    }
	
  	render(){
		const currentLocation = window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/'));
		switch(currentLocation){
			case '/history':
				return(
					<div className="App">
						<div className="content">
							<Router>
									<Route path="/history/:id" component={(props) => <History {...props}/>} />
							</Router>
						</div>
					</div>
				);
			default:
				return (
					<div className="App">
						<Router>
							<div className="content">
								<Sidebar />
								<main>
									<Switch>
										<Route path="/" exact component={Home} />
										<Route path="/playlist/:id" component={(props) => <Playlist {...props} getCurrentSong={this.currentSong.bind(this)} />} />
										<Route path="/library" component={(props) => <MpLibrary {...props} getCurrentSong={this.currentSong.bind(this)} />} />
											
									</Switch>
		
								</main>
							</div>
						</Router>
						<Footer currentSong={this.state.song}/>
						<Router>
							<Route path="/history/:id" component={(props) => <History {...props}/>} />
						</Router>
					</div>
				);
		}
		
	}
}

export default App;
