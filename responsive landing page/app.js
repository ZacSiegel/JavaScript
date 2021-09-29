window.addEventListener('scroll', () => {
    const navbar = document.querySelector('#mainNavbar');
    navbar.classList.toggle('sticky', window.scrollY > 0);
});