
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("docContainer");
    const toast = document.getElementById("sort-toast");
    const originalItems = Array.from(container.children);
    const labelMap = {
        "default": "Mặc định",
        "price-asc": "Giá tăng dần",
        "price-desc": "Giá giảm dần",
        "rating-desc": "Đánh giá cao"
    };

    const showToast = (message) => {
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
    };

    const applyTransition = (newItems) => {
        const fadeDuration = 400;

        // Ẩn tất cả item cũ
        [...container.children].forEach(el => el.classList.add("fade-out"));

        setTimeout(() => {
            // Xóa và hiển thị lại item mới với hiệu ứng mờ dần vào

            newItems.forEach(el => {
                el.classList.remove("fade-out");
                el.classList.add("fade-in");
                container.appendChild(el);
            });

            // Sau khi hoàn tất hiệu ứng, xóa class để tránh ảnh hưởng hover
            setTimeout(() => {
                newItems.forEach(el => el.classList.remove("fade-in"));
            }, fadeDuration);
        }, fadeDuration);
    };


    document.querySelectorAll('input[name="sort"]').forEach(input => {
        input.addEventListener("change", () => {
            const value = input.value;
            let sorted = [...originalItems];

            if (value === "price-asc") {
                sorted.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
            } else if (value === "price-desc") {
                sorted.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
            } else if (value === "rating-desc") {
                sorted.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
            }

            applyTransition(sorted);
            showToast(`Sắp xếp: ${labelMap[value]}`);
        });
    });
});
