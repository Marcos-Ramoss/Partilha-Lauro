// ============================================
// Navigation Scroll Effect
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// ============================================
// Phone Number Formatting
// ============================================
function formatPhoneNumber(value) {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format: (92) 99999-9999
    if (phoneNumber.length <= 2) {
        return phoneNumber.length > 0 ? `(${phoneNumber}` : '';
    } else if (phoneNumber.length <= 7) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    } else {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    }
}

// Apply phone formatting on input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('telefone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const formatted = formatPhoneNumber(e.target.value);
            e.target.value = formatted;
        });
        
        phoneInput.addEventListener('blur', function(e) {
            const phoneNumber = e.target.value.replace(/\D/g, '');
            if (phoneNumber.length < 10) {
                e.target.classList.add('is-invalid');
                const feedback = e.target.nextElementSibling;
                if (feedback) {
                    feedback.textContent = 'Por favor, insira um telefone válido com DDD';
                }
            } else {
                e.target.classList.remove('is-invalid');
            }
        });
    }
});

// ============================================
// Form Validation
// ============================================
function validateForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    let isValid = true;
    
    // Validate name
    const nome = formData.get('nome');
    const nomeInput = document.getElementById('nome');
    if (!nome || nome.trim().length < 3) {
        nomeInput.classList.add('is-invalid');
        const feedback = nomeInput.nextElementSibling;
        if (feedback) {
            feedback.textContent = 'Por favor, insira seu nome completo (mínimo 3 caracteres)';
        }
        isValid = false;
    } else {
        nomeInput.classList.remove('is-invalid');
    }
    
    // Validate phone
    const telefone = formData.get('telefone');
    const telefoneInput = document.getElementById('telefone');
    const phoneNumber = telefone ? telefone.replace(/\D/g, '') : '';
    if (!telefone || phoneNumber.length < 10) {
        telefoneInput.classList.add('is-invalid');
        const feedback = telefoneInput.nextElementSibling;
        if (feedback) {
            feedback.textContent = 'Por favor, insira um telefone válido com DDD';
        }
        isValid = false;
    } else {
        telefoneInput.classList.remove('is-invalid');
    }
    
    // Validate email
    const email = formData.get('email');
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        emailInput.classList.add('is-invalid');
        const feedback = emailInput.nextElementSibling;
        if (feedback) {
            feedback.textContent = 'Por favor, insira um e-mail válido';
        }
        isValid = false;
    } else {
        emailInput.classList.remove('is-invalid');
    }
    
    // Validate message
    const mensagem = formData.get('mensagem');
    const mensagemInput = document.getElementById('mensagem');
    if (!mensagem || mensagem.trim().length < 10) {
        mensagemInput.classList.add('is-invalid');
        const feedback = mensagemInput.nextElementSibling;
        if (feedback) {
            feedback.textContent = 'Por favor, insira uma mensagem (mínimo 10 caracteres)';
        }
        isValid = false;
    } else {
        mensagemInput.classList.remove('is-invalid');
    }
    
    return isValid;
}

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('is-invalid');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') && this.value.trim() !== '') {
                this.classList.remove('is-invalid');
            }
        });
    });
});

// ============================================
// EmailJS Initialization
// ============================================
// Inicializar EmailJS quando a página carregar
window.addEventListener('load', function() {
    if (typeof emailjs !== 'undefined') {
        // Substitua 'YOUR_PUBLIC_KEY' pela sua Public Key do EmailJS
        // Você pode obter em: https://dashboard.emailjs.com/admin/integration
        emailjs.init('YOUR_PUBLIC_KEY');
    }
});

// ============================================
// Form Submission
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.btn-submit');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    const formMessage = document.getElementById('formMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            formMessage.className = 'alert alert-danger mt-3';
            formMessage.textContent = 'Por favor, corrija os erros no formulário antes de enviar.';
            formMessage.classList.remove('d-none');
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const nome = formData.get('nome');
        const telefone = formData.get('telefone');
        const email = formData.get('email');
        const mensagem = formData.get('mensagem');
        
        // Show loading state
        submitButton.disabled = true;
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        formMessage.classList.add('d-none');
        
        // Verificar se EmailJS está carregado
        if (typeof emailjs === 'undefined') {
            formMessage.className = 'alert alert-danger mt-3';
            formMessage.textContent = 'Erro: EmailJS não foi carregado. Por favor, recarregue a página.';
            formMessage.classList.remove('d-none');
            submitButton.disabled = false;
            btnText.classList.remove('d-none');
            btnLoading.classList.add('d-none');
            return;
        }
        
        // Parâmetros para o EmailJS
        // Substitua 'YOUR_SERVICE_ID' e 'YOUR_TEMPLATE_ID' pelos seus IDs do EmailJS
        const templateParams = {
            from_name: nome,
            from_email: email,
            phone: telefone,
            message: mensagem,
            to_email: 'pohsnerlauro@gmail.com'
        };
        
        // Enviar email via EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                // Sucesso
                formMessage.className = 'alert alert-success mt-3';
                formMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i>Mensagem enviada com sucesso! Entraremos em contato em breve.';
                formMessage.classList.remove('d-none');
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Reset form
                form.reset();
                
                // Reset button state
                submitButton.disabled = false;
                btnText.classList.remove('d-none');
                btnLoading.classList.add('d-none');
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('d-none');
                }, 5000);
            }, function(error) {
                // Erro
                console.error('Erro ao enviar email:', error);
                formMessage.className = 'alert alert-danger mt-3';
                formMessage.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.';
                formMessage.classList.remove('d-none');
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Reset button state
                submitButton.disabled = false;
                btnText.classList.remove('d-none');
                btnLoading.classList.add('d-none');
            });
    });
});

// ============================================
// Smooth Scroll for Hero CTA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const heroCTA = document.querySelector('.hero-buttons a[href="#contato"]');
    
    if (heroCTA) {
        heroCTA.addEventListener('click', function(e) {
            e.preventDefault();
            const contatoSection = document.getElementById('contato');
            if (contatoSection) {
                const offsetTop = contatoSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// ============================================
// Scroll to Top on Load (Optional)
// ============================================
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});
