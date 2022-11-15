/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sections, header;
let isScrolling, isScrolling1;
let boolFrame = true;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// This function returns the nearest section of the viewport.
function sectionVisible() {
    let sectionVisible;
    let minView = Infinity;
    for(const section of sections) {
        const rect = section.getBoundingClientRect();
        if(Math.abs(rect.top) < minView - 200) {
            minView = Math.abs(rect.top);
            sectionVisible = section;
        }
    }
    return sectionVisible;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// The DOMContentLoaded event calls the main functions of the page and the scroll event has a timeout for page performance.
document.addEventListener('DOMContentLoaded', () => {
    sections = document.querySelectorAll('section');
    header = document.querySelector('.page__header');
    buildNavbar();
    toggleActiveClass();

    document.addEventListener('scroll', () => {
        header.style.display = 'block';
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            header.style.display = 'none';
        }, 4000);
        
        if(boolFrame) {
            toggleActiveClass();
            boolFrame = false;
            setTimeout(() => {
                boolFrame = true; 
            }, 300);
        } else {
            clearTimeout(isScrolling1);
            isScrolling1 = setTimeout(toggleActiveClass, 60);
        }
    });
});

// This function dynamically creates menus from sections of the page.
function buildNavbar() {
    const fragment = document.createDocumentFragment();
    const navbar = document.getElementById('navbar__list');
    sections.forEach(section => {
        const elementLi = document.createElement('li');
        const text = section.getAttribute('data-nav');
        const segment = section.getAttribute('id');
        elementLi.innerHTML = `<a class='menu__link' href='#${segment}'>${text}</a>`;
        fragment.appendChild(elementLi);
    });
    navbar.append(fragment);
    navbar.addEventListener('click', respondeToTheClick);
}

// This function add class 'active' to section and menu when near top of viewport
function toggleActiveClass() {
    const activeSection = sectionVisible();
    sections.forEach(section => {
        const elementA = document.querySelector(`[href='#${section.id}']`);
        if(section.id === activeSection.id) {
            section.classList.add('active');
            elementA.classList.add('active');
            elementA.classList.remove('mobile');
        } else {
            section.classList.remove('active');
            elementA.classList.remove('active');
            elementA.classList.add('mobile');
        }
    });
}
/*
function toggleActiveClass() {
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(entry => {
                let elementA = document.querySelector(`[href='#${entry.target.id}']`);
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    elementA.classList.add('active');
                    elementA.classList.remove('mobile');
                } else {
                    entry.target.classList.remove('active');
                    elementA.classList.remove('active');
                    elementA.classList.add('mobile');
                }
            });
        }, {threshold: 0.3}
    );
    sections.forEach(section => {
        observer.observe(section);
    });
}
*/
/**
 * End Main Functions
 * Begin Events
 * 
*/
// This function response to click events on the navigation bar and uses scrollIntoView to scroll to the page section.
function respondeToTheClick(e) {
    e.preventDefault();
    if(e.target.nodeName === 'A') {
        document.querySelector(`[data-nav='${e.target.text}']`).scrollIntoView({behavior: 'smooth'});
    }
}