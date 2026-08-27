document.addEventListener('DOMContentLoaded', () => {

    const typewriterElement = document.getElementById('typewriter-text');
    const typewriterText = "Gabriel Migoto Amaral";
    let i = 0;

    function typeWriter() {
        if (i < typewriterText.length) {
            typewriterElement.innerHTML += typewriterText.charAt(i);
            i++;
            setTimeout(typeWriter, 120); 
        } else {
            const h1 = typewriterElement.closest('h1');
            if(h1) h1.style.borderRight = 'none';
        }
    }
    typeWriter();

    const fadeElements = document.querySelectorAll('.fade-in');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => scrollObserver.observe(el));

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar nav a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    });

    sections.forEach(section => navObserver.observe(section));

    const copyBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');

    if (copyBtn && emailText) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailText.innerText).then(() => {
                
                const originalIcon = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                copyBtn.style.background = '#4CAF50';

                setTimeout(() => {
                    copyBtn.innerHTML = originalIcon;
                    copyBtn.style.background = 'var(--cor-primaria-gradiente)';
                }, 2000);

            }).catch(err => {
                console.error('Falha ao copiar: ', err);
                copyBtn.innerText = 'Erro!';
            });
        });
    }

});