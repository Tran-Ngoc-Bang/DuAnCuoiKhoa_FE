// Sample documents data
let documents = [
    {
        id: 1,
        title: "Giáo trình Lập trình Java cơ bản",
        description: "Tài liệu học lập trình Java từ cơ bản đến nâng cao, bao gồm cú pháp, OOP và các design patterns phổ biến.",
        fileName: "java-basic-tutorial.pdf",
        fileType: "pdf",
        fileSize: "15.2 MB",
        categoryId: 1,
        categoryName: "Công nghệ thông tin",
        status: "approved",
        author: {
            name: "Nguyễn Văn Đức",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
        },
        uploadDate: "2024-03-15",
        downloads: 1247,
        views: 3456,
        rating: 4.8,
        tags: ["Java", "Lập trình", "OOP", "Cơ bản"],
        approved: true
    },
    {
        id: 2,
        title: "Báo cáo phân tích thị trường tài chính 2024",
        description: "Phân tích chi tiết về xu hướng thị trường tài chính, cổ phiếu và tiền tệ trong năm 2024.",
        fileName: "market-analysis-2024.docx",
        fileType: "docx",
        fileSize: "8.7 MB",
        categoryId: 2,
        categoryName: "Kinh tế - Quản trị",
        status: "pending",
        author: {
            name: "Trần Thị Mai",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b73d91d8?w=150"
        },
        uploadDate: "2024-03-20",
        downloads: 0,
        views: 234,
        rating: 0,
        tags: ["Tài chính", "Thị trường", "Phân tích", "2024"],
        approved: false
    },
    {
        id: 3,
        title: "Bài giảng IELTS Writing Task 2",
        description: "Hướng dẫn chi tiết cách viết bài IELTS Writing Task 2, kèm theo 50+ bài mẫu band 7.0+",
        fileName: "ielts-writing-task2.pptx",
        fileType: "pptx",
        fileSize: "23.4 MB",
        categoryId: 3,
        categoryName: "Ngoại ngữ",
        status: "approved",
        author: {
            name: "Lê Minh Hải",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
        },
        uploadDate: "2024-03-18",
        downloads: 892,
        views: 2341,
        rating: 4.9,
        tags: ["IELTS", "Writing", "English", "Tiếng Anh"],
        approved: true
    },
    {
        id: 4,
        title: "Dữ liệu thống kê dân số Việt Nam",
        description: "Bảng thống kê chi tiết về dân số Việt Nam theo từng tỉnh thành, độ tuổi và giới tính.",
        fileName: "vietnam-population-stats.xlsx",
        fileType: "xlsx",
        fileSize: "12.1 MB",
        categoryId: 5,
        categoryName: "Khoa học xã hội",
        status: "approved",
        author: {
            name: "Phạm Văn Long",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
        },
        uploadDate: "2024-03-12",
        downloads: 567,
        views: 1234,
        rating: 4.6,
        tags: ["Thống kê", "Dân số", "Việt Nam", "Dữ liệu"],
        approved: true
    },
    {
        id: 5,
        title: "Giáo trình Toán cao cấp A1",
        description: "Tài liệu môn Toán cao cấp A1 dành cho sinh viên năm nhất các ngành kỹ thuật.",
        fileName: "calculus-a1.pdf",
        fileType: "pdf",
        fileSize: "28.9 MB",
        categoryId: 4,
        categoryName: "Khoa học tự nhiên",
        status: "rejected",
        author: {
            name: "Ngô Thị Lan",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
        },
        uploadDate: "2024-03-10",
        downloads: 0,
        views: 123,
        rating: 0,
        tags: ["Toán", "Cao cấp", "Kỹ thuật"],
        approved: false
    },
    {
        id: 6,
        title: "Hướng dẫn sử dụng React Hooks",
        description: "Tutorial chi tiết về React Hooks: useState, useEffect, useContext và custom hooks.",
        fileName: "react-hooks-guide.pdf",
        fileType: "pdf",
        fileSize: "11.5 MB",
        categoryId: 1,
        categoryName: "Công nghệ thông tin",
        status: "approved",
        author: {
            name: "Hoàng Văn Nam",
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150"
        },
        uploadDate: "2024-03-14",
        downloads: 743,
        views: 1876,
        rating: 4.7,
        tags: ["React", "Hooks", "JavaScript", "Frontend"],
        approved: true
    }
];

