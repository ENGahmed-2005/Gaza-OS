/* ==========================================================
   Gaza OS - الإعدادات، القوائم وبناء الواجهات التفاعلية
========================================================== */

// 1. تبديل وعمل قائمة ابدأ ومراقبة النقر الخارجي
function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    if (menu) menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('mousedown', e => {
    const win = e.target.closest('.window');
    if (win) if (typeof bringToFront === 'function') bringToFront(win);

    const menu = document.getElementById('start-menu');
    const startBtn = document.querySelector('.start-btn');
    if (menu && !menu.contains(e.target) && !startBtn.contains(e.target)) {
        menu.style.display = 'none';
    }
});

// 2. تحديث وقت الساعة
function updateClock() {
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.innerText = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
}
setInterval(updateClock, 1000);
updateClock();

// 3. تغييرات الخلفية والسمة الفاتحة والداكنة (إصلاح شامل للثيم والنصوص والتاسكبار)
function changeBg(color) {
    const desktop = document.getElementById('desktop');
    if (desktop) {
        desktop.style.background = color;
        // عند تغيير الخلفية يدوياً نقوم بإزالة الـ gradient ليعمل اللون المختار
        desktop.style.backgroundImage = 'none';
    }
}

function setTheme(theme) {
  // إضافة الواصف على جذر المستند لتفعيل كلاسات تايلويند dark:
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('os-theme', theme);

  const root = document.documentElement;

  if (theme === 'dark') {


    root.style.setProperty('--win-bg', '#0f0f1a');               // خلفية النوافذ
    root.style.setProperty('--win-text', '#ffffff');             // لون النصوص الكاملة
    root.style.setProperty('--win-header-bg', '#1a1a2e');        // خلفية الهيدر
    root.style.setProperty('--win-border', '#1f2937');           // الحدود للنافذة
    root.style.setProperty('--start-menu-bg', '#0f0f1a');        // قائمة ابدأ
    root.style.setProperty('--start-menu-text', '#ffffff');      // نصوص القائمة والتاسكبار
    root.style.setProperty('--taskbar-bg', 'rgba(15, 15, 26, 0.9)'); // خلفية التاسكبار
    root.style.setProperty('--taskbar-item-bg', '#1a1a2e');      // عناصر شريط المهام
    root.style.setProperty('--taskbar-item-border', '#374151');  // حدود عناصر شريط المهام

  } else {


    root.style.setProperty('--win-bg', '#ffffff');               // خلفية النوافذ بيضاء
    root.style.setProperty('--win-text', '#111827');             // لون النصوص داكن (رمادي غامق جداً)
    root.style.setProperty('--win-header-bg', '#f3f4f6');        // خلفية الهيدر فاتحة
    root.style.setProperty('--win-border', '#e5e7eb');           // حدود النوافذ فاتحة
    root.style.setProperty('--start-menu-bg', '#ffffff');        // قائمة ابدأ بيضاء
    root.style.setProperty('--start-menu-text', '#111827');      // نصوص القائمة والتاسكبار
    root.style.setProperty('--taskbar-bg', 'rgba(255, 255, 255, 0.9)'); // خلفية التاسكبار فاتحة
    root.style.setProperty('--taskbar-item-bg', '#f3f4f6');      // عناصر شريط المهام
    root.style.setProperty('--taskbar-item-border', '#d1d5db');  // حدود عناصر شريط المهام
  }
}

// تشغيل الثيم المحفوظ تلقائياً فور فتح النظام
setTheme(localStorage.getItem('os-theme') || 'dark');

// 4. بناء قوائم المبرمجين ديناميكياً (تعتمد على data.js)
(function buildProgrammerList() {
    const list = document.getElementById('programmer-list');
    if (!list || typeof programmers === 'undefined') return;

    programmers.forEach(p => {
        const initials = p.name.split(' ').map(w => w[0]).join('').slice(0, 2);
        const div = document.createElement('div');
        div.className = 'flex items-center gap-3 p-3 border border-[var(--win-item-border)] bg-[var(--win-item-bg)] rounded-xl cursor-pointer transition-all hover:border-[var(--win-item-hover-border)] hover:-translate-x-1';
        div.innerHTML = `
      <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs" style="background:${p.color}22;color:${p.color};border:1px solid ${p.color}55">${initials}</div>
      <div>
        <div class="font-bold text-sm text-[var(--win-text)]">${p.name}</div>
        <div class="text-[10px] text-gray-400">@${p.id} — ${p.role}</div>
      </div>
      ${p.owner ? '<span class="mr-auto text-[10px] px-2 py-0.5 rounded-full font-bold" style="background:#f0c04022;color:#f0c040;border:1px solid #f0c04055">صاحب المشروع</span>' : ''}
    `;
        div.onclick = () => showProgrammer(p.id);
        list.appendChild(div);
    });
})();

// 5. عرض الملف الشخصي للمبرمج
function showProgrammer(id) {
    if (typeof programmers === 'undefined') return;
    const p = programmers.find(x => x.id === id);
    if (!p) return;
    const initials = p.name.split(' ').map(w => w[0]).join('').slice(0, 2);
    const profileContent = document.getElementById('profile-content');
    if (!profileContent) return;

    profileContent.innerHTML = `
    <div class="text-center mb-6">
      <div class="inline-flex w-20 h-20 rounded-full items-center justify-center text-3xl font-bold mb-4 shadow-lg" style="background:${p.color}22;color:${p.color};border:2px solid ${p.color}66">${initials}</div>
      <h3 class="text-2xl font-bold text-[var(--win-text)]">${p.name}</h3>
      <p class="text-xs text-gray-400 mb-2 font-mono">@${p.id}</p>
      <div class="inline-block px-3 py-1 rounded-full text-xs font-bold" style="background:${p.color}22;color:${p.color}">${p.role}</div>
      ${p.owner ? '<div class="mt-2"><span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">★ صاحب المشروع</span></div>' : ''}
    </div>
    <div class="space-y-6">
      <div class="relative p-4 bg-black/5 dark:bg-white/5 rounded-2xl border-r-4" style="border-color:${p.color}">
        <i class="fas fa-quote-right absolute top-2 left-3 opacity-10 text-2xl"></i>
        <p class="text-sm leading-relaxed italic text-[var(--win-text)]">"${p.bio}"</p>
      </div>
      <div>
        <p class="text-[10px] text-gray-400 uppercase tracking-[2px] mb-3 font-bold mr-1">المهارات التقنية</p>
        <div class="flex flex-wrap gap-2">${p.skills.map(s => `<span class="text-[11px] px-3 py-1 rounded-lg font-medium" style="background:${p.color}15;color:${p.color};border:1px solid ${p.color}33">${s}</span>`).join('')}</div>
      </div>
      <div>
        <p class="text-[10px] text-gray-400 uppercase tracking-[2px] mb-3 font-bold mr-1">المشاريع البارزة</p>
        <div class="grid grid-cols-1 gap-2">${p.projects.map(pr => `<div class="text-sm flex items-center gap-3 p-2 bg-black/5 dark:bg-white/5 rounded-xl border border-transparent hover:border-[var(--win-item-hover-border)] transition-all text-[var(--win-text)]"><i class="fas fa-code-branch text-xs" style="color:${p.color}"></i>${pr}</div>`).join('')}</div>
      </div>
      <div class="pt-4 border-t border-[var(--win-item-border)] flex flex-col sm:flex-row gap-4 text-sm">
        <div class="flex items-center gap-3 text-[var(--win-text)] opacity-80"><i class="fas fa-envelope text-osBlue w-5 text-center"></i>${p.email}</div>
        <div class="flex items-center gap-3 text-[var(--win-text)] opacity-80"><i class="fab fa-github w-5 text-center"></i>${p.github}</div>
      </div>
    </div>
  `;
    if (typeof openWindow === 'function') openWindow('profile-win');
}

// 6. نموذج الاتصال والبيان (Manifesto)
function submitContact(e) {
    e.preventDefault();
    alert('شكراً لرسالتك! سيتم التواصل معك قريباً (هذا نموذج تجريبي).');
    if (typeof closeWindow === 'function') closeWindow('contact-win');
}

(function buildManifesto() {
    const manifestoContent = document.getElementById('manifesto-content');
    if (manifestoContent) {
        manifestoContent.innerHTML = `
      <div class="space-y-4 text-lg">
        <div class="manifesto-line font-bold text-xl border-r-4 border-osBlue pr-3">نحن <span class="text-osBlue">مبرمجو غزة.</span></div>
        <div class="manifesto-line">كتبنا الكود <span class="text-osBlue font-semibold">وسط الدخان.</span></div>
        <div class="manifesto-line">أصلحنا الـ bugs <span class="text-osBlue font-semibold">على ضوء الشمعة.</span></div>
        <div class="manifesto-line italic">ولم <span class="text-green-500 font-bold text-2xl">نتوقف.</span></div>
        <hr class="my-6 border-gray-700/50">
        <div class="grid grid-cols-3 gap-3 my-6 text-center">
          <div class="bg-osBlue/10 p-3 rounded-xl border border-osBlue/20">
            <div class="text-2xl font-bold text-osBlue">15+</div>
            <div class="text-[10px] text-gray-400 uppercase">مبرمج</div>
          </div>
          <div class="bg-osBlue/10 p-3 rounded-xl border border-osBlue/20">
            <div class="text-2xl font-bold text-osBlue">40+</div>
            <div class="text-[10px] text-gray-400 uppercase">مشروع</div>
          </div>
          <div class="bg-osBlue/10 p-3 rounded-xl border border-osBlue/20">
            <div class="text-2xl font-bold text-osBlue">1</div>
            <div class="text-[10px] text-gray-400 uppercase">رسالة</div>
          </div>
        </div>
        <hr class="my-6 border-gray-700/50">
        <div class="manifesto-line">لم يوقفنا <span class="text-red-500 font-semibold text-xl">الحصار.</span></div>
        <div class="manifesto-line font-bold">لأن الكود <span class="text-osBlue underline decoration-2 underline-offset-4">أقوى من كل شيء.</span></div>
        <p class="text-gray-500 text-sm mt-8 italic leading-relaxed text-left" dir="ltr">
          // Coding for life, coding for Gaza.<br>
          // #Gaza_Is_Coding
        </p>
      </div>
    `;
    }
})();