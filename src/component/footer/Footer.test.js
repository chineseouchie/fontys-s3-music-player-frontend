import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Footer from './Footer';

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