let filteredDocuments = [...documents];
let selectedDocuments = new Set();
let currentPage = 1;
let documentsPerPage = 6;

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
    renderDocuments();
    updateStatistics();
});

function setupEventListeners() {
    // Search and filters
    document.getElementById('searchInput').addEventListener('input', filterDocuments);
    document.getElementById('categoryFilter').addEventListener('change', filterDocuments);
    document.getElementById('statusFilter').addEventListener('change', filterDocuments);
    document.getElementById('typeFilter').addEventListener('change', filterDocuments);
    document.getElementById('sortFilter').addEventListener('change', filterDocuments);

    // Upload area
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');

    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    fileInput.addEventListener('change', handleFileSelect);

    // Close modals when clicking outside
    document.getElementById('uploadModal').addEventListener('click', function (e) {
        if (e.target === this) closeUploadModal();
    });

    document.getElementById('documentDetailModal').addEventListener('click', function (e) {
        if (e.target === this) closeDocumentDetailModal();
    });
}

function filterDocuments() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;

    filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm) ||
            doc.description.toLowerCase().includes(searchTerm) ||
            doc.author.name.toLowerCase().includes(searchTerm);

        const matchesCategory = categoryFilter === 'all' || doc.categoryId == categoryFilter;
        const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
        const matchesType = typeFilter === 'all' || doc.fileType === typeFilter;

        return matchesSearch && matchesCategory && matchesStatus && matchesType;
    });

    // Sort documents
    filteredDocuments.sort((a, b) => {
        switch (sortFilter) {
            case 'downloads':
                return b.downloads - a.downloads;
            case 'rating':
                return b.rating - a.rating;
            case 'size':
                return parseFloat(b.fileSize) - parseFloat(a.fileSize);
            case 'recent':
            default:
                return new Date(b.uploadDate) - new Date(a.uploadDate);
        }
    });

    currentPage = 1;
    renderDocuments();
    updatePagination();
}

function renderDocuments() {
    const container = document.getElementById('documentsGrid');
    const startIndex = (currentPage - 1) * documentsPerPage;
    const endIndex = startIndex + documentsPerPage;
    const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

    if (paginatedDocuments.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-alt"></i>
                <h3>Không tìm thấy tài liệu nào</h3>
                <p>Thử thay đổi bộ lọc hoặc tải lên tài liệu mới</p>
            </div>
        `;
        return;
    }

    container.innerHTML = paginatedDocuments.map(doc => `
        <div class="document-card ${selectedDocuments.has(doc.id) ? 'selected' : ''}" 
             data-document-id="${doc.id}" 
             style="--doc-status-color: ${getStatusColor(doc.status)}">
            <input type="checkbox" class="document-checkbox" 
                   ${selectedDocuments.has(doc.id) ? 'checked' : ''} 
                   onchange="toggleDocumentSelection(${doc.id})">
            
            <div class="document-header">
                <div class="document-icon ${doc.fileType}">
                    <i class="fas ${getFileIcon(doc.fileType)}"></i>
                </div>
                <div class="document-info">
                    <div class="document-title">${doc.title}</div>
                    <div class="document-meta">
                        <div class="document-meta-item">
                            <i class="fas fa-folder"></i>
                            <span>${doc.categoryName}</span>
                        </div>
                        <div class="document-meta-item">
                            <i class="fas fa-file"></i>
                            <span>${doc.fileSize}</span>
                        </div>
                        <div class="document-meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${formatDate(doc.uploadDate)}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="document-status ${doc.status}">
                <i class="fas ${getStatusIcon(doc.status)}"></i>
                ${getStatusLabel(doc.status)}
            </div>
            
            <div class="document-description">${doc.description}</div>
            
            <div class="document-tags">
                ${doc.tags.map(tag => `<span class="document-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="document-author">
                <img src="${doc.author.avatar}" alt="${doc.author.name}" class="document-author-avatar">
                <div class="document-author-info">
                    <div class="document-author-name">${doc.author.name}</div>
                    <div class="document-upload-date">Tải lên ${formatDate(doc.uploadDate)}</div>
                </div>
            </div>
            
            <div class="document-stats">
                <div class="document-stat">
                    <div class="document-stat-number">${doc.downloads}</div>
                    <div class="document-stat-label">Lượt tải</div>
                </div>
                <div class="document-stat">
                    <div class="document-stat-number">${doc.views}</div>
                    <div class="document-stat-label">Lượt xem</div>
                </div>
                <div class="document-stat">
                    <div class="document-stat-number">${doc.rating || 'N/A'}</div>
                    <div class="document-stat-label">Đánh giá</div>
                </div>
            </div>
            
            <div class="document-actions">
                <button class="document-action-btn view" onclick="viewDocument(${doc.id})">
                    <i class="fas fa-eye"></i> Xem
                </button>
                <button class="document-action-btn download" onclick="downloadDocument(${doc.id})">
                    <i class="fas fa-download"></i> Tải
                </button>
                <button class="document-action-btn edit" onclick="editDocument(${doc.id})">
                    <i class="fas fa-edit"></i> Sửa
                </button>
                <button class="document-action-btn delete" onclick="deleteDocument(${doc.id})">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </div>
        </div>
    `).join('');

    updateBulkActions();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;

    const firstBtn = document.querySelector('.pagination-btn:first-child');
    const prevBtn = document.querySelector('.pagination-btn:nth-child(2)');
    const nextBtn = document.querySelector('.pagination-btn:nth-child(4)');
    const lastBtn = document.querySelector('.pagination-btn:last-child');

    firstBtn.disabled = currentPage === 1;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    lastBtn.disabled = currentPage === totalPages;
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);
    if (page === 1) {
        currentPage = 1;
    } else if (page === 'last') {
        currentPage = totalPages;
    } else {
        currentPage = Math.max(1, Math.min(page, totalPages));
    }
    renderDocuments();
    updatePagination();
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderDocuments();
        updatePagination();
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderDocuments();
        updatePagination();
    }
}

