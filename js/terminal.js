/* ==========================================================\r\n   Gaza OS - js/terminal.js\r\n========================================================== */

const terminalCommands = {
    help: () => `<span dir="ltr" style="display:block">الأوامر المتاحة:\r\n  <span class="text-terminalTeal">help</span>    - عرض هذه المساعدة\r\n  <span class="text-terminalTeal">ls</span>      - عرض الملفات والمجلدات\r\n  <span class="text-terminalTeal">about</span>   - حول Gaza OS\r\n  <span class="text-terminalTeal">clear</span>   - مسح الشاشة\r\n  <span class="text-terminalTeal">stats</span>   - إحصائيات النظام</span>`,

    ls: () => `<span dir="ltr" style="display:block"><span class="text-terminalKeyword">drwxr-xr-x</span>  coders/       <span class="text-terminalComment">// مجلد المبرمجين</span>\r\n<span class="text-terminalKeyword">drwxr-xr-x</span>  projects/     <span class="text-terminalComment">// مشاريع المبرمجين</span>\r\n<span class="text-terminalVariable">-rw-r--r--</span>  manifesto.txt\r\n<span class="text-terminalVariable">-rw-r--r--</span>  readme.md\r\n<span class="text-terminalVariable">-rw-r--r--</span>  kernel.sys\r\n<span class="text-terminalString">-rwxr-xr-x</span>  start.sh      <span class="text-terminalComment">// سكريبت التشغيل</span></span>`,
    

    about: () => `<span class="text-terminalKeyword">Gaza OS [Version 1.0.0]</span>\nنظام محاكاة مبني بأيدي مبرمجي غزة.`,

    stats: () => `إحصائيات البيئة:\n - الحالة: <span class="text-green-400">صامد وشغال</span>`
};

// وظيفة للحماية من الرموز الخطرة
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
    const termInput = document.getElementById('terminal-cmd');
    if (!termInput) return;

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const raw = termInput.value;
            const cmd = raw.trim().toLowerCase();
            termInput.value = '';
            if (!cmd) return;

            const output = document.getElementById('terminal-output');
            if (!output) return;

            // عرض الأمر المكتوب
            output.innerHTML += `<div dir="ltr"><span class="text-terminalTeal">user@gaza_os</span><span class="text-gray-500">:</span><span class="text-terminalVariable">~$</span> <span class="text-gray-200">${escapeHtml(raw)}</span></div>`;

            if (cmd === 'clear') {
                output.innerHTML = '';
            } else if (terminalCommands[cmd]) {
                output.innerHTML += `<div class="mb-2 whitespace-pre-line">${terminalCommands[cmd]()}</div>`;
            } else {
                output.innerHTML += `<div class="mb-2 text-red-400" dir="ltr">command not found: <span class="text-white">'${escapeHtml(raw)}'</span> — اكتب <span class="text-terminalTeal underline cursor-pointer" onclick="document.getElementById('terminal-cmd').value='help';document.getElementById('terminal-cmd').focus()">help</span></div>`;
            }

            // تمرير الشاشة للأسفل تلقائياً
            const winBody = termInput.closest('.overflow-y-auto');
            if (winBody) winBody.scrollTop = winBody.scrollHeight;
        }
    });
});