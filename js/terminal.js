
const terminalCommands = {
    help: () => `الأوامر المتاحة:\n  <span class="text-terminalTeal">ls</span>      - عرض الملفات والمجلدات\n  <span class="text-terminalTeal">about</span>   - حول Gaza OS\n  <span class="text-terminalTeal">clear</span>   - مسح الشاشة\n  <span class="text-terminalTeal">stats</span>   - إحصائيات النظام\n  <span class="text-terminalTeal">help</span>    - عرض هذه المساعدة`,
    ls: () => `drwxr-xr-x  coders/  <span class="text-terminalComment">// مجلد المبرمجين</span>\n-rw-r--r--  manifesto.txt\n-rw-r--r--  kernel.sys`,
    about: () => `<span class="text-terminalKeyword">Gaza OS [Version 1.0.0]</span>\nنظام محاكاة مبني بأيدي مبرمجي غزة لإيصال رسالة للعالم: <span class="text-terminalString">"نحن هنا، ونكتب الكود تحت أي ظرف."</span>`,
    stats: () => `إحصائيات البيئة:\n  - المبرمجون المسجلون: <span class="text-terminalVariable">15</span>\n  - الحالة: <span class="text-green-400">صامد وشغال</span>\n  - الطاقة: <span class="text-yellow-500">10% (بطارية مؤقتة)</span>\n  - الاتصال: <span class="text-red-500">متقطع / عبر الـ المخيلة</span>`
};

document.addEventListener("DOMContentLoaded", () => {
    const termInput = document.getElementById('terminal-cmd');
    if (termInput) {
        termInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                const raw = termInput.value;
                const cmd = raw.trim().toLowerCase();
                termInput.value = '';
                if (!cmd) return;

                const output = document.getElementById('terminal-output');
                if (output) {
                    output.innerHTML += `<div><span class="text-terminalVariable">user@gaza_os:~$</span> ${raw}</div>`;

                    if (cmd === 'clear') {
                        output.innerHTML = '';
                    } else if (terminalCommands[cmd]) {
                        output.innerHTML += `<div class="mb-2 whitespace-pre-line">${terminalCommands[cmd]()}</div>`;
                    } else {
                        output.innerHTML += `<div class="mb-2 text-red-400">الأمر غير معروف: '${raw}'. اكتب <span class="text-white underline cursor-pointer" onclick="document.getElementById('terminal-cmd').value='help'">help</span> للمساعدة.</div>`;
                    }

                    // النزول التلقائي لأسفل الـ Terminal
                    const winBody = termInput.closest('.overflow-y-auto');
                    if (winBody) winBody.scrollTop = winBody.scrollHeight;
                }
            }
        });
    }
});