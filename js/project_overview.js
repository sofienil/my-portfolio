let slide_index = 1;

function change_slide(n) { show_slide(slide_index += n); }
function set_current_slide(n) { show_slide(slide_index = n); }

function show_slide(n) {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");
  
    if (n > slides.length) { slide_index = 1; }; // if end of showcase, go to first img
    if (n < 1) { slide_index = slides.length; } // if beginning of showcase, go to last img
  
    slides.forEach(slide => slide.classList.remove("show")); // hide all imgs
    dots.forEach(dot => dot.classList.remove("active")); // remove active class from dots
  
    slides[slide_index - 1].classList.add("show"); // show current slide
    dots[slide_index - 1].classList.add("active"); // highlight current dot
}

async function show_info() {
    const fetched_projects = await fetch_json_project_items();

    let params = new URLSearchParams(document.location.search);
    let index = params.get("index");
    const project = fetched_projects.projectItem[index];

    const image_container = document.getElementById("image-container");
    const dots_container = document.getElementById("dots-container");
    project.img_path.forEach((img_path, img_index) => {
        const image_item = document.createElement("div");
        image_item.className = "slide fade";
        const show_image_url = window.location.href.split('?')[0] + "/../"+img_path;
        image_item.innerHTML = `
        <a href="${show_image_url}">
            <img src="${img_path}" alt="${project.img_alt[img_index]}">
        </a>
        `;

        const dot_span = document.createElement("span");
        dot_span.className = "dot";
        const img_slide_index = img_index+1;
        dot_span.setAttribute('onclick', 'set_current_slide('+img_slide_index+')')

        image_container.appendChild(image_item);
        dots_container.appendChild(dot_span);
    });

    const project_overview_text = document.getElementById("project-overview-text");

    const categories_list = document.createElement("div");
	categories_list.className = "project-categories";

    project.tags.forEach((tag) => {
        const li = document.createElement("li");
        li.textContent = tag; 
        categories_list.appendChild(li);
    });

    const link_list = document.createElement("div");
	link_list.className = "links";

    project.links.forEach((link, index) => {
        const a_element = document.createElement("a");
        a_element.href = link; 
        a_element.textContent = project.link_text[index];
        link_list.appendChild(a_element);
    });

    project_overview_text.innerHTML = `
		<div>${project.date}</div>
        <div class="project-title">${project.title}</div>
        <div>${project.description}</div>
	`;

    project_overview_text.appendChild(categories_list);
    project_overview_text.appendChild(link_list);

    show_slide(slide_index);
}

document.addEventListener("DOMContentLoaded", () => {
    show_info();    
});
