/* ==========================================================
   Gaza OS - js/programmers.js (قائمة وملفات المبرمجين)
========================================================== */

function showProgrammer(id) {
    if (typeof programmers === 'undefined') return;
    const p = programmers.find(x => x.id === id);
    if (!p) return;

    const initials = p.name.split(' ').map(w => w[0]).join('').slice(0, 2);
    const profileContent = document.getElementById('profile-content');
    if (!profileContent) return;

    profileContent.innerHTML = `
    <div class="text-center mb-6">
      <div class="w-20 h-20 rounded-full mx-auto flex items-center justify-center font-black text-2xl mb-3 shadow-lg" style="background:${p.color}22; color:${p.color}; border:2px solid ${p.color}">
        ${initials}
      </div>
      <h2 class="text-xl font-bold text-[var(--win-text)]">${p.name}</h2>
      <p class="text-xs text-osBlue font-mono mt-1">${p.role}</p>
    </div>
    
    <div class="space-y-4">
      <div class="bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-gray-700/20">
        <span class="text-xs text-gray-400 block mb-1 font-medium">الرسالة الحية</span>
        <p class="text-sm italic text-[var(--win-text)] leading-relaxed">"${p.bio}"</p>
      </div>

      <div class="grid grid-cols-2 gap-2 text-xs font-mono">
        <div class="bg-black/5 dark:bg-white/5 p-2.5 rounded-lg border border-gray-700/10 truncate">
          <i class="fas fa-envelope text-red-400 ml-1"></i> ${p.email}
        </div>
        <div class="bg-black/5 dark:bg-white/5 p-2.5 rounded-lg border border-gray-700/10 truncate">
          <i class="fab fa-github text-gray-400 ml-1"></i> ${p.github}
        </div>
      </div>

      <div>
        <span class="text-xs text-gray-400 block mb-2 font-medium">المهارات التقنية</span>
        <div class="flex flex-wrap gap-1.5">
          ${p.skills.map(s => `<span class="text-[11px] px-2.5 py-1 bg-osBlue/10 text-osBlue rounded-md font-medium border border-osBlue/20">${s}</span>`).join('')}
        </div>
      </div>

      <div>
        <span class="text-xs text-gray-400 block mb-2 font-medium">أبرز المشاريع المُنجزة</span>
        <div class="space-y-1.5">
          ${p.projects.map(prj => `
            <div class="text-xs p-2.5 bg-black/5 dark:bg-white/5 rounded-lg border border-gray-700/10 flex items-center gap-2">
              <i class="fas fa-code-branch text-emerald-400 text-[10px]"></i>
              <span class="text-[var(--win-text)] font-medium">${prj}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    `;

    if (typeof openWindow === 'function') {
        openWindow('profile-win');
    }
}

// بناء القائمة تلقائياً عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById('programmer-list');
    if (!list || typeof programmers === 'undefined') return;

    programmers.forEach(p => {
        const initials = p.name.split(' ').map(w => w[0]).join('').slice(0, 2);
        const div = document.createElement('div');
        div.className = 'flex items-center gap-3 p-3 border border-gray-700/10 bg-black/5 dark:bg-white/5 rounded-xl cursor-pointer transition-all hover:border-osBlue/40 hover:-translate-x-1';
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
});