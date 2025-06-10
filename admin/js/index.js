
document.addEventListener('DOMContentLoaded', function () {
    // Admin dropdown toggle
    const adminProfile = document.querySelector('.admin-profile');
    if (adminProfile) {
        adminProfile.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    // Task checkboxes
    const taskCheckboxes = document.querySelectorAll('.task-checkbox input');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const taskItem = this.closest('.task-item');
            if (this.checked) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }
        });
    });

    // Chart filter buttons
    const chartFilterBtns = document.querySelectorAll('.chart-filter-btn');
    chartFilterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            chartFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
