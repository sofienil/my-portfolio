function intro_overflow_anim(duration) { 
  document.body.style.overflow = "hidden";
  
  setTimeout(() => {
    document.body.style.overflow = "auto";  
  }, duration);
}

function project_item_anim() {
  const project_items = document.querySelectorAll('.project-item');
  project_items.forEach((item, index) => {
    
    setTimeout(() => {
      item.style.opacity = 1;
      item.style.transform = "translateY(0)";

    }, index * 200);
  });
}

function scroll_anim() {
  const about = document.getElementById('about-me');

  const contacts = document.getElementById('contacts');
  const projects = document.getElementById('project-header');

  const nav_item_about = document.getElementById('nav-about');
  const nav_item_projects = document.getElementById('nav-projects');

  const mobile_nav_item_home = document.getElementById('mobile-nav-home');
  const mobile_nav_item_about = document.getElementById('mobile-nav-about');
  const mobile_nav_item_projects = document.getElementById('mobile-nav-projects');

  if (window.scrollY === 0) { // at top of the page 
    nav_item_about.classList.remove('active-nav');
    nav_item_projects.classList.remove('active-nav');

    mobile_nav_item_home.classList.add('active-nav');
    mobile_nav_item_about.classList.remove('active-nav');
    mobile_nav_item_projects.classList.remove('active-nav');
  } 

  const viewport = window.innerHeight;
  
  if (about.getBoundingClientRect().top <= viewport && 0 <= about.getBoundingClientRect().bottom) { // at about section
    nav_item_about.classList.add('active-nav');
    nav_item_projects.classList.remove('active-nav');
    
    mobile_nav_item_home.classList.remove('active-nav');
    mobile_nav_item_about.classList.add('active-nav');
    mobile_nav_item_projects.classList.remove('active-nav');
    

    if (about.style.opacity == 0 ) {
      about.style.opacity = 1;
      about.style.transform = "translateY(0)";
      contacts.style.opacity = 1;
      contacts.style.transform = "translateY(0)";
    }    
  }

  if (projects.getBoundingClientRect().top <= viewport && 0 <= projects.getBoundingClientRect().bottom) { // at project section
    nav_item_about.classList.remove('active-nav');
    nav_item_projects.classList.add('active-nav');

    mobile_nav_item_home.classList.remove('active-nav');
    mobile_nav_item_about.classList.remove('active-nav');
    mobile_nav_item_projects.classList.add('active-nav');
   

    if (projects.style.opacity == 0) {
      projects.style.opacity = 1;
      projects.style.transform = "translateY(0)";
      project_item_anim();
    }    
  } 
}

window.addEventListener('DOMContentLoaded', () => {
  history.scrollRestoration = 'manual';
  window.scrollTo(0, 0); // go back to top so viewer can see animation properly

  intro_overflow_anim(1000)
});

window.addEventListener('scroll', () => {
  scroll_anim()
});