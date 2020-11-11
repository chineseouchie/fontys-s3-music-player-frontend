import * as util from './util';

test('convert formatted minutes to seconds', () => {
	const seconds = util.convertMinutesToSeconds("1:20");

	expect(seconds).toBe(80);
})

test('Convert seconds to formatted time', () => {
	const time = util.formatTime("120");

	expect(time).toBe("2:00");
})

test('Format iso date to time ', () => {
	const isoTime = '2020-11-11T09:21:24.811Z';
	const time = util.formatIsoDateToTime(isoTime);

	expect(time).toBe("10:21 AM");
})

test('format iso date to day month year ', () => {
	const isoTime = '2020-10-26 13:59:01.321';
	const time = util.formatIsoDateToDMY(isoTime);

	expect(time).toBe("26-10-2020");
})

test('format websocket data', () => {
	const songData = {
		accountId: 18,
		artistName: "artistName",
		dateAdded: "26-10-2020",
		duration: "4:32",
		name: "songName",
		songId: 25,
	}
	
	const result = util.websocketMessage(songData);
	const expectedResult = {
		artistName: "artistName",
		date: new Date(),
		name: "songName"
	}

	expect(result).toStrictEqual(expectedResult);
})
