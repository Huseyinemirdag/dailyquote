// DailyQuote - Ana JavaScript Dosyası

// DOM Elementleri
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote');
const addFavoriteBtn = document.getElementById('add-favorite');
const themeToggleBtn = document.getElementById('theme-toggle');
const toastContainer = document.getElementById('toast-container');

// Geçerli söz
let currentQuote = null;
// Tüm sözler
let quotes = [];

// Sözleri JSON dosyasından yükle
async function loadQuotes() {
    try {
        const response = await fetch('data/quotes.json');
        if (!response.ok) {
            throw new Error('Sözler yüklenemedi.');
        }
        quotes = await response.json();
        // İlk söz gösterimi
        displayRandomQuote();
    } catch (error) {
        console.error('Sözler yüklenirken hata oluştu:', error);
        quoteText.textContent = 'Sözler yüklenemedi. Lütfen daha sonra tekrar deneyin.';
        quoteAuthor.textContent = '';
    }
}

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
    
    // Kapatma butonuna tıklama olayı
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    // Otomatik kapanma için timeout
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Rastgele söz göster
function displayRandomQuote() {
    if (quotes.length === 0) {
        quoteText.textContent = 'Sözler yüklenemedi. Lütfen daha sonra tekrar deneyin.';
        quoteAuthor.textContent = '';
        return;
    }
    
    // Animasyonla söz değiştirme
    quoteText.style.opacity = 0;
    quoteAuthor.style.opacity = 0;
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        currentQuote = quotes[randomIndex];
        
        quoteText.textContent = currentQuote.text;
        quoteAuthor.textContent = currentQuote.author;
        
        // Animasyonla gösterme
        quoteText.style.opacity = 1;
        quoteAuthor.style.opacity = 1;
    }, 300);
}

// Favorilere ekle
function addToFavorites() {
    if (!currentQuote) return;
    
    // localStorage'dan mevcut favorileri al
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Eğer bu söz zaten favorilerde yoksa ekle
    const isAlreadyFavorite = favorites.some(quote => 
        quote.text === currentQuote.text && quote.author === currentQuote.author
    );
    
    if (!isAlreadyFavorite) {
        favorites.push(currentQuote);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showToast('Söz favorilerinize eklendi!', 'success');
    } else {
        showToast('Bu söz zaten favorilerinizde!', 'warning');
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

// CSS Geçiş Animasyonları
function addTransitionStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .quote-text, .author {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Event Listeners
newQuoteBtn.addEventListener('click', displayRandomQuote);
addFavoriteBtn.addEventListener('click', addToFavorites);
themeToggleBtn.addEventListener('click', toggleTheme);

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    addTransitionStyles();
    loadQuotes();
}); 