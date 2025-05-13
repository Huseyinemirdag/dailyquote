// DailyQuote - Favoriler JavaScript Dosyası

// DOM Elementleri
const favoritesContainer = document.getElementById('favorites-container');
const themeToggleBtn = document.getElementById('theme-toggle');
const toastContainer = document.getElementById('toast-container');

// Toast Bildirim Göster
function showToast(message, type = 'success') {
    // Yeni toast elementi oluştur
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Toast içeriği
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close">✕</button>
    `;
    
    // Toast'u konteynere ekle
    toastContainer.appendChild(toast);
    
    // Toast animasyonu ve otomatik kapanma
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
    
    // Kapatma butonuna tıklama olayı
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
}

// Favorileri Yükle ve Göster
function loadAndDisplayFavorites() {
    // localStorage'dan favorileri al
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Favoriler konteynerini temizle
    favoritesContainer.innerHTML = '';
    
    // Eğer favori yoksa mesaj göster
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p class="no-favorites">Henüz favori sözünüz bulunmuyor.</p>';
        return;
    }
    
    // Her favori söz için bir öğe oluştur
    favorites.forEach((quote, index) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.classList.add('favorite-item');
        
        favoriteItem.innerHTML = `
            <p class="favorite-quote">${quote.text}</p>
            <p class="favorite-author">${quote.author}</p>
            <button class="delete-btn" data-index="${index}">🗑️</button>
        `;
        
        favoritesContainer.appendChild(favoriteItem);
    });
    
    // Silme düğmelerine event listener ekle
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', removeFavorite);
    });
}

// Favoriyi Kaldır
function removeFavorite(event) {
    const index = parseInt(event.target.dataset.index);
    
    // localStorage'dan favorileri al
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Silinecek sözü kaydet
    const removedQuote = favorites[index];
    
    // İlgili favoriyi sil
    if (index >= 0 && index < favorites.length) {
        favorites.splice(index, 1);
        
        // Güncellenen favorileri localStorage'a kaydet
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        // Favorileri yeniden göster
        loadAndDisplayFavorites();
        
        // Bildirim göster
        showToast(`"${removedQuote.text.substring(0, 20)}..." silindi`, 'warning');
    }
}

// Temayı değiştir
function toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Tema değişikliğini uygula
    htmlElement.setAttribute('data-theme', newTheme);
    
    // Tema tercihini localStorage'a kaydet
    localStorage.setItem('theme', newTheme);
    
    // Buton ikonunu güncelle
    updateThemeIcon(newTheme);
}

// Tema ikonunu güncelle
function updateThemeIcon(theme) {
    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Kaydedilmiş tema tercihini yükle
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Event Listeners
themeToggleBtn.addEventListener('click', toggleTheme);

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    loadAndDisplayFavorites();
}); 