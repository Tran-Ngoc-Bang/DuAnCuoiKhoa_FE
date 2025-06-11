// Dữ liệu mẫu
const documents = [
  {
    id: 1,
    title: "Giới thiệu về Trí tuệ nhân tạo",
    category: "AI",
    format: "PDF",
    price: 0,
    rating: 4.8,
    views: 105,
    downloads: 38,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Tài liệu tổng quan về trí tuệ nhân tạo, lịch sử phát triển và các ứng dụng thực tế.",
    isMine: true // Tài liệu do bạn đăng
  },
  {
    id: 2,
    title: "Bảo mật mạng nâng cao",
    category: "An ninh",
    format: "Word",
    price: 15000,
    rating: 4.5,
    views: 230,
    downloads: 120,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    description: "Phân tích các kỹ thuật bảo mật mạng và phòng chống tấn công phổ biến.",
    isMine: false
  },
  {
    id: 3,
    title: "Hướng dẫn lập trình Python",
    category: "CNTT",
    format: "PPT",
    price: 10000,
    rating: 4.9,
    views: 310,
    downloads: 200,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    description: "Slide bài giảng hướng dẫn từ cơ bản đến nâng cao về lập trình Python.",
    isMine: false
  },
  {
    id: 4,
    title: "Cơ sở dữ liệu quan hệ",
    category: "CNTT",
    format: "PDF",
    price: 5000,
    rating: 4.2,
    views: 80,
    downloads: 45,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    description: "Tài liệu về lý thuyết và thực hành cơ sở dữ liệu quan hệ.",
    isMine: true
  },
  {
    id: 5,
    title: "Nhập môn Machine Learning",
    category: "AI",
    format: "Word",
    price: 20000,
    rating: 4.7,
    views: 150,
    downloads: 60,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
    description: "Tài liệu nhập môn về các thuật toán học máy cơ bản.",
    isMine: false
  },
  {
    id: 6,
    title: "An toàn thông tin cho doanh nghiệp",
    category: "An ninh",
    format: "PDF",
    price: 0,
    rating: 4.3,
    views: 95,
    downloads: 30,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description: "Các giải pháp bảo mật thông tin dành cho doanh nghiệp vừa và nhỏ.",
    isMine: false
  },
  {
    id: 7,
    title: "Tài liệu hướng dẫn sử dụng Excel",
    category: "CNTT",
    format: "Word",
    price: 0,
    rating: 4.0,
    views: 60,
    downloads: 25,
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
    description: "Hướng dẫn chi tiết các thao tác cơ bản và nâng cao trong Excel.",
    isMine: true
  },
  
  {
    id: 9,
    title: "Phân tích dữ liệu với Excel",
    category: "CNTT",
    format: "Excel",
    price: 5000,
    rating: 4.4,
    views: 90,
    downloads: 33,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    description: "Các kỹ thuật phân tích dữ liệu cơ bản bằng Excel.",
    isMine: true
  },
  {
    id: 10,
    title: "Tổng quan về Blockchain",
    category: "CNTT",
    format: "PDF",
    price: 12000,
    rating: 4.6,
    views: 110,
    downloads: 40,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
    description: "Giới thiệu công nghệ Blockchain và các ứng dụng thực tiễn.",
    isMine: false
  }
];

// Danh sách id tài liệu bạn đã mua/tải xuống
const myDownloads = [2, 3, 5, 6, 10];

// Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Hiển thị thống kê
function updateStats() {
  // Số tài liệu đã đăng
  document.getElementById("statCreated").textContent = documents.filter(d => d.isMine).length;
  // Số tài liệu đã tải xuống (đã mua)
  document.getElementById("statDownloaded").textContent = myDownloads.length;
  // Tổng lượt xem của tài liệu đã đăng
  document.getElementById("statViews").textContent = documents.filter(d => d.isMine).reduce((sum, d) => sum + d.views, 0);
}

// Thêm biến phân trang
let currentPage = 1;
const pageSize = 4; // Số tài liệu mỗi trang

// Hiển thị danh sách tài liệu
function renderDocuments(tab = "created", page = 1) {
  const list = document.getElementById("docList");
  list.innerHTML = "";

  let filtered;
  if (tab === "created") {
    filtered = documents.filter(doc => doc.isMine);
  } else if (tab === "downloaded") {
    filtered = documents.filter(doc => myDownloads.includes(doc.id) && !doc.isMine);
  } else {
    filtered = [];
  }

  const search = document.getElementById("searchInput").value.toLowerCase();
  const cat = document.getElementById("filterCategory").value;
  const fmt = document.getElementById("filterFormat").value;
  const sort = document.getElementById("filterSort") ? document.getElementById("filterSort").value : "";

  filtered = filtered.filter(doc =>
    doc.title.toLowerCase().includes(search) &&
    (!cat || doc.category === cat) &&
    (!fmt || doc.format === fmt)
  );

  if (sort === "newest") filtered.sort((a, b) => b.id - a.id);
  if (sort === "popular") filtered.sort((a, b) => b.views - a.views);
  if (sort === "priceAsc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "priceDesc") filtered.sort((a, b) => b.price - a.price);

  // Phân trang
  const totalDocs = filtered.length;
  const totalPages = Math.ceil(totalDocs / pageSize);
  currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const docsToShow = filtered.slice(start, end);

  if (docsToShow.length === 0) {
    list.innerHTML = "<p>Không có tài liệu nào phù hợp.</p>";
  } else {
    docsToShow.forEach(doc => {
      const card = document.createElement("div");
      card.className = "doc-card";
      card.innerHTML = `
        <img src="${doc.image}" alt="${doc.title}" class="doc-img" style="width:100%; height:150px; object-fit:cover; border-radius:8px;" />
        <h3 class="doc-title">${doc.title}</h3>
        <p class="doc-meta">
          <span>Định dạng: ${doc.format}</span> | 
          <span>Danh mục: ${doc.category}</span> | 
          <span>Tác giả: ${doc.isMine ? "Bạn" : "Tác giả khác"}</span>
        </p>
      `;
      card.addEventListener("click", () => {
        openModal(doc.id);
        showToast("Đã mở: " + doc.title);
      });
      list.appendChild(card);
    });
  }

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  let pag = document.getElementById("pagination");
  if (!pag) {
    pag = document.createElement("div");
    pag.id = "pagination";
    pag.className = "pagination";
    document.getElementById("docList").after(pag);
  }
  pag.innerHTML = "";

  if (totalPages <= 1) {
    pag.style.display = "none";
    return;
  }
  pag.style.display = "flex";

  // Nút prev
  const prev = document.createElement("button");
  prev.textContent = "«";
  prev.disabled = currentPage === 1;
  prev.onclick = () => renderDocuments(currentTab, currentPage - 1);
  pag.appendChild(prev);

  // Số trang
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = (i === currentPage ? "active" : "");
      btn.onclick = () => renderDocuments(currentTab, i);
      pag.appendChild(btn);
    } else if (
      (i === currentPage - 2 && currentPage > 3) ||
      (i === currentPage + 2 && currentPage < totalPages - 2)
    ) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      pag.appendChild(dots);
    }
  }

  // Nút next
  const next = document.createElement("button");
  next.textContent = "»";
  next.disabled = currentPage === totalPages;
  next.onclick = () => renderDocuments(currentTab, currentPage + 1);
  pag.appendChild(next);
}

// Mở modal chi tiết
function openModal(id) {
  const doc = documents.find(d => d.id === id);
  if (!doc) return;

  document.getElementById("modalTitle").textContent = doc.title;
  document.getElementById("modalImg").src = doc.image;
  document.getElementById("modalCategory").textContent = "Danh mục: " + doc.category;
  document.getElementById("modalFormat").textContent = "Định dạng: " + doc.format;
  document.getElementById("modalPrice").textContent = "Giá: " + (doc.price === 0 ? "Miễn phí" : doc.price + "đ");
  document.getElementById("modalRating").textContent = "Đánh giá: " + doc.rating + " ★";
  document.getElementById("modalDesc").textContent = doc.description;

  const modal = document.getElementById("modal");
  modal.classList.add("show");

  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.onclick = () => {
      // Nếu chưa mua thì thêm vào myDownloads
      if (!myDownloads.includes(doc.id)) {
        myDownloads.push(doc.id);
        showToast("Tải xuống thành công: " + doc.title);
        updateStats();
        renderDocuments(currentTab);
      } else {
        showToast("Bạn đã tải tài liệu này rồi!");
      }
    };
  }
}

// Đóng modal
document.getElementById("modalClose").addEventListener("click", () => {
  document.getElementById("modal").classList.remove("show");
  showToast("Đã đóng chi tiết tài liệu");
});

// Các sự kiện tương tác
document.getElementById("tabCreated").addEventListener("click", () => {
  setActiveTab("created");
  showToast("Đang xem: Tài liệu đã đăng");
});
document.getElementById("tabDownloaded").addEventListener("click", () => {
  setActiveTab("downloaded");
  showToast("Đang xem: Tài liệu đã tải xuống");
});
document.getElementById("searchInput").addEventListener("input", () => {
  renderDocuments(currentTab, 1);
});
document.getElementById("filterCategory").addEventListener("change", () => {
  renderDocuments(currentTab, 1);
});
document.getElementById("filterFormat").addEventListener("change", () => {
  renderDocuments(currentTab, 1);
});
if (document.getElementById("filterSort")) {
  document.getElementById("filterSort").addEventListener("change", () => {
    renderDocuments(currentTab, 1);
  });
}

// Tab hiện tại
let currentTab = "created";
function setActiveTab(tab) {
  currentTab = tab;
  document.getElementById("tabCreated").classList.toggle("active", tab === "created");
  document.getElementById("tabDownloaded").classList.toggle("active", tab === "downloaded");
  renderDocuments(tab, 1);
}


const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Kiểm tra trạng thái dark mode từ localStorage
  if (localStorage.getItem('darkMode') === 'on') {
    body.classList.add('dark-mode');
  }

  darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    // Lưu trạng thái vào localStorage
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'on');
    } else {
      localStorage.setItem('darkMode', 'off');
    }
  });

  
// Khởi tạo ban đầu
updateStats();
renderDocuments();
