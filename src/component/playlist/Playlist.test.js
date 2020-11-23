import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Playlist from './Playlist';

afterEach(cleanup);

test('Renders song data', () => {
	const playlistId = 1;

	const { getByTestId } = render(<Playlist match={{params: {id: playlistId}}} />);
	const playlist = getByTestId('playlistId');

	expect(playlist).toHaveTextContent(playlistId);
});
