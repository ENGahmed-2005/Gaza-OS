
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
let activeWin = null;
let offset = {
    x: 0,
    y: 0
};

function makeDraggable(win, handleSelector) {

    const handle = win.querySelector(handleSelector);

    if (!handle) return;

    handle.onmousedown = e => {

        if (e.target.closest('.close-btn')) return;

        e.preventDefault();

        activeWin = win;

        const rect = win.getBoundingClientRect();

        offset.x = e.clientX - rect.left;
        offset.y = e.clientY - rect.top;

        bringToFront(win);
    };

    handle.ontouchstart = e => {

        if (e.target.closest('.close-btn')) return;

        e.preventDefault();

        const touch = e.touches[0];

        activeWin = win;

        const rect = win.getBoundingClientRect();

        offset.x = touch.clientX - rect.left;
        offset.y = touch.clientY - rect.top;

        bringToFront(win);
    };
}

document.onmousemove = e => {

    if (!activeWin) return;

    let newX = e.clientX - offset.x;
    let newY = e.clientY - offset.y;

    newX = Math.max(
        0,
        Math.min(
            window.innerWidth - activeWin.offsetWidth,
            newX
        )
    );

    newY = Math.max(
        0,
        Math.min(
            window.innerHeight - activeWin.offsetHeight,
            newY
        )
    );

    activeWin.style.left = newX + 'px';
    activeWin.style.top = newY + 'px';
};

document.ontouchmove = e => {

    if (!activeWin) return;

    e.preventDefault();

    const touch = e.touches[0];

    let newX = touch.clientX - offset.x;
    let newY = touch.clientY - offset.y;

    activeWin.style.left = newX + "px";
    activeWin.style.top = newY + "px";
};

document.onmouseup = () => {

    activeWin = null;

};

document.ontouchend = () => {

    activeWin = null;

};