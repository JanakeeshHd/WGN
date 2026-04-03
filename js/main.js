document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // --- Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    // --- Quantity Selectors ---
    const qtySelectors = document.querySelectorAll('.qty-selector');
    
    qtySelectors.forEach(selector => {
        const minusBtn = selector.querySelector('.minus');
        const plusBtn = selector.querySelector('.plus');
        const input = selector.querySelector('.qty-input');

        minusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                updateStickyBar();
            }
        });

        plusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            input.value = value + 1;
            updateStickyBar();
        });

        input.addEventListener('change', () => {
            if (parseInt(input.value) < 1) input.value = 1;
            updateStickyBar();
        });
    });

    // --- Order Modal Logic ---
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-modal');
    const orderBtns = document.querySelectorAll('.order-btn');
    const whatsappForm = document.getElementById('whatsapp-form');
    
    let currentOrder = {
        product: '',
        price: 0,
        quantity: 1
    };

    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = btn.getAttribute('data-product');
            const productPrice = parseInt(btn.getAttribute('data-price'));
            const quantity = parseInt(productCard.querySelector('.qty-input').value);

            currentOrder = {
                product: productName,
                price: productPrice,
                quantity: quantity
            };

            // Update Modal Content
            document.getElementById('modal-product-name').textContent = productName;
            document.getElementById('modal-qty').textContent = quantity;
            document.getElementById('modal-total-price').textContent = productPrice * quantity;

            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // --- WhatsApp Message Generation ---
    const PHONE_NUMBER = '918792389634'; // Replace with actual number

    whatsappForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userName = document.getElementById('user-name').value;
        const totalPrice = currentOrder.price * currentOrder.quantity;

        const message = `Hello Western Ghats Nectar! 🌿
        
I want to place an order:
🛒 Product: ${currentOrder.product}
🔢 Quantity: ${currentOrder.quantity}
💰 Total Price: ₹${totalPrice}

👤 Name: ${userName}

Please confirm my order. Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        modal.style.display = 'none';
        whatsappForm.reset();
    });

    // --- Mobile Sticky Bar Logic ---
    function updateStickyBar() {
        const stickyBar = document.querySelector('.mobile-sticky-bar');
        const qtyInputs = document.querySelectorAll('.qty-input');
        let totalQty = 0;
        qtyInputs.forEach(input => {
            totalQty += parseInt(input.value);
        });
        
        const stickyItemCount = document.getElementById('sticky-item-count');
        if (stickyItemCount) {
            stickyItemCount.textContent = totalQty;
        }

        // Show/hide sticky bar based on scroll position (only on mobile)
        if (window.innerWidth <= 768) {
            if (window.scrollY > 300) {
                stickyBar.style.display = 'flex';
            } else {
                stickyBar.style.display = 'none';
            }
        }
    }

    // Initialize sticky bar and navbar state
    updateStickyBar();
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.padding = '10px 0';
        navbar.style.backgroundColor = body.getAttribute('data-theme') === 'dark' 
            ? 'rgba(26, 26, 26, 0.98)' 
            : 'rgba(255, 248, 225, 0.98)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.padding = '15px 0';
        navbar.style.backgroundColor = 'transparent';
    }

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = body.getAttribute('data-theme') === 'dark' 
                ? 'rgba(26, 26, 26, 0.98)' 
                : 'rgba(255, 248, 225, 0.98)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'transparent';
        }
        updateStickyBar();
    });
});