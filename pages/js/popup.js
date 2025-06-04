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
    }).catch(() => {
        showToast("Không thể sao chép liên kết.");
    });
}

document.querySelectorAll(".fa-bookmark").forEach(button => {
    button.addEventListener("click", function () {
        this.classList.toggle("fas"); // Đổi icon bookmark
        this.classList.toggle("far");

        if (this.classList.contains("far")) {
            showToast("Tài liệu đã được bỏ lưu.");

        } else {
            showToast("Tài liệu đã được lưu thành công!");
        }
    });
});

function handleDownload() {
    // Giả lập tải xuống
    showToast("Tải xuống đang bắt đầu...");
}

function handleBookmark() {
    showToast("Đã thêm vào mục đã lưu!");
}
