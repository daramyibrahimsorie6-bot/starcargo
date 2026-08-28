
    (function() {
            'use strict';

        // ─── Config ───
        const WHATSAPP_NUMBER = '8613060619929';
        const WHATSAPP_URL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=';

        // ─── Hero Background Rotator ───
        const heroImages = [
        'https://images.unsplash.com/photo-1613690399151-65ea69478674?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80',
         'https://images.unsplash.com/photo-1619941400844-ec5ef7495cb8?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ];

        let currentIndex = 0;
        const img1 = document.getElementById('heroImg1');
        const img2 = document.getElementById('heroImg2');
        let isImg1Active = true;

        function rotateHero() {
            const nextIndex = (currentIndex + 1) % heroImages.length;
        const activeImg = isImg1Active ? img1 : img2;
        const inactiveImg = isImg1Active ? img2 : img1;

        inactiveImg.src = heroImages[nextIndex];
        activeImg.classList.remove('active');
        inactiveImg.classList.add('active');

        isImg1Active = !isImg1Active;
        currentIndex = nextIndex;
        }

        let rotatorInterval = setInterval(rotateHero, 7000);

        // ─── Lightbox ───
        const lightboxModal = document.getElementById('lightboxModal');
        const lightboxImg = document.getElementById('lightboxImg');

        window.openLightbox = function(element) {
            const img = element.querySelector('img');
        if (img) {
            lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Gallery image';
        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden';
            }
        };

        window.closeLightbox = function() {
            lightboxModal.classList.remove('open');
        document.body.style.overflow = '';
        };

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
            closeLightbox();
            }
        });

        // ─── DOM refs ───
        const navbar = document.getElementById('navbar');
        const menuToggle = document.getElementById('menuToggle');
        const closeMenu = document.getElementById('closeMenu');
        const mobileMenu = document.getElementById('mobileMenu');

        const quoteForm = document.getElementById('quoteForm');
        const contactForm = document.getElementById('contactForm');
        const quoteSuccess = document.getElementById('formSuccess');
        const contactSuccess = document.getElementById('contactSuccess');

        // ─── Navbar scroll ───
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > 60) {
            navbar.classList.add('scrolled');
            } else {
            navbar.classList.remove('scrolled');
            }
        lastScroll = currentScroll;
        }, {passive: true });

        // ─── Mobile menu ───
        function openMenu() {
            mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        }

        menuToggle.addEventListener('click', openMenu);
        closeMenu.addEventListener('click', closeMobileMenu);
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) closeMobileMenu();
        });
        mobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', closeMobileMenu);
        });

        // ─── Reveal on scroll (Intersection Observer) ───
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
        });
        revealElements.forEach(function(el) {
            observer.observe(el);
        });

        // ─── Helper: build WhatsApp message ───
        function buildQuoteMessage(data) {
            let msg = 'Hello Star Cargo,%0A%0A';
        msg += 'I would like to request a shipping quote.%0A%0A';
        msg += 'Name: ' + encodeURIComponent(data.fullName) + '%0A';
        msg += 'WhatsApp: ' + encodeURIComponent(data.whatsapp) + '%0A';
        if (data.email) msg += 'Email: ' + encodeURIComponent(data.email) + '%0A';
        msg += '%0A';
        msg += 'Service: ' + encodeURIComponent(data.service) + '%0A';
        msg += 'Item/Product: ' + encodeURIComponent(data.item) + '%0A';
        msg += 'Pickup Location in China: ' + encodeURIComponent(data.pickup) + '%0A';
        msg += 'Destination in Sierra Leone: ' + encodeURIComponent(data.destination) + '%0A';
        if (data.weight) msg += 'Estimated Weight: ' + encodeURIComponent(data.weight) + '%0A';
        if (data.quantity) msg += 'Quantity: ' + encodeURIComponent(data.quantity) + '%0A';
        if (data.message) msg += '%0AAdditional Information:%0A' + encodeURIComponent(data.message) + '%0A';
        msg += '%0AThank you.';
        return msg;
        }

        function buildContactMessage(name, whatsapp, message) {
            let msg = 'Hello Star Cargo,%0A%0A';
        msg += 'I have a question about your shipping services.%0A%0A';
        msg += 'Name: ' + encodeURIComponent(name) + '%0A';
        msg += 'WhatsApp: ' + encodeURIComponent(whatsapp) + '%0A';
        msg += '%0AMessage:%0A' + encodeURIComponent(message) + '%0A%0A';
        msg += 'Thank you.';
        return msg;
        }

        // ─── Quote form ───
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
        quoteSuccess.classList.remove('show');

        const fullName = document.getElementById('fullName').value.trim();
        const whatsapp = document.getElementById('whatsappNumber').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('serviceType').value;
        const item = document.getElementById('itemDescription').value.trim();
        const pickup = document.getElementById('pickupLocation').value.trim();
        const destination = document.getElementById('destination').value.trim();
        const weight = document.getElementById('estimatedWeight').value.trim();
        const quantity = document.getElementById('estimatedQuantity').value.trim();
        const message = document.getElementById('additionalMessage').value.trim();

        if (!fullName || !whatsapp || !service || !item || !pickup || !destination) {
            alert('Please fill in all required fields.');
        return;
            }

        const data = {
            fullName,
            whatsapp,
            email,
            service,
            item,
            pickup,
            destination,
            weight,
            quantity,
            message
        };

        const encoded = buildQuoteMessage(data);
        const url = WHATSAPP_URL + encoded;
        window.open(url, '_blank');

        quoteSuccess.classList.add('show');
        setTimeout(function() {
            quoteSuccess.classList.remove('show');
            }, 8000);
        });

        // ─── Contact form ───
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
        contactSuccess.classList.remove('show');

        const name = document.getElementById('contactName').value.trim();
        const whatsapp = document.getElementById('contactWhatsapp').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !whatsapp || !message) {
            alert('Please fill in all required fields.');
        return;
            }

        const encoded = buildContactMessage(name, whatsapp, message);
        const url = WHATSAPP_URL + encoded;
        window.open(url, '_blank');

        contactSuccess.classList.add('show');
        setTimeout(function() {
            contactSuccess.classList.remove('show');
            }, 8000);
        });

        // ─── Keyboard: Escape closes mobile menu ───
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMobileMenu();
            }
        });

        window.STAR_CARGO_WHATSAPP = WHATSAPP_NUMBER;

        console.log('⭐ Star Cargo website loaded successfully.');
        console.log('📞 WhatsApp: +' + WHATSAPP_NUMBER);
        console.log('🔄 Hero background rotator active (4 images, 7s interval)');
        console.log('🖼️ Gallery lightbox enabled.');

    })();