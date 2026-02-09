// Star cursor trail effect
(function() {
    const colors = ['#f796c6'];
    const stars = ['💗'];
    const sparkles = [];
    const sparkleCount = 6;
    
    // Create star elements
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = stars[i % stars.length];
        sparkle.style.cssText = `
            position: fixed;
            color: ${colors[i % colors.length]};
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            font-size: ${12 + Math.random() * 8}px;
            text-shadow: 0 0 8px ${colors[i % colors.length]};
        `;
        document.body.appendChild(sparkle);
        sparkles.push({
            element: sparkle,
            x: 0,
            y: 0,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 0
        });
    }
    
    let mouseX = 0, mouseY = 0;
    let sparkleIndex = 0;
    let lastSpawn = 0;
    const spawnDelay = 100; // milliseconds between spawns
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        const now = Date.now();
        if (now - lastSpawn < spawnDelay) return;
        
        lastSpawn = now;
        
        const sparkle = sparkles[sparkleIndex];
        sparkle.x = mouseX;
        sparkle.y = mouseY;
        sparkle.life = 1;
        sparkle.vx = (Math.random() - 0.5) * 3;
        sparkle.vy = (Math.random() - 0.5) * 3;
        
        sparkleIndex = (sparkleIndex + 1) % sparkleCount;
    });
    
    function animate() {
        sparkles.forEach(sparkle => {
            if (sparkle.life > 0) {
                sparkle.x += sparkle.vx;
                sparkle.y += sparkle.vy;
                sparkle.life -= 0.02;
                sparkle.element.style.left = sparkle.x + 'px';
                sparkle.element.style.top = sparkle.y + 'px';
                sparkle.element.style.opacity = Math.max(0, sparkle.life);
            }
        });
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Animate counter
    const counterElement = document.querySelector('.counter-number');
    if (counterElement) {
        let count = 0;
        const target = parseInt(counterElement.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            count += increment;
            if (count < target) {
                counterElement.textContent = Math.floor(count).toString().padStart(6, '0');
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.textContent = target.toString().padStart(6, '0');
            }
        }
        
        setTimeout(updateCounter, 500);
    }
    
    // Set last login date to today but in 2004
    const lastLoginElement = document.getElementById('last-login');
    if (lastLoginElement) {
        const today = new Date();
        const day = today.getDate().toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        lastLoginElement.textContent = `${day}/${month}/2004`;
    }
})();
