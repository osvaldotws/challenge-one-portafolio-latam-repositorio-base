document.addEventListener('DOMContentLoaded', function() {
    // Selección de elementos del DOM
    const form = document.querySelector('.formcontato__form');
    const nameInput = document.querySelector('input[name="nombre"]');
    const emailInput = document.querySelector('input[name="email"]');
    const asuntoInput = document.querySelector('input[name="asunto"]');
    const mensajeTextarea = document.querySelector('textarea[name="mensaje"]');
    const menuToggle = document.querySelector('.menu__hamburguer');
    const menuList = document.querySelector('.menu__list');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const titleElement = document.querySelector('.title__bio');

    // Inicialización
    setupMenuFunctionality();
    setupFormValidation();
    setupSmoothScrolling();
    setupSkillsHobbiesAnimation();
    setupScrollToTopButton();
    setupDarkMode();
    setupTypingEffect();
    setupFadeInSections();
    addDynamicStyles();

    // Funcionalidad del menú
    function setupMenuFunctionality() {
        menuToggle.addEventListener('click', toggleMenu);
        document.addEventListener('click', closeMenuOutside);
    }

    function toggleMenu() {
        menuList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }

    function closeMenuOutside(event) {
        if (!menuList.contains(event.target) && !menuToggle.contains(event.target)) {
            menuList.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }

    // Validación del formulario
    function setupFormValidation() {
        form.addEventListener('submit', validateForm);
    }

    function validateForm(e) {
        e.preventDefault();
        let isValid = true;

        isValid = validateField(nameInput, 'El nombre debe tener al menos 2 caracteres', (value) => value.trim().length >= 2) && isValid;
        isValid = validateField(emailInput, 'Por favor, introduce un email válido', isValidEmail) && isValid;
        isValid = validateField(asuntoInput, 'El asunto debe tener al menos 4 caracteres', (value) => value.trim().length >= 4) && isValid;
        isValid = validateField(mensajeTextarea, 'El mensaje debe tener al menos 10 caracteres', (value) => value.trim().length >= 10) && isValid;

        if (isValid) {
            alert('Formulario enviado correctamente');
            form.reset();
        }
    }

    function validateField(input, errorMessage, validationFunction) {
        if (!validationFunction(input.value)) {
            showError(input, errorMessage);
            return false;
        } else {
            clearError(input);
            return true;
        }
    }

    function showError(input, message) {
        const formControl = input.parentElement;
        let errorMessage = formControl.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            formControl.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
        input.classList.add('error');
    }

    function clearError(input) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message');
        if (errorMessage) {
            formControl.removeChild(errorMessage);
        }
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Smooth scrolling
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // Animación de skills y hobbies
    function setupSkillsHobbiesAnimation() {
        const skillsHobbiesBoxes = document.querySelectorAll('.skills__box, .hobbies__box');
        window.addEventListener('scroll', () => checkBoxes(skillsHobbiesBoxes));
        checkBoxes(skillsHobbiesBoxes);
    }

    function checkBoxes(boxes) {
        const triggerBottom = window.innerHeight / 5 * 4;
        boxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            box.classList.toggle('show', boxTop < triggerBottom);
        });
    }

    // Botón de scroll to top
    function setupScrollToTopButton() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '&uarr;';
        scrollToTopBtn.className = 'scroll-to-top';
        document.body.appendChild(scrollToTopBtn);

        window.addEventListener('scroll', () => {
            scrollToTopBtn.classList.toggle('show', window.pageYOffset > 100);
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Modo oscuro
    function setupDarkMode() {
        darkModeToggle.addEventListener('click', toggleDarkMode);
        initializeDarkMode();
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        updateDarkModeIcon();
    }

    function updateDarkModeIcon() {
        const icon = darkModeToggle.querySelector('i');
        icon.className = document.body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
    }

    function initializeDarkMode() {
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
        updateDarkModeIcon();
    }

    // Efecto de escritura en el título
    function setupTypingEffect() {
        typeWriter(titleElement.textContent, titleElement);
    }

    function typeWriter(text, element, i = 0) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeWriter(text, element, i + 1), 50);
        }
    }

    // Efecto fade-in en secciones
    function setupFadeInSections() {
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => observer.observe(section));
    }

    // Agregar estilos dinámicamente
    function addDynamicStyles() {
        const styles = `
            .scroll-to-top {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: var(--azul-destaque);
                color: var(--cor-branco);
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 24px;
                cursor: pointer;
                display: none;
                transition: opacity 0.3s ease;
            }

            .scroll-to-top.show { display: block; }

            .dark-mode-toggle {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: var(--cor-branco);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 24px;
                cursor: pointer;
                z-index: 1000;
            }

            .dark-mode {
                --cor-de-fundo: #333;
                --cor-de-link: #fff;
                --cor-de-texto: #f0f0f0;
                --cor-branco: #444;
            }

            .dark-mode .menu,
            .dark-mode .footer { background-color: #222; }

            .skills__box, .hobbies__box {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }

            .skills__box.show, .hobbies__box.show {
                opacity: 1;
                transform: translateY(0);
            }

            section {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }

            section.fade-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
});