/* ===========================================================
   Gaza OS - terminal.js (نسخة مبسطة وواضحة)
=========================================================== */

const COMMANDS = {
    help: {
        exec: () => `╔════════════════════════════════════════╗
║     الأوامر المتاحة في Gaza OS        ║
╠════════════════════════════════════════╣
║  help     - عرض هذه المساعدة          ║
║  ls       - عرض الملفات والمجلدات     ║
║  about    - معلومات عن النظام         ║
║  stats    - إحصائيات النظام           ║
║  clear    - مسح الشاشة                ║
╚════════════════════════════════════════╝`,
        desc: "عرض الأوامر المتاحة"
    },

    ls: {
        exec: () => `📁 مجلد المبرمجين     (15 مبرمج)
📁 مجلد المشاريع      (40+ مشروع)
📄 ملف البيان.txt
📄 سجل الصمود.log
🔗 الأمل -> /غزة/المستقبل`,
        desc: "عرض الملفات والمجلدات"
    },

    about: {
        exec: () => `┌─────────────────────────────────────┐
│       Gaza OS الإصدار 1.0.0          │
├─────────────────────────────────────┤
│ نظام محاكاة تفاعلي                   │
│ من إنتاج مبرمجي غزة                  │
│ جامعة الأزهر - PCIT                  │
│ #غزة_تُبرمَج                         │
└─────────────────────────────────────┘`,
        desc: "حول النظام"
    },

    stats: {
        exec: () => `📊 حالة النظام: صامد ويعمل 🇵🇸
👨‍💻 عدد المبرمجين: 15
📁 عدد المشاريع: 40+
💪 مستوى الصمود: لا نهائي`,
        desc: "إحصائيات النظام"
    }
};

const Terminal = {
    outputEl: document.getElementById('terminal-output'),
    inputEl: document.getElementById('terminal-cmd'),

    escapeHtml(text) {
        const p = document.createElement('p');
        p.textContent = text;
        return p.innerHTML;
    },

    print(html, className = "") {
        const div = document.createElement('div');
        div.className = `mb-2 font-mono text-sm ${className}`;
        div.style.whiteSpace = 'pre-line';
        div.innerHTML = html;
        this.outputEl.appendChild(div);
        this.scrollToBottom();
    },

    scrollToBottom() {
        const container = this.outputEl?.parentElement;
        if (container) container.scrollTop = container.scrollHeight;
    },

    execute(rawCmd) {
        const cmd = rawCmd.trim().toLowerCase();

        // عرض الأمر المدخل
        this.print(`<span class="text-terminalTeal">gaza@os</span>:<span class="text-terminalVariable">~$</span> ${this.escapeHtml(rawCmd)}`);

        // تنفيذ الأمر
        if (cmd === 'clear') {
            this.outputEl.innerHTML = '';
        }
        else if (cmd === 'help') {
            this.print(COMMANDS.help.exec());
        }
        else if (cmd === 'ls') {
            this.print(COMMANDS.ls.exec());
        }
        else if (cmd === 'about') {
            this.print(COMMANDS.about.exec());
        }
        else if (cmd === 'stats') {
            this.print(COMMANDS.stats.exec());
        }
        else if (cmd !== '') {
            this.print(`❌ أمر غير معروف: "${this.escapeHtml(cmd)}"
💡 اكتب 'help' لعرض الأوامر المتاحة`, "text-red-400");
        }
    }
};

// تشغيل التيرمينال
document.addEventListener("DOMContentLoaded", () => {
    if (Terminal.inputEl) {
        Terminal.inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                Terminal.execute(Terminal.inputEl.value);
                Terminal.inputEl.value = '';
            }
        });

        // رسالة ترحيب
        Terminal.print(`╔══════════════════════════════════════╗
║   🌟 مرحباً في Gaza OS Terminal 🌟   ║
║                                      ║
║   اكتب 'help' لبدء الاستخدام        ║
╚══════════════════════════════════════╝`);
    }
});