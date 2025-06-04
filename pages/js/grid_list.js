

function setGridView() {

    const container = document.getElementById("docContainer");
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    showToast("Đã chuyển sang chế độ dạng lưới");

    document.getElementById('docContainer').className = 'doc-card-container grid-view';
    setActiveButton('gridBtn');
}

function setListView() {
    const container = document.getElementById("docContainer");
    container.classList.add("list-view");
    container.classList.remove("grid-view");
    showToast("Đã chuyển sang chế độ danh sách");


    document.getElementById('docContainer').className = 'doc-card-container list-view';
    setActiveButton('listBtn');
}

function setActiveButton(activeId) {
    document.getElementById('gridBtn').classList.remove('active');
    document.getElementById('listBtn').classList.remove('active');
    document.getElementById(activeId).classList.add('active');
}







//hiệu ứng khi chuyển giữa dạng lưới và danh sách 
const container = document.getElementById("docContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

function animateTransition(toView) {
    gsap.to(container, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            container.classList.toggle("grid-view", toView === "grid");
            container.classList.toggle("list-view", toView === "list");

            gsap.fromTo(container, { opacity: 0, y: 30 }, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    });
}

gridBtn.addEventListener("click", () => animateTransition("grid"));
listBtn.addEventListener("click", () => animateTransition("list"));

