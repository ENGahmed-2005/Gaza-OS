/* ==========================================================
   Gaza OS - شاشة التمهيد (Boot Screen)
========================================================== */
(function boot() {
    const logs = [
        'Initializing Gaza OS v1.0...',
        'Loading kernel modules... OK',
        'Mounting filesystem... OK',
        'Starting programmer registry... OK',
        'Loading 15 coders from Gaza... OK',
        'System ready. Welcome.',
    ];
    const logEl = document.getElementById('boot-log');
    const barEl = document.getElementById('boot-bar');
    const screen = document.getElementById('boot-screen');
    let i = 0;

    function nextLog() {
        if (i < logs.length) {
            const p = document.createElement('p');
            p.textContent = '[ OK ] ' + logs[i];
            if (logEl) logEl.appendChild(p);
            if (barEl) barEl.style.width = ((i + 1) / logs.length * 100) + '%';
            i++;
            setTimeout(nextLog, 320);
        } else {
            setTimeout(() => {
                if (screen) {
                    screen.style.opacity = '0';
                    setTimeout(() => { screen.style.display = 'none'; }, 800);
                }
            }, 400);
        }
    }
    if (logEl) setTimeout(nextLog, 300);
})();