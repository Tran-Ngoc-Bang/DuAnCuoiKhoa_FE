//Thông báo hiển thị Popup
function showToast(message) {
    const toast = document.getElementById("docToast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}
function handleShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showToast("Liên kết đã được sao chép!");
        logActivity("Chia sẻ tài liệu (copy liên kết)");
    }).catch(() => {
        showToast("Không thể sao chép liên kết.");
    });
}


function logActivity(action) {
    const activityLog = localStorage.getItem("activityLog") ? JSON.parse(localStorage.getItem("activityLog")) : [];
    const timestamp = new Date().toLocaleString();

    activityLog.unshift({
        time: timestamp,
        action: action
    });

    // Lưu lại chỉ 50 hoạt động gần nhất
    if (activityLog.length > 50) activityLog.pop();

    localStorage.setItem("activityLog", JSON.stringify(activityLog));
}



document.querySelectorAll(".fa-bookmark").forEach(button => {
    button.addEventListener("click", function () {
        this.classList.toggle("fas"); // Đổi icon bookmark
        this.classList.toggle("far");

        if (this.classList.contains("far")) {
            showToast("Tài liệu đã được bỏ lưu.");
            logActivity("Bỏ lưu tài liệu");

        } else {
            showToast("Tài liệu đã được lưu thành công!");
            logActivity("Lưu tài liệu");
        }
    });
});

function handleDownload() {
    // Giả lập tải xuống
    showToast("Tải xuống đang bắt đầu...");
    logActivity("Tải xuống tài liệu");
}

function handleBookmark() {
    showToast("Đã thêm vào mục đã lưu!");
}


















function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notif = document.createElement('div');
    notif.classList.add('notification', type);
    notif.textContent = message;

    // Click để tắt
    notif.addEventListener('click', () => {
        hideNotification(notif);
    });

    container.appendChild(notif);

    // Tự động ẩn sau 4 giây
    setTimeout(() => {
        hideNotification(notif);
    }, 4000);
}

function hideNotification(element) {
    element.style.animation = 'slideOut 0.3s forwards';
    element.addEventListener('animationend', () => {
        element.remove();
    });
}













// Hàm hiển thị popup thông báo góc dưới phải
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notif = document.createElement('div');
    notif.classList.add('notification', type);
    notif.textContent = message;

    // Click để tắt nhanh
    notif.addEventListener('click', () => {
        hideNotification(notif);
    });

    container.appendChild(notif);

    // Tự động tắt sau 4 giây
    setTimeout(() => {
        hideNotification(notif);
    }, 4000);
}

function hideNotification(element) {
    element.style.animation = 'slideOut 0.3s forwards';
    element.addEventListener('animationend', () => {
        element.remove();
    });
}

// Thêm CSS popup (nên chèn vào <style> hoặc file CSS của bạn)
const style = document.createElement('style');
style.textContent = `
        #notification-container {
            position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 300px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

        .notification {
            background - color: #323232;
        color: white;
        padding: 12px 18px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.3);
        opacity: 0;
        transform: translateX(100%);
        animation: slideIn 0.3s forwards;
        cursor: pointer;
        user-select: none;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 10px;
  }

        .notification.success {
            background - color: #4CAF50;
  }

        .notification.error {
            background - color: #F44336;
  }

        .notification.info {
            background - color: #2196F3;
  }

        @keyframes slideIn {
            to {
            opacity: 1;
        transform: translateX(0);
    }
  }

        @keyframes slideOut {
            to {
            opacity: 0;
        transform: translateX(100%);
    }
  }

        /* Style thanh đo mật khẩu */
        #passwordStrengthWrapper {
            width: 250px;
        margin-top: 6px;
  }

        #passwordStrengthBar {
            height: 8px;
        background-color: #ccc;
        border-radius: 4px;
        overflow: hidden;
  }

        #passwordStrengthFill {
            height: 100%;
        width: 0%;
        background-color: red;
        transition: width 0.3s ease;
  }
        `;
document.head.appendChild(style);

// ---- Mã xử lý độ mạnh mật khẩu với thanh ngang ----

const newPasswordInput = document.getElementById('newPassword');
const passwordStrengthFill = document.createElement('div');
passwordStrengthFill.id = 'passwordStrengthFill';

// Tạo wrapper và thanh đo độ mạnh để chèn vào DOM thay cho passwordStrength hiện tại
const passwordStrengthDiv = document.getElementById('passwordStrength');
const passwordStrengthWrapper = document.createElement('div');
passwordStrengthWrapper.id = 'passwordStrengthWrapper';

const passwordStrengthBar = document.createElement('div');
passwordStrengthBar.id = 'passwordStrengthBar';
passwordStrengthBar.appendChild(passwordStrengthFill);

const passwordStrengthText = document.createElement('div');
passwordStrengthText.id = 'passwordStrengthText';
passwordStrengthText.style.marginTop = '4px';
passwordStrengthText.style.fontSize = '0.85rem';
passwordStrengthText.style.color = '#666';
passwordStrengthText.textContent = '';

passwordStrengthWrapper.appendChild(passwordStrengthBar);
passwordStrengthWrapper.appendChild(passwordStrengthText);

// Thay thế div passwordStrength cũ bằng wrapper mới
passwordStrengthDiv.replaceWith(passwordStrengthWrapper);

newPasswordInput.addEventListener('input', () => {
    const val = newPasswordInput.value;
    let strengthPercent = 0;
    let strengthText = '';
    let strengthColor = 'red';

    if (val.length === 0) {
        strengthPercent = 0;
        strengthText = '';
    } else if (val.length < 6) {
        strengthPercent = 30;
        strengthText = 'Yếu';
        strengthColor = '#F44336'; // đỏ
    } else if (val.length >= 6 && (/[A-Z]/.test(val) || /[0-9]/.test(val))) {
        strengthPercent = 60;
        strengthText = 'Trung bình';
        strengthColor = '#FF9800'; // cam
    }

    if (
        val.length >= 8 &&
        /[A-Z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[\W]/.test(val)
    ) {
        strengthPercent = 100;
        strengthText = 'Mạnh';
        strengthColor = '#4CAF50'; // xanh lá
    }

    passwordStrengthFill.style.width = strengthPercent + '%';
    passwordStrengthFill.style.backgroundColor = strengthColor;
    passwordStrengthText.textContent = strengthText;
    passwordStrengthText.style.color = strengthColor;
});

// ---- Kiểm tra xác nhận mật khẩu ----
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordMatchStatusDiv = document.getElementById('passwordMatchStatus');

function checkPasswordMatch() {
    const newPass = newPasswordInput.value;
    const confirmPass = confirmPasswordInput.value;
    if (!confirmPass) {
        passwordMatchStatusDiv.textContent = '';
        return;
    }
    if (newPass === confirmPass) {
        passwordMatchStatusDiv.textContent = 'Mật khẩu khớp';
        passwordMatchStatusDiv.style.color = 'green';
    } else {
        passwordMatchStatusDiv.textContent = 'Mật khẩu không khớp';
        passwordMatchStatusDiv.style.color = 'red';
    }
}

confirmPasswordInput.addEventListener('input', checkPasswordMatch);
newPasswordInput.addEventListener('input', checkPasswordMatch);

// ---- Đổi mật khẩu ----
const changePasswordBtn = document.querySelector('.sec-section button.sec-button');
changePasswordBtn.addEventListener('click', () => {
    const oldPassInput = document.querySelector('.sec-section input[type="password"]:first-of-type');
    const oldPass = oldPassInput.value;
    const newPass = newPasswordInput.value;
    const confirmPass = confirmPasswordInput.value;

    if (!oldPass || !newPass || !confirmPass) {
        showNotification('Vui lòng điền đầy đủ các trường.', 'error');
        return;
    }
    if (newPass !== confirmPass) {
        showNotification('Mật khẩu mới và xác nhận mật khẩu không khớp.', 'error');
        return;
    }
    if (passwordStrengthText.textContent === 'Yếu' || passwordStrengthText.textContent === '') {
        showNotification('Mật khẩu mới quá yếu.', 'error');
        return;
    }

    // Giả lập thành công
    showNotification('Đổi mật khẩu thành công!', 'success');
    addActivityLog('Bạn đã đổi mật khẩu.');
    // Có thể reset form hoặc làm gì đó thêm
});

// ---- Kiểm tra định dạng email ----
const newEmailInput = document.getElementById('newEmail');
const emailStatusDiv = document.getElementById('emailStatus');

newEmailInput.addEventListener('input', () => {
    const email = newEmailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        emailStatusDiv.textContent = '';
        return;
    }
    if (emailRegex.test(email)) {
        emailStatusDiv.textContent = 'Email hợp lệ';
        emailStatusDiv.style.color = 'green';
    } else {
        emailStatusDiv.textContent = 'Email không hợp lệ';
        emailStatusDiv.style.color = 'red';
    }
});

// ---- Đổi email ----
// Lưu ý bạn có 2 phần dashboard-section, button thứ 2 là đổi email
const changeEmailBtn = document.querySelectorAll('.dashboard-section .sec-section button.sec-button')[1];
changeEmailBtn.addEventListener('click', () => {
    const oldEmailInput = document.querySelector('.dashboard-section input[type="email"]:first-of-type');
    const oldEmail = oldEmailInput.value;
    const newEmail = newEmailInput.value;

    if (!newEmail) {
        showNotification('Vui lòng nhập email mới.', 'error');
        return;
    }

    if (emailStatusDiv.textContent !== 'Email hợp lệ') {
        showNotification('Email mới không hợp lệ.', 'error');
        return;
    }

    if (oldEmail === newEmail) {
        showNotification('Email mới phải khác email hiện tại.', 'error');
        return;
    }

    showNotification('Đổi email thành công!', 'success');
    addActivityLog('Bạn đã đổi địa chỉ email.');
});

// ---- Xác thực hai bước ----
const twofaToggle = document.getElementById('twofaToggle');
const twofaStatusDiv = document.getElementById('twofaStatus');

twofaToggle.addEventListener('change', () => {
    if (twofaToggle.checked) {
        twofaStatusDiv.textContent = 'Xác thực hai bước đã được bật.';
        twofaStatusDiv.style.color = 'green';

        showNotification('Xác thực hai bước đã được bật.', 'success');
        addActivityLog('Bạn đã bật xác thực hai bước.');
    } else {
        twofaStatusDiv.textContent = 'Xác thực hai bước đã được tắt.';
        twofaStatusDiv.style.color = 'gray';

        showNotification('Xác thực hai bước đã được tắt.', 'info');
        addActivityLog('Bạn đã tắt xác thực hai bước.');
    }
});
