/* ==========================================================
   Gaza OS - ملف المكونات المشتركة (Shared Components)
========================================================== */

/**
 * دالة لإنشاء شريط العنوان (Header) الموحد للنوافذ ديناميكياً
 * @param {string} windowId - معرف النافذة (مثال: 'terminal-win')
 * @param {string} title - عنوان النافذة الذي سيظهر للمستخدم
 * @param {string} iconClass - كلاس أيقونة FontAwesome (مثال: 'fas fa-terminal')
 */
function createWindowHeader(windowId, title, iconClass) {
    const win = document.getElementById(windowId);
    if (!win) return;

    // إنشاء عنصر الهيدر مع إعطائه كلاسات Tailwind متوافقة مع الثيمات عبر المتغيرات التي قمت أنت بتعريفها
    const header = document.createElement('div');
    header.className = "window-header bg-[var(--win-header-bg)] border-b border-[var(--win-border)] text-[var(--win-text)] px-4 sm:px-3 py-3 sm:py-2 flex justify-between items-center cursor-move select-none rounded-t-3xl sm:rounded-t-lg w-full z-50 transition-colors duration-300";

    // بناء الهيكل الداخلي للهيدر (العنوان والأيقونة، وزر الإغلاق)
    header.innerHTML = `
    <span class="flex items-center gap-2 font-medium text-base sm:text-sm">
      <i class="${iconClass}"></i> ${title}
    </span>
    <span class="close-btn text-[var(--win-text)] opacity-60 hover:opacity-100 hover:text-red-500 cursor-pointer p-1 transition-all" onclick="closeWindow('${windowId}')">
      <i class="fas fa-xmark text-lg sm:text-base"></i>
    </span>
  `;

    // حقن الهيدر في بداية النافذة كأول عنصر داخلي (Prepend)
    win.insertBefore(header, win.firstChild);
}

// استدعاء تلقائي لبناء الهيدر لجميع نوافذ النظام بمجرد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    // 1. نافذة التيرمينال
    createWindowHeader('terminal-win', 'Gaza Terminal', 'fas fa-terminal text-green-400');

    // 2. نافذة مجلد المبرمجين
    createWindowHeader('programmers-win', 'مجلد المبرمجين', 'fas fa-folder text-yellow-500');

    // 3. نافذة الملف الشخصي (Profile)
    createWindowHeader('profile-win', 'الملف الشخصي', 'fas fa-user text-osBlue');

    // 4. نافذة الإعدادات
    createWindowHeader('settings-win', 'الإعدادات للنظام', 'fas fa-gear text-gray-400');

    // 5. نافذة اتصل بنا
    createWindowHeader('contact-win', 'تواصل معنا', 'fas fa-envelope text-red-400');

    // 6. النوافذ الأخرى (البيان، حول النظام، والمفكرة)
    createWindowHeader('manifesto-win', 'بيان مبرمجي غزة', 'fas fa-scroll text-amber-500');
    createWindowHeader('about-win', 'حول نظام Gaza OS', 'fas fa-circle-info text-blue-400');
    createWindowHeader('notepad-win', 'المفكرة الرقمية', 'fas fa-file-lines text-emerald-400');

    // تفعيل خاصية السحب والتركيز من ملف windowManager
    if (typeof makeDraggable === 'function') {
        document.querySelectorAll('.window').forEach(win => {
            makeDraggable(win, '.window-header');
        });
    }
});