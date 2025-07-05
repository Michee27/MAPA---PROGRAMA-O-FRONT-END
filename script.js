document.addEventListener('DOMContentLoaded', () => {

    // --- Efeito 1: Menu Hamburger para Navegação Responsiva ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
    }

    // --- Efeito 2 (Opção A): Efeito de Digitação na Homepage ---
    const typingElement = document.getElementById('typing-effect');
    if (typingElement) {
        const words = ["Desenvolvedor Web.", "Criador de Soluções.", "Entusiasta de UI/UX."];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            // Adiciona o cursor piscando
            if (!typingElement.querySelector('.cursor')) {
                 const cursorSpan = document.createElement('span');
                 cursorSpan.classList.add('cursor');
                 typingElement.appendChild(cursorSpan);
            }

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            const typeSpeed = isDeleting ? 100 : 200;
            setTimeout(type, typeSpeed);
        }
        type();
    }
    
    // --- Efeito 2 (Opção B): Modal para Detalhes do Projeto na Página de Portfólio ---
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    if (projectCards.length > 0 && modal) {
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const closeButton = document.querySelector('.close-button');

        projectCards.forEach(card => {
            card.querySelector('.btn-details').addEventListener('click', () => {
                modalTitle.textContent = card.dataset.title;
                modalDescription.textContent = card.dataset.description;
                modalImg.src = card.dataset.image;
                modalImg.alt = `Imagem do projeto ${card.dataset.title}`;
                modal.style.display = 'block';
            });
        });

        const closeModal = () => {
            modal.style.display = 'none';
        }

        closeButton.addEventListener('click', closeModal);
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }


    // --- Validação do Formulário de Contato ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = validateForm();
            if (isValid) {
                // Simula o envio bem-sucedido
                this.style.display = 'none';
                document.getElementById('form-success-message').style.display = 'block';
            }
        });

        function validateForm() {
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            // Validação do Nome
            if (name.value.trim() === '') {
                setErrorFor(name, 'O nome é obrigatório.');
                valid = false;
            } else {
                setSuccessFor(name);
            }

            // Validação do Email
            if (email.value.trim() === '') {
                setErrorFor(email, 'O email é obrigatório.');
                valid = false;
            } else if (!isEmail(email.value)) {
                setErrorFor(email, 'O email não é válido.');
                valid = false;
            } else {
                setSuccessFor(email);
            }

            // Validação da Mensagem
            if (message.value.trim() === '') {
                setErrorFor(message, 'A mensagem não pode estar em branco.');
                valid = false;
            } else {
                setSuccessFor(message);
            }

            return valid;
        }

        function setErrorFor(input, message) {
            const formGroup = input.parentElement;
            const errorMessage = formGroup.querySelector('.error-message');
            formGroup.classList.add('error');
            errorMessage.innerText = message;
        }

        function setSuccessFor(input) {
            const formGroup = input.parentElement;
            formGroup.classList.remove('error');
            const errorMessage = formGroup.querySelector('.error-message');
            errorMessage.innerText = '';
        }

        function isEmail(email) {
            // Regex simples para validação de email
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        }
    }
});