function toggleDocumentSelection(docId) {
    if (selectedDocuments.has(docId)) {
        selectedDocuments.delete(docId);
    } else {
        selectedDocuments.add(docId);
    }
    renderDocuments();
    updateBulkActions();
}

function updateBulkActions() {
    const bulkActions = document.getElementById('bulkActions');
    const selectedCount = document.getElementById('selectedCount');

    if (selectedDocuments.size > 0) {
        bulkActions.style.display = 'block';
        selectedCount.textContent = selectedDocuments.size;
    } else {
        bulkActions.style.display = 'none';
    }
}

function updateStatistics() {
    document.getElementById('totalDocuments').textContent = documents.length.toLocaleString();
    document.getElementById('pendingDocuments').textContent = documents.filter(d => d.status === 'pending').length;

    const totalDownloads = documents.reduce((sum, d) => sum + d.downloads, 0);
    document.getElementById('totalDownloads').textContent = totalDownloads.toLocaleString();
}

function getStatusColor(status) {
    const colors = {
        'approved': 'linear-gradient(90deg, #10b981, #059669)',
        'pending': 'linear-gradient(90deg, #f59e0b, #d97706)',
        'rejected': 'linear-gradient(90deg, #ef4444, #dc2626)'
    };
    return colors[status] || 'linear-gradient(90deg, var(--primary), var(--secondary))';
}

function getFileIcon(fileType) {
    const icons = {
        'pdf': 'fa-file-pdf',
        'docx': 'fa-file-word',
        'pptx': 'fa-file-powerpoint',
        'xlsx': 'fa-file-excel'
    };
    return icons[fileType] || 'fa-file';
}

function getStatusIcon(status) {
    const icons = {
        'approved': 'fa-check-circle',
        'pending': 'fa-clock',
        'rejected': 'fa-times-circle'
    };
    return icons[status] || 'fa-question-circle';
}

function getStatusLabel(status) {
    const labels = {
        'approved': 'Đã duyệt',
        'pending': 'Chờ duyệt',
        'rejected': 'Từ chối'
    };
    return labels[status] || 'Không xác định';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

function formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

// Upload functionality
function openUploadModal() {
    document.getElementById('uploadModal').style.display = 'flex';
}

function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
    document.getElementById('uploadForm').reset();
    document.getElementById('fileList').style.display = 'none';
    document.getElementById('fileList').innerHTML = '';
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const files = e.dataTransfer.files;
    handleFiles(files);
}

