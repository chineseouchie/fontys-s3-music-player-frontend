import React, { Component } from 'react';
import SockJsClient from 'react-stomp';

import {formatIsoDateToTime} from '../util/util';
class History extends Component {
	constructor(props) {
		super();

		this.state = {
			websocketId: props.match.params.id,
			history: []
		};
	}

	static getDerivedStateFromProps(nextProps){
		return {websocketId: nextProps.match.params.id};
	}

	onMessage(data) {
		let history = this.state.history;
		history.push(data);

		this.setState({
			history: history
		});
	}

	render() {
		console.log(this.state.history);
		return <div>
			<SockJsClient
				url='http://localhost:8080/websocket'
				topics={[`/topic/histories/${this.state.websocketId}`]}
            	onMessage={(msg) => this.onMessage(msg)}
            	ref={this.sockJs}
			/>
			History of: {this.state.websocketId}
			<div>
				{this.state.history.map((item, index) =>
					<div key={index}>{formatIsoDateToTime(item.date)} {item.artistName} - {item.name}</div>	
				)}
			</div>
		</div>;
	}
}

export default History;
