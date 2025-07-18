// 🟦 1. Scroll suave entre secciones
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 🟦 2. Animación al hacer scroll (clase .animar)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 }); // Ajusta el threshold para cuándo se activa la animación
document.querySelectorAll('.animar').forEach(el => observer.observe(el));

// 🟦 3. Validación básica del formulario de contacto
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && !emailInput.value.includes('@')) {
            e.preventDefault();
            // Reemplazado alert() por console.error y un mensaje en el DOM
            console.error('Error de validación: Por favor, ingresa un correo electrónico válido.');
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.textContent = 'Por favor, ingresa un correo electrónico válido.';
            errorMessageDiv.style.color = 'red';
            errorMessageDiv.style.marginTop = '10px';
            errorMessageDiv.style.textAlign = 'center';
            form.insertBefore(errorMessageDiv, form.querySelector('button[type="submit"]'));
            
            // Eliminar el mensaje después de unos segundos
            setTimeout(() => {
                errorMessageDiv.remove();
            }, 3000);
        }
    });
});

// 🟦 4. Botón flotante que lleva a la sección de contacto
const ctaFijo = document.createElement('div');
ctaFijo.id = 'cta-fijo';
ctaFijo.textContent = '📩 Hablemos';
ctaFijo.onclick = () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }); // Corregido a #contact
};
document.body.appendChild(ctaFijo);

// 🟦 5. Contadores animados (usa data-target en el HTML)
function iniciarContadores() {
    const counters = document.querySelectorAll('[data-contador]');
    counters.forEach(counter => {
        const endValue = parseInt(counter.getAttribute('data-contador'), 10);
        let current = 0;
        const step = Math.ceil(endValue / 100);
        const interval = setInterval(() => {
            current += step;
            if (current >= endValue) {
                counter.textContent = endValue;
                clearInterval(interval);
            } else {
                counter.textContent = current;
            }
        }, 20);
    });
}

// Activar contadores cuando entren en vista
const contadorObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            iniciarContadores();
            contadorObserver.unobserve(entry.target); // Detener la observación después de activar
        }
    });
}, { threshold: 0.5 }); // Se activa cuando el 50% del elemento es visible
document.querySelectorAll('[data-contador]').forEach(el => contadorObserver.observe(el));