import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Footer from './Footer';
import {configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});

// describe('test enzyme', () => {
// 	test('should toggle the play state', () => {
// 		const songData = {
// 			accountId: 18,
// 			artistName: "Akie??",
// 			dateAdded: "26-10-2020",
// 			duration: "4:32",
// 			name: "Ama no Zaku",
// 			songId: 25,
// 		}
// 		const wrapper = mount(<Footer currentSong={songData}/>);

// 		wrapper.find('#play').simulate('click');
		
// 		// expect(wrapper.find('.song-name').text()).toContain(songData.name)
// 		// expect(wrapper.state('songPlaying')).to.equal(true);
// 	})
	
// })

afterEach(cleanup)

test('Renders song data', () => {
	const songData = {
		accountId: 18,
		artistName: "Akie??",
		dateAdded: "26-10-2020",
		duration: "4:32",
		name: "Ama no Zaku",
		songId: 25,
	}

	const { getByTestId } = render(<Footer currentSong={songData}/>);
	const songName = getByTestId("song-name");
	const artistName = getByTestId("artist-name");

	expect(songName).toHaveTextContent(songData.name);
	expect(artistName).toHaveTextContent(songData.artistName);
});

