const current_url = window.location.href.split('#')[0] // fixed issue when anchor # is in the way

function generate_popup(popup_container, project_img_path, project_img_alt, project_title, project_description) {
	const popup = document.createElement("div");
	popup.className = "empty-div";
	popup.id = "showed-popup";
	popup.innerHTML = `
		<div class="popup-background" onclick="close_popup()"></div>
		<div class="project-popup-content">
		<span class="close-btn" id="closePopup" onclick="close_popup()">✖</span>
		<img src = "${project_img_path}" alt="${project_img_alt}"/>
		
		<div class="project-popup-text">
			<h2>${project_title}</h2>
			<p>${project_description}</p>
		</div>   
		</div> 
	`;

	popup_container.appendChild(popup);
}

function show_popup(project_img_path, project_img_alt, project_title, project_description) {
	const popup_container = document.getElementById("project-popup");
	generate_popup(popup_container, project_img_path, project_img_alt, project_title, project_description)
	popup_container.style.opacity = 1;
	popup_container.style.display = "block";
}

function close_popup() {
	const popup = document.getElementById("project-popup");
	popup.style.opacity = 0
	popup.style.display = "none";

	const showed_popup = document.getElementById("showed-popup");
	showed_popup.remove();
}

function go_to_project_overview(link) {
	window.location.href = current_url + link;	
}

function show_project_showcase() {
	const filter_items = document.querySelectorAll('.filter-item');
	const portfolio_items = document.querySelectorAll('.project-item');
   
	filter_items.forEach((filter) => { 
	  filter.addEventListener('click', () => { // add click listener for each item
		filter_items.forEach((item) => item.classList.remove('filter-active')); // remove active class from all filter items
		filter.classList.add('filter-active'); 
  
		const current_filter = filter.getAttribute('data-filter'); 
		
		portfolio_items.forEach((item) => {
		  const item_category = item.getAttribute('data-category');
		  
		  if (current_filter === 'all' || current_filter === item_category) { item.classList.add('show'); } 
		  else { item.classList.remove('show'); } // hide non-matching items
		});
	  });
	});
}

async function generate_projects() {
	const project_container = document.getElementById("project-list");
	const projects = await fetch_json_project_items();

	projects.projectItem.forEach((project, index) => {
		const project_item = document.createElement("div");
		project_item.className = "project-item show";
		const link = "/../project_overview.html?index="+index;
	
		project_item.setAttribute('onclick', 'go_to_project_overview(\'' + link +'\')');
		project_item.setAttribute('data-category', ''+ project.filter +'');
	
		// tags
		const categories_list = document.createElement("div");
		categories_list.className = "project-categories";
		project.tags.forEach((tag) => {
			const li = document.createElement("li");
			li.textContent = tag; 
			categories_list.appendChild(li);
		});
	
		// project item
		project_item.innerHTML = ` 
			<div class="project-date">${project.date}</div>
			  <div class="project-showcase">
				<div class="project-title">
				  ${project.title}
				  <img class="link-icon" src="imgs/link.svg" alt="link">
				</div>
				<div>${project.preview_text}</div>
				
			  </div> 
		`;
	
		const showcase = project_item.querySelector('.project-showcase');
		showcase.appendChild(categories_list);
		
		project_container.appendChild(project_item);
	});
	show_project_showcase()
}

window.addEventListener('DOMContentLoaded', () => {
	generate_projects();
});
