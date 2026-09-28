// ===== زرار الهدية =====
const openGiftBtn = document.getElementById('openGiftBtn');
const giftContentSection = document.getElementById('giftContentSection');

openGiftBtn.addEventListener('click', () => {
    // 1. نعرض قسم الصورتين
    giftContentSection.classList.add('show');

    // 2. نشغل الاحتفال 🎊
    startConfetti();

    // 3. ننزل بالمستر تلقائياً للصورتين 👇
    setTimeout(() => {
        giftContentSection.scrollIntoView({ behavior: 'smooth' });
    }, 300);

    // 4. نخفي الزرار بعد ما يدوس عليه
    openGiftBtn.style.display = 'none';
});

// ===== Confetti 🎊 =====
function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ffd700', '#ff416c', '#4facfe', '#43e97b', '#fa709a'];
    const pieces = [];

    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotSpeed: Math.random() * 10 - 5
        });
    }

    let time = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotSpeed;

            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });

        time++;
        if (time < 500) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}

// لو الشاشة اتغير حجمها
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
// ===== تكبير الصور (Lightbox) =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close-btn');

// نختار كل الصور اللي عايزينها تكبر (الألبوم + الهدية)
const allImages = document.querySelectorAll('.album img, .gift-img');

allImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('show');
        // نوقف الـ scroll ورا الـ lightbox
        document.body.style.overflow = 'hidden';
    });
});

// نقفل لما يدوس على X
closeBtn.addEventListener('click', closeLightbox);

// نقفل لما يدوس على أي مكان في الخلفية السودة
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// نقفل بزرار ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = ''; // نرجع الـ scroll
}