
function openWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;
    win.style.display = 'flex';

    if (window.innerWidth > 640) {
        const open = [...document.querySelectorAll('.window')].filter(w => w.style.display !== 'none' && w.id !== id);
        win.style.left = (80 + open.length * 22) + 'px';
        win.style.top = (50 + open.length * 22) + 'px';
    } else {
        // على الموبايل: النافذة تملأ العرض وتبدأ من الأعلى
        win.style.left = '';
        win.style.top = '';
    }
    bringToFront(win);
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if (win) win.style.display = 'none';
}

function bringToFront(win) {
    document.querySelectorAll('.window').forEach(w => w.style.zIndex = 10);
    win.style.zIndex = 100;
}

// السحب والتحريك للنوافذ عبر الفأرة واللمس
let activeWin = null, offset = { x: 0, y: 0 };

function makeDraggable(win, handleSelector) {
    const handle = win.querySelector(handleSelector);
    if (!handle) return;

    // ── Mouse ──
    handle.addEventListener('mousedown', e => {
        if (e.target.closest('.close-btn')) return;
        e.preventDefault();
        activeWin = win;
        const rect = win.getBoundingClientRect();
        offset.x = e.clientX - rect.left;
        offset.y = e.clientY - rect.top;
        // نحوّل النافذة لـ fixed positioning لحظة السحب لأن offsetLeft قد يكون خاطئاً
        _pinWindow(win, rect.left, rect.top);
        bringToFront(win);
    });

    // ── Touch ──
    handle.addEventListener('touchstart', e => {
        if (e.target.closest('.close-btn')) return;
        e.preventDefault(); // ← يمنع التمرير أثناء سحب الهيدر
        activeWin = win;
        const touch = e.touches[0];
        const rect = win.getBoundingClientRect();
        offset.x = touch.clientX - rect.left;
        offset.y = touch.clientY - rect.top;
        _pinWindow(win, rect.left, rect.top);
        bringToFront(win);
    }, { passive: false }); // passive:false ضروري مع preventDefault
}

document.onmousemove = e => {
    if (!activeWin) return;
    activeWin.style.left = (e.clientX - offset.x) + 'px';
    activeWin.style.top = (e.clientY - offset.y) + 'px';
};

document.ontouchmove = e => {
    if (!activeWin) return;
    const touch = e.touches[0];
    activeWin.style.left = (touch.clientX - offset.x) + 'px';
    activeWin.style.top = (touch.clientY - offset.y) + 'px';
};

document.onmouseup = () => { activeWin = null; };
document.ontouchend = () => { activeWin = null; };
document.onmousemove = e => {
    if (!activeWin) return;

    // حساب الموقع الجديد مع الحفاظ على الحدود
    let newX = e.clientX - offset.x;
    let newY = e.clientY - offset.y;

    // منع الخروج من الجهة اليسرى والعليا
    newX = Math.max(0, newX);
    newY = Math.max(0, newY);

    // منع الخروج من الجهة اليمنى والسفلية
    // (نطرح عرض النافذة للحفاظ عليها داخل الشاشة)
    newX = Math.min(window.innerWidth - activeWin.offsetWidth, newX);
    newY = Math.min(window.innerHeight - activeWin.offsetHeight - 40.5, newY);

    activeWin.style.left = newX + 'px';
    activeWin.style.top = newY + 'px';
};