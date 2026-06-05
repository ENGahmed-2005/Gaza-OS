
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