export function dateNow() {
	let date = new Date();
	let month = date.getMonth().toString();
	let day = date.getDay().toString();
	let years = date.getFullYear().toString();
	let hours = date.getHours().toString();
	let minutes = date.getMinutes().toString();

	let handledDate = {
		month: month.length == 1 ? `0${month}` : month,
		day: day.length == 1 ? `0${day}` : day,
		years,
		hours: hours.length == 1 ? `0${hours}` : hours,
		minutes: minutes.length == 1 ? `${minutes}0` : minutes,
	};

	return `${handledDate.day}/${handledDate.month}/${handledDate.years}, ${handledDate.hours}:${handledDate.minutes}`;
}
