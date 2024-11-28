async function fetch_json_project_items() {
	const request = new Request('json/project_items.json');
	const response = await fetch(request);
  	const projects = await response.json();
	return projects
}

function navbar_during_scroll() {
	const navbar = document.getElementById('navbar');

	// at top of the page 
	if (window.scrollY === 0) { navbar.classList.remove('navbar-shrinked'); } 
	else { navbar.classList.add('navbar-shrinked'); }
}

async function toggle_hamburger(hamburger_show, hamburger_hide) {

	//console.log(document.getElementById(''+hamburger_show+''));
	const show = document.getElementById(''+hamburger_show+'');
	show.classList.remove('hide');

	const hide = document.getElementById(''+hamburger_hide+'');
	hide.classList.add('hide');
}

window.addEventListener('scroll', () => {
	navbar_during_scroll();
  });