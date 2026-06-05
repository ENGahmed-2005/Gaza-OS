/* ==========================================================
   Gaza OS - js/app.js (التهيئة العامة والتفاعل)
========================================================== */

// 1. إدارة قائمة ابدأ والنقر الخارجي لإغلاقها
// function toggleStartMenu() {
//     const menu = document.getElementById('start-menu');
//     if (menu) menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
// }

document.addEventListener('mousedown', e => {
    const win = e.target.closest('.window');
    if (win && typeof bringToFront === 'function') {
        bringToFront(win);
    }

    const menu = document.getElementById('start-menu');
    const startBtn = document.querySelector('.start-btn');
    if (menu && !menu.contains(e.target) && !startBtn.contains(e.target)) {
        menu.style.display = 'none';
    }
});

// 2. إدارة وتحديث الساعة الرقمية
function updateClock() {
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.innerText = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
}

// 3. تهيئة أحداث النظام عند جاهزية الصفحة
document.addEventListener("DOMContentLoaded", () => {
    // تفعيل الساعة المباشرة
    setInterval(updateClock, 1000);
    updateClock();

    // حفظ تلقائي لنصوص المفكرة الممتدة في الـ localStorage
    const notepad = document.getElementById('notepad-text');
    if (notepad) {
        notepad.value = localStorage.getItem('gaza-os-notes') || '';
        notepad.addEventListener('input', () => {
            localStorage.setItem('gaza-os-notes', notepad.value);
        });
    }

    // إدارة معالجة نموذج الاتصال (Contact Form)
    const contactForm = document.querySelector('#contact-win form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('تم استلام رسالتك بنجاح! مبرمجو غزة يقرؤونك ويشكرون دعمك الصامد.');
            contactForm.reset();
            if (typeof closeWindow === 'function') {
                closeWindow('contact-win');
            }
        });
    }
});