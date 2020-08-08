const app = function(){
    // Navigation Menu Slide Animation
    const navbar = document.getElementById('navbar');

    function navToggler(){
        if(window.scrollY > 50){
            navbar.classList.remove('nav-slide-up');
            navbar.classList.add('nav-slide-down');
        }else{
            navbar.classList.add('nav-slide-up');
            navbar.classList.remove('nav-slide-down');
        }
    }

    window.addEventListener('load', navToggler);
    window.addEventListener('resize', navToggler);
    window.addEventListener('scroll', navToggler);

    // Mobile Menu Toggler
    const menuBar = document.getElementById('menu-bar');
    const navList = document.getElementById('nav-menu');

    let hidden = true;

    function menuToggler(e){
        e.preventDefault();

        hidden = !hidden;

        hidden === false ? navList.classList.remove('hide-mobile') : navList.classList.add('hide-mobile');
    }

    menuBar.addEventListener('click', menuToggler);

    // Close Mobile Menu When a Link is Clicked
    const navLinks = navList.querySelectorAll('#navbar ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(){
            navList.classList.add('hide-mobile');
            hidden = !hidden;
        })
    })

    // Smooth Scroll Effect
    $('#navbar ul li a, #site-header .btn').on('click', function(event) {
        if (this.hash !== '') {
          event.preventDefault();
    
          const hash = this.hash;
    
          $('html, body').animate(
            {
              scrollTop: $(hash).offset().top - 80
            },
            800
          );
        }
      });

    // Open Social Profiles in External Links
    const socialProfiles = document.querySelectorAll('*[data-link]');
    socialProfiles.forEach(link => {
        link.addEventListener('click', () => {
            const URL = link.getAttribute('data-link');
            window.open(URL, '_blank');
        })
    })

    // Store all the sections inside an array
    const elements = [];

    const header = document.querySelector('header');
    elements.push(header);

    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
        elements.push(section);
    })

    window.addEventListener('scroll', checkViewport)
    window.addEventListener('load', checkViewport)

    function checkViewport(){
        isInViewport(elements);
    }

    function isInViewport(elements){
        elements.forEach(element => {
            let position = element.getBoundingClientRect();

            position.top < window.innerHeight - (window.innerHeight / 3) && position.bottom >= 0 ? changeNavLinks(element) : null;
        })
    }

    function changeNavLinks(element){
        const navbar = document.querySelector('#navbar');
        const navLinks = navbar.querySelectorAll('ul li a');
        const activeLink = navbar.querySelector('a.active');
        activeLink.classList.remove('active');

        navLinks.forEach(link => {
            const target = link.getAttribute('href');
            const targetID = `#${element.id}`

            if(target === targetID){
                link.classList.add('active');
            }
        })
    }
}();