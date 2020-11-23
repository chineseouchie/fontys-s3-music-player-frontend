import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('Render app', () => {
	const { getByText } = render(<App />);
	const linkElement = getByText('Music Player');
	expect(linkElement).toBeInTheDocument();
});
