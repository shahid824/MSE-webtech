window.addEventListener('DOMContentLoaded', loadXML);

function loadXML() {
	const eventList = document.getElementById('eventList');
	if (!eventList) return;
	eventList.innerHTML = '<p style="text-align:center">Loading events...</p>';

	fetch('events.xml')
		.then(response => {
			if (!response.ok) throw new Error('Network error: ' + response.status);
			return response.text();
		})
		.then(text => (new DOMParser()).parseFromString(text, 'application/xml'))
		.then(xml => {

			if (xml.getElementsByTagName('parsererror').length) throw new Error('Failed to parse XML');
			showEvents(xml);
		})
		.catch(err => {
			eventList.innerHTML = '<p style="text-align:center;color:red">Could not load events: ' + err.message + '</p>';
			console.error(err);
		});
}

function showEvents(xml) {
	const events = xml.getElementsByTagName('event');
	let output = '';

	for (let i = 0; i < events.length; i++) {
		const nameEl = events[i].getElementsByTagName('name')[0];
		const categoryEl = events[i].getElementsByTagName('category')[0];
		const dateEl = events[i].getElementsByTagName('date')[0];
		const timeEl = events[i].getElementsByTagName('time')[0];
		const venueEl = events[i].getElementsByTagName('venue')[0];
		const descEl = events[i].getElementsByTagName('description')[0];

		const name = nameEl ? nameEl.textContent : 'Unnamed Event';
		const category = categoryEl ? categoryEl.textContent : 'Uncategorized';
		const date = dateEl ? dateEl.textContent : '';
		const time = timeEl ? timeEl.textContent : '';
		const venue = venueEl ? venueEl.textContent : '';
		const desc = descEl ? descEl.textContent : '';

		const safeCategory = category.replace(/"/g, '&quot;');

		output += '<div class="event-card" data-category="' + safeCategory + '">';
		output += '<h3>' + name + '</h3>';
		output += '<p><strong>Category:</strong> ' + category + '</p>';
		output += '<p><strong>Date:</strong> ' + date + '</p>';
		output += '<p><strong>Time:</strong> ' + time + '</p>';
		output += '<p><strong>Venue:</strong> ' + venue + '</p>';
		output += '<p><strong>About:</strong> ' + desc + '</p>';
		output += '</div>';
	}

	document.getElementById('eventList').innerHTML = output || '<p style="text-align:center">No events found.</p>';
}

function filterEvents(category) {
	const cards = document.getElementsByClassName('event-card');

	for (let i = 0; i < cards.length; i++) {
		if (category === 'all') {
			cards[i].style.display = 'block';
		} else {
			const cardCategory = (cards[i].dataset.category || '').toLowerCase();
			if (cardCategory.indexOf(category.toLowerCase()) > -1) {
				cards[i].style.display = 'block';
			} else {
				cards[i].style.display = 'none';
			}
		}
	}
}