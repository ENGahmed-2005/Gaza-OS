
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('os-theme', theme);

    const root = document.documentElement;

    if (theme === 'dark') {
        root.style.setProperty('--win-bg', '#0f0f1a');
        root.style.setProperty('--win-text', '#ffffff');
        root.style.setProperty('--win-header-bg', '#1a1a2e');
        root.style.setProperty('--win-border', '#1f2937');
        root.style.setProperty('--win-body-bg', '#0f0f1a');
        root.style.setProperty('--win-item-bg', '#1a1a2e');
        root.style.setProperty('--win-item-border', '#1f2937');
        root.style.setProperty('--win-item-hover-border', '#00a8ff');
        root.style.setProperty('--win-input-bg', '#1a1a2e');
        root.style.setProperty('--win-input-border', '#374151');
        root.style.setProperty('--start-menu-bg', '#0f0f1a');
        root.style.setProperty('--start-menu-text', '#ffffff');
        root.style.setProperty('--start-menu-border', '#1f2937');
        root.style.setProperty('--taskbar-bg', 'rgba(15, 15, 26, 0.9)');
        root.style.setProperty('--taskbar-border', '#1f2937');
        root.style.setProperty('--taskbar-item-bg', '#1a1a2e');
        root.style.setProperty('--taskbar-item-border', '#374151');
    } else {
        root.style.setProperty('--win-bg', '#ffffff');
        root.style.setProperty('--win-text', '#111827');
        root.style.setProperty('--win-header-bg', '#f3f4f6');
        root.style.setProperty('--win-border', '#e5e7eb');
        root.style.setProperty('--win-body-bg', '#f9fafb');
        root.style.setProperty('--win-item-bg', '#f3f4f6');
        root.style.setProperty('--win-item-border', '#e5e7eb');
        root.style.setProperty('--win-item-hover-border', '#00a8ff');
        root.style.setProperty('--win-input-bg', '#ffffff');
        root.style.setProperty('--win-input-border', '#d1d5db');
        root.style.setProperty('--start-menu-bg', '#ffffff');
        root.style.setProperty('--start-menu-text', '#111827');
        root.style.setProperty('--start-menu-border', '#e5e7eb');
        root.style.setProperty('--taskbar-bg', 'rgba(255, 255, 255, 0.9)');
        root.style.setProperty('--taskbar-border', '#e5e7eb');
        root.style.setProperty('--taskbar-item-bg', '#f3f4f6');
        root.style.setProperty('--taskbar-item-border', '#d1d5db');
    }
}

// تشغيل الثيم المحفوظ تلقائياً فور تحميل الملف
setTheme(localStorage.getItem('os-theme') || 'dark');