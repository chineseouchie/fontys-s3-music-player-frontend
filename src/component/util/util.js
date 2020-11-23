export function convertMinutesToSeconds(input) {
	let parts = input.split(':'),
		minutes = + parts[0],
		seconds = + parts[1];
	return (minutes * 60 + seconds);
}

export function formatTime(seconds) {
	let minutes = Math.floor(seconds / 60);
	minutes = (minutes >= 10) ? minutes : minutes;
	seconds = Math.floor(seconds % 60);
	seconds = (seconds >= 10) ? seconds : '0' + seconds;
	return minutes + ':' + seconds;
}

export function getByteArray(data) {
	return new Uint8Array(data);
}

export function websocketMessage(data) {
	let result = {artistName: data.artistName, name: data.name, date: new Date()};

	return result;
}

export function formatUnixToDMY(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}

export function formatIsoDateToTime(date) {
	let d = new Date(date);

	return d.toLocaleTimeString('nl-NL', {hour: '2-digit', minute: '2-digit'});
}
