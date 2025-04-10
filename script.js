// Matrix Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Making the canvas full screen
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Characters for the matrix effect
const shadowChars = ['$', 'S', 'E', 'E', '0', '1', '■', '□', '░', '▒', '▓', '█', '▄', '▀'];

// Font size
const fontSize = 14;

// Calculate number of columns based on canvas width and font size
const columns = canvas.width / fontSize;

// Array to store the Y position of each drop
const drops = [];

// Initialize all drops to start from random Y positions
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height);
}

// Drawing the characters
function draw() {
    // Black background with opacity to create trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set color and font for the falling characters
    ctx.fillStyle = '#aaa';
    ctx.font = fontSize + 'px monospace';
    
    // Looping over drops
    for (let i = 0; i < drops.length; i++) {
        // Choose a random character
        const text = shadowChars[Math.floor(Math.random() * shadowChars.length)];
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Move the drop down by one unit
        drops[i]++;
        
        // Randomize reset for varied looks
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
    }
}

// Run the animation
setInterval(draw, 50);

// Update matrix effect on window resize
window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const newColumns = canvas.width / fontSize;
    
    // Reset drops array
    for (let i = 0; i < newColumns; i++) {
        if (i < drops.length) {
            // Keep existing drops
            continue;
        } else {
            // Add new drops for larger screen
            drops[i] = Math.floor(Math.random() * canvas.height);
        }
    }
    
    // If screen got smaller, trim the drops array
    if (newColumns < drops.length) {
        drops.length = Math.floor(newColumns);
    }
});

// Original cursor follower effect
const cursorFollower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    // Move cursor follower
    cursorFollower.style.opacity = '1';
    cursorFollower.style.left = `${e.clientX}px`;
    cursorFollower.style.top = `${e.clientY}px`;
});

document.addEventListener('mouseleave', () => {
    cursorFollower.style.opacity = '0';
});

// Dynamic shadow effect for cursor
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    const shadowContainer = document.querySelector('.shadow-container');
    const dynamicShadow = document.createElement('div');
    dynamicShadow.classList.add('dynamic-shadow');
    dynamicShadow.style.width = '300px';
    dynamicShadow.style.height = '300px';
    dynamicShadow.style.top = `${y - 150}px`;
    dynamicShadow.style.left = `${x - 150}px`;
    dynamicShadow.style.background = 'radial-gradient(circle, rgba(100, 100, 100, 0.2) 0%, rgba(0, 0, 0, 0) 70%)';
    dynamicShadow.style.opacity = '0.7';
    
    shadowContainer.appendChild(dynamicShadow);
    
    // Remove the dynamic shadow after animation
    setTimeout(() => {
        dynamicShadow.style.opacity = '0';
        setTimeout(() => {
            shadowContainer.removeChild(dynamicShadow);
        }, 500);
    }, 1000);
});

// Menu toggle function for mobile
function toggleMenu() {
    const menuItems = document.querySelector('.menu-items');
    menuItems.classList.toggle('open');
}

// Section navigation
function showSection(element) {
    // Update menu active state
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');
    
    // Show selected section
    const sectionId = element.getAttribute('data-section');
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Close menu on mobile if it's open
    const menuItemsContainer = document.querySelector('.menu-items');
    if (window.innerWidth <= 768 && menuItemsContainer.classList.contains('open')) {
        toggleMenu();
    }
}
