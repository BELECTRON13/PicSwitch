document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('convertedImage');
    const downloadBtn = document.getElementById('downloadBtn');

    image.addEventListener('load', function() {
        image.style.opacity = '1';
    });

    image.addEventListener('error', function() {
        image.src = '/static/error-image.png';
        image.alt = 'خطا در بارگذاری تصویر';
    });

    downloadBtn.addEventListener('click', function() {
        downloadBtn.textContent = 'در حال دانلود...';
        setTimeout(() => {
            downloadBtn.textContent = 'دانلود تصویر';
        }, 2000);
    });
});