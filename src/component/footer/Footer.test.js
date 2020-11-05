import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Footer from './Footer';

afterEach(cleanup)

test('Renders song data', () => {
	const songData = {
		songName: "Blueming",
		artist: "IU",
	}

	const { getByTestId } = render(<Footer valueFromParent={songData} />);
	const songName = getByTestId("song-name");
	const artistName = getByTestId("artist-name");

	expect(songName).toHaveTextContent(songData.songName);
	expect(artistName).toHaveTextContent(songData.artist);
});
