
document.addEventListener('DOMContentLoaded', function () {
    // Admin dropdown toggle
    const adminProfile = document.querySelector('.admin-profile');
    if (adminProfile) {
        adminProfile.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    // View toggle (grid/table)
    const viewOptions = document.querySelectorAll('.view-option');
    const gridView = document.getElementById('gridView');
    const tableView = document.getElementById('tableView');

    viewOptions.forEach(option => {
        option.addEventListener('click', function () {
            viewOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            const viewType = this.getAttribute('data-view');
            if (viewType === 'grid') {
                gridView.style.display = 'block';
                tableView.style.display = 'none';
            } else {
                gridView.style.display = 'none';
                tableView.style.display = 'block';
            }
        });
    });

    // Select all checkboxes
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.checkbox-wrapper input[type="checkbox"]:not(#selectAll)');

    if (selectAll) {
        selectAll.addEventListener('change', function () {
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                const allChecked = [...checkboxes].every(c => c.checked);
                const someChecked = [...checkboxes].some(c => c.checked);

                selectAll.checked = allChecked;
                selectAll.indeterminate = someChecked && !allChecked;
            });
        });
    }

    // Modal functionality
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const addCategoryModal = document.getElementById('addCategoryModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCloseBtn = document.querySelector('.modal-close');
    const cancelBtn = document.querySelector('.cancel-btn');

    function openModal() {
        if (addCategoryModal) {
            addCategoryModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (addCategoryModal) {
            addCategoryModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', openModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    // Icon selection
    const iconItems = document.querySelectorAll('.icon-item');
    const selectedIcon = document.querySelector('.selected-icon i');

    iconItems.forEach(item => {
        item.addEventListener('click', function () {
            iconItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');

            const iconClass = this.querySelector('i').className;
            if (selectedIcon) {
                selectedIcon.className = iconClass;
            }
        });
    });

    // Color picker
    const colorPicker = document.getElementById('categoryColor');
    const colorPreview = document.querySelector('.color-preview');
    const colorValue = document.querySelector('.color-value');

    if (colorPicker && colorPreview && colorValue) {
        colorPicker.addEventListener('input', function () {
            const selectedColor = this.value;
            colorPreview.style.backgroundColor = selectedColor;
            colorValue.textContent = selectedColor;
        });
    }

    // Pagination
    const pageButtons = document.querySelectorAll('.page-btn');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');

    pageButtons.forEach(button => {
        button.addEventListener('click', function () {
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update prev/next button states
            if (this.textContent === '1') {
                prevButton.disabled = true;
            } else {
                prevButton.disabled = false;
            }

            if (this.textContent === '5') {
                nextButton.disabled = true;
            } else {
                nextButton.disabled = false;
            }
        });
    });
});