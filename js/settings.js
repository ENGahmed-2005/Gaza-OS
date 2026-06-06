

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