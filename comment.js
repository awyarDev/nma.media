document.addEventListener('DOMContentLoaded', function() {
    // Admin credentials
    const ADMIN_ACCOUNTS = {
        "awyar": "admin",
        "admin": "admin"
    };

    // Elements
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const loginUsername = document.getElementById('loginUsername');
    const loginPassword = document.getElementById('loginPassword');
    const commentsList = document.getElementById('commentsList');
    const exportBtn = document.getElementById('exportAllBtn');
    const passwordModal = document.getElementById('passwordModal');
    const adminPassword = document.getElementById('adminPassword');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    
    // Hide main content initially
    document.querySelector('.container').style.display = 'none';
    
    // Login handler
    loginBtn.addEventListener('click', function() {
        const username = loginUsername.value.trim();
        const password = loginPassword.value.trim();
        
        if (!username || !password) {
            showNotification('تکایە ناو و وشەی نهێنی پڕبکەرەوە', 'error');
            return;
        }
        
        if (ADMIN_ACCOUNTS[username] === password) {
            loginModal.style.display = 'none';
            document.querySelector('.container').style.display = 'block';
            showNotification('بە سەرکەوتوویی چوویتەژوورەوە', 'success');
            loadComments();
        } else {
            showNotification('ناوی بەکارهێنەر یان وشەی نهێنی هەڵەیە', 'error');
        }
    });
    
    // Rest of your existing code...
    let currentCommentIdToDelete = null;
    const ADMIN_PASSWORD = "admin";

    // Initialize
    loadComments();

    // Event Listeners
    exportBtn.addEventListener('click', exportComments);
    
    confirmDeleteBtn.addEventListener('click', function() {
        if (adminPassword.value === ADMIN_PASSWORD) {
            deleteComment(currentCommentIdToDelete);
            passwordModal.style.display = 'none';
            adminPassword.value = '';
        } else {
            showNotification('وشەی نهێنی هەڵەیە!', 'error');
        }
    });
    
    cancelDeleteBtn.addEventListener('click', function() {
        passwordModal.style.display = 'none';
        adminPassword.value = '';
        currentCommentIdToDelete = null;
    });

    // Main Functions
    function formatEnglishDate(dateString) {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "No Date";
            
            const pad = num => num.toString().padStart(2, '0');
            return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()} - ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        } catch {
            return "No Date";
        }
    }
    
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('podcastComments')) || [];
        commentsList.innerHTML = '';
        
        if (comments.length === 0) {
            commentsList.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; color: #666; padding: 30px;">
                        هیچ تێبینیەک تۆمارنەکراوە
                    </td>
                </tr>
            `;
            showNotification('هیچ تێبینیەک نییە بۆ پیشاندان', 'info');
            return;
        }
        
        comments.forEach(comment => {
            const commentRow = document.createElement('tr');
            commentRow.innerHTML = `
                <td class="comment-date">${formatEnglishDate(comment.date)}</td>
                <td class="comment-content">${comment.note.replace(/\n/g, '<br>')}</td>
                <td class="speaker-suggestion">${comment.speaker || '-'}</td>
                <td>
                    <button class="action-btn delete-btn" data-id="${comment.id}">
                        <i class="fas fa-trash"></i> سڕینەوە
                    </button>
                </td>
            `;
            commentsList.appendChild(commentRow);
        });
        
        // Add delete event listeners
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                currentCommentIdToDelete = this.getAttribute('data-id');
                passwordModal.style.display = 'flex';
            });
        });
    }
    
    function deleteComment(commentId) {
        let comments = JSON.parse(localStorage.getItem('podcastComments')) || [];
        comments = comments.filter(comment => comment.id != commentId);
        localStorage.setItem('podcastComments', JSON.stringify(comments));
        loadComments();
        showNotification('تێبینیەکە بە سەرکەوتوویی سڕایەوە');
    }
    
    function exportComments() {
        const comments = JSON.parse(localStorage.getItem('podcastComments')) || [];
        if (comments.length === 0) {
            showNotification('هیچ تێبینیەک نییە بۆ هەڵگرتن!', 'error');
            return;
        }
        
        let csvContent = "Date,Note,Speaker\n";
        comments.forEach(comment => {
            csvContent += `"${formatEnglishDate(comment.date)}","${comment.note.replace(/"/g, '""')}","${comment.speaker || ''}"\n`;
        });
        
        const blob = new Blob(["\uFEFF"+csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `nma_comments_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        showNotification('هەڵگرتن بە سەرکەوتوویی کۆتاییهات');
    }

    // Notification System
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${
                type === 'success' ? 'fa-check-circle' : 
                type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'
            }"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        notification.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
});




// Add this with your other element declarations
const logoutBtn = document.getElementById('logoutBtn');

// Add this event listener with your others
logoutBtn.addEventListener('click', logout);

// Add this function with your other functions
function logout() {
    localStorage.removeItem('adminAuthenticated');
    window.location.reload();
    
    // Optional: Clear any sensitive data
    // localStorage.removeItem('podcastComments');
}

// Modify your existing login check at the start
if (!localStorage.getItem('adminAuthenticated')) {
    document.querySelector('.container').style.display = 'none';
    loginModal.style.display = 'flex';
} else {
    loginModal.style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    loadComments();
}