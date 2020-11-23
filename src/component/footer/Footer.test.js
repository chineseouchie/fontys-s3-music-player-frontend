import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Footer from './Footer';
import {configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
afterEach(cleanup);

beforeAll(() => {
	window.HTMLMediaElement.prototype.load = () => {};
	window.HTMLMediaElement.prototype.play = () => {};
	window.HTMLMediaElement.prototype.pause = () => {};
	window.HTMLMediaElement.prototype.addTextTrack = () => {};
});

const songData = {
	accountId: 18,
	artistName: 'artistName',
	dateAdded: '26-10-2020',
	duration: '4:32',
	name: 'songName',
	songId: 25,
};

describe('Load and show song correctly', () => {
	test('Renders song data', () => {

		const { getByTestId } = render(<Footer currentSong={songData}/>);
		const songName = getByTestId('song-name');
		const artistName = getByTestId('artist-name');
	
		expect(songName).toHaveTextContent(songData.name);
		expect(artistName).toHaveTextContent(songData.artistName);
	});

		
	test('Should update state with new song', () => {
		const wrapper = mount(<Footer currentSong={songData}/>);
		expect(wrapper.state().song).toEqual(songData);
	});
	
});

describe('Play music on click', () => {
	const wrapper = mount(<Footer currentSong={songData}/>);
	
	
	test('should toggle the play state', () => {
		wrapper.find('#play').simulate('click');
		expect(wrapper.state().songPlaying).toEqual(true);

		wrapper.find('#play').simulate('click');
		expect(wrapper.state().songPlaying).toEqual(false);
	});

});

