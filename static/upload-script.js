document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.querySelector('.file-input');
    const uploadBtn = document.querySelector('.upload-btn');
    const previewImage = document.querySelector('.preview-image');
    const messageDiv = document.querySelector('.message');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');

    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = 'rgba(52, 152, 219, 0.2)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.backgroundColor = '';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = '';
        fileInput.files = e.dataTransfer.files;
        updatePreview();
    });

    fileInput.addEventListener('change', updatePreview);

    function updatePreview() {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }

    uploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!fileInput.files[0]) {
            showMessage('لطفاً یک تصویر انتخاب کنید.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        progressBar.style.display = 'block';
        progress.style.width = '0%';

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('تصویر با موفقیت آپلود و تبدیل شد.', 'success');
            } else {
                showMessage('خطا در آپلود یا تبدیل تصویر.', 'error');
            }
        })
        .catch(error => {
            showMessage('خطا در ارتباط با سرور.', 'error');
        })
        .finally(() => {
            progressBar.style.display = 'none';
        });

        simulateProgress();
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
    }

    function simulateProgress() {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width += 5;
                progress.style.width = width + '%';
            }
        }, 100);
    }
});