function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    const fileList = document.getElementById('fileList');
    fileList.style.display = 'block';
    fileList.innerHTML = '';

    Array.from(files).forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-icon ${getFileTypeFromName(file.name)}">
                    <i class="fas ${getFileIcon(getFileTypeFromName(file.name))}"></i>
                </div>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${formatFileSize(file.size)}</div>
                </div>
            </div>
            <button class="file-remove" onclick="removeFile(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        fileList.appendChild(fileItem);
    });
}

function getFileTypeFromName(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    const typeMap = {
        'pdf': 'pdf',
        'doc': 'docx', 'docx': 'docx',
        'ppt': 'pptx', 'pptx': 'pptx',
        'xls': 'xlsx', 'xlsx': 'xlsx'
    };
    return typeMap[extension] || 'unknown';
}

function removeFile(index) {
    const fileList = document.getElementById('fileList');
    const fileItems = fileList.children;
    if (fileItems[index]) {
        fileItems[index].remove();
    }
    if (fileList.children.length === 0) {
        fileList.style.display = 'none';
    }
}

function uploadDocument() {
    const title = document.getElementById('docTitle').value.trim();
    const category = document.getElementById('docCategory').value;
    const description = document.getElementById('docDescription').value.trim();
    const tags = document.getElementById('docTags').value.trim();

    if (!title || !category) {
        showToast('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
        return;
    }

    const fileList = document.getElementById('fileList');
    if (fileList.children.length === 0) {
        showToast('Vui lòng chọn tệp để tải lên', 'error');
        return;
    }

    // Simulate upload
    showToast('Đang tải lên tài liệu...', 'info');

    setTimeout(() => {
        const newDoc = {
            id: Math.max(...documents.map(d => d.id)) + 1,
            title,
            description,
            fileName: 'new-document.pdf',
            fileType: 'pdf',
            fileSize: '10.5 MB',
            categoryId: parseInt(category),
            categoryName: getCategoryName(category),
            status: 'pending',
            author: {
                name: 'Người dùng mới',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
            },
            uploadDate: new Date().toISOString().split('T')[0],
            downloads: 0,
            views: 0,
            rating: 0,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            approved: false
        };

        documents.unshift(newDoc);
        filterDocuments();
        updateStatistics();
        closeUploadModal();
        showToast('Đã tải lên tài liệu thành công!', 'success');
    }, 2000);
}

function getCategoryName(categoryId) {
    const categories = {
        '1': 'Công nghệ thông tin',
        '2': 'Kinh tế - Quản trị',
        '3': 'Ngoại ngữ',
        '4': 'Khoa học tự nhiên',
        '5': 'Khoa học xã hội'
    };
    return categories[categoryId] || 'Không xác định';
}

function viewDocument(docId) {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;

    document.getElementById('documentDetailContent').innerHTML = `
        <div class="document-preview">
            <div class="document-icon ${doc.fileType}" style="width: 80px; height: 80px; font-size: 2rem; margin: 0 auto 1rem;">
                <i class="fas ${getFileIcon(doc.fileType)}"></i>
            </div>
            <h3>${doc.title}</h3>
            <p>${doc.fileName}</p>
            <div class="document-actions" style="margin-top: 2rem;">
                <button class="document-action-btn download" onclick="downloadDocument(${doc.id})" style="flex: none; padding: 1rem 2rem;">
                    <i class="fas fa-download"></i> Tải xuống
                </button>
            </div>
        </div>
        
        <div class="document-detail-info">
            <div class="document-detail-section">
                <h4>Thông tin cơ bản</h4>
                <div class="document-detail-grid">
                    <div class="document-detail-field">
                        <label>Danh mục</label>
                        <span>${doc.categoryName}</span>
                    </div>
                    <div class="document-detail-field">
                        <label>Định dạng</label>
                        <span>${doc.fileType.toUpperCase()}</span>
                    </div>
                    <div class="document-detail-field">
                        <label>Kích thước</label>
                        <span>${doc.fileSize}</span>
                    </div>
                    <div class="document-detail-field">
                        <label>Trạng thái</label>
                        <span>${getStatusLabel(doc.status)}</span>
                    </div>
                </div>
            </div>
            
            <div class="document-detail-section">
                <h4>Thống kê</h4>
                <div class="document-detail-grid">
                    <div class="document-detail-field">
                        <label>Lượt tải</label>
                        <span>${doc.downloads.toLocaleString()}</span>
                    </div>
                    <div class="document-detail-field">
                        <label>Lượt xem</label>
                        <span>${doc.views.toLocaleString()}</span>
                    </div>
                    <div class="document-detail-field">
                        <label>Đánh giá</label>
                        <span>${doc.rating || 'Chưa có'}</span>
                    </div>
                    <div class="document-detail-field">
                        <label>Ngày tải lên</label>
                        <span>${formatDate(doc.uploadDate)}</span>
                    </div>
                </div>
            </div>
            
            <div class="document-detail-section">
                <h4>Tác giả</h4>
                <div class="document-author">
                    <img src="${doc.author.avatar}" alt="${doc.author.name}" class="document-author-avatar">
                    <div class="document-author-info">
                        <div class="document-author-name">${doc.author.name}</div>
                        <div class="document-upload-date">Tải lên ${formatDate(doc.uploadDate)}</div>
                    </div>
                </div>
            </div>
            
            <div class="document-detail-section">
                <h4>Mô tả</h4>
                <p>${doc.description}</p>
            </div>
            
            <div class="document-detail-section">
                <h4>Tags</h4>
                <div class="document-tags">
                    ${doc.tags.map(tag => `<span class="document-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    document.getElementById('documentDetailModal').style.display = 'flex';
}

function closeDocumentDetailModal() {
    document.getElementById('documentDetailModal').style.display = 'none';
}

function downloadDocument(docId) {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
        showToast(`Đang tải xuống "${doc.title}"...`, 'info');
    }
}

function editDocument(docId) {
    showToast('Chức năng chỉnh sửa đang được phát triển', 'info');
}

function deleteDocument(docId) {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;

    if (confirm(`Bạn có chắc chắn muốn xóa tài liệu "${doc.title}"?`)) {
        documents = documents.filter(d => d.id !== docId);
        selectedDocuments.delete(docId);
        filterDocuments();
        updateStatistics();
        showToast('Đã xóa tài liệu thành công!', 'success');
    }
}

function bulkApprove() {
    if (selectedDocuments.size === 0) return;

    documents.forEach(doc => {
        if (selectedDocuments.has(doc.id)) {
            doc.status = 'approved';
        }
    });

    selectedDocuments.clear();
    filterDocuments();
    updateStatistics();
    showToast(`Đã duyệt ${selectedDocuments.size} tài liệu thành công!`, 'success');
}

function bulkReject() {
    if (selectedDocuments.size === 0) return;

    documents.forEach(doc => {
        if (selectedDocuments.has(doc.id)) {
            doc.status = 'rejected';
        }
    });

    selectedDocuments.clear();
    filterDocuments();
    updateStatistics();
    showToast(`Đã từ chối ${selectedDocuments.size} tài liệu!`, 'warning');
}

function bulkDownload() {
    if (selectedDocuments.size === 0) return;
    showToast(`Đang tải xuống ${selectedDocuments.size} tài liệu...`, 'info');
}

function bulkDelete() {
    if (selectedDocuments.size === 0) return;

    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedDocuments.size} tài liệu đã chọn?`)) {
        documents = documents.filter(doc => !selectedDocuments.has(doc.id));
        selectedDocuments.clear();
        filterDocuments();
        updateStatistics();
        showToast('Đã xóa các tài liệu được chọn!', 'success');
    }
}

function exportDocuments() {
    showToast('Đang xuất dữ liệu tất cả tài liệu...', 'info');
    setTimeout(() => {
        showToast('Đã xuất dữ liệu thành công!', 'success');
    }, 2000);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const iconMap = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle'
    };

    toast.innerHTML = `
        <i class="${iconMap[type] || iconMap.info}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: auto;">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.getElementById('toastContainer').appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}
