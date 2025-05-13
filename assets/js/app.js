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

// Sabit sözler dizisi (JSON yerine doğrudan tanımlama)
const quotes = [
  {
    "text": "Hayat, kendini gerçekleştirebilenlere cömert davranır.",
    "author": "Goethe"
  },
  {
    "text": "Şu an bulunduğun yer, geçmişte verdiğin kararların bir sonucudur.",
    "author": "Tony Robbins"
  },
  {
    "text": "Cesur olun. Başarısız olsanız bile, başınız dik başarısız olun.",
    "author": "Che Guevara"
  },
  {
    "text": "En büyük zafer, insanın kendini yenmesidir.",
    "author": "Platon"
  },
  {
    "text": "Hayal gücü, bilgiden daha önemlidir.",
    "author": "Albert Einstein"
  },
  {
    "text": "Başarının sırrı, başlamaktır.",
    "author": "Mark Twain"
  },
  {
    "text": "Hayattaki en büyük zafer, hiç düşmemek değil; her düştüğünde yeniden ayağa kalkmaktır.",
    "author": "Nelson Mandela"
  },
  {
    "text": "Hayat, yaşanırken anlaşılmaz, ancak geriye dönüp bakılarak anlaşılabilir.",
    "author": "Søren Kierkegaard"
  },
  {
    "text": "Dünyayı değiştirmek istiyorsan, kendinden başla.",
    "author": "Sokrates"
  },
  {
    "text": "Seni öldürmeyen şey, güçlendirir.",
    "author": "Friedrich Nietzsche"
  },
  {
    "text": "Kendini başkalarıyla değil, dünkü kendinle kıyasla.",
    "author": "Ernest Hemingway"
  },
  {
    "text": "Küçük şeylerde büyük olmak, gerçek büyüklüktür.",
    "author": "Atatürk"
  },
  {
    "text": "Zorluklara karşı sabır, büyük bir güçtür.",
    "author": "Budha"
  },
  {
    "text": "Yaşamak için bir neden bulan kişi, nasıl olduğuna her türlü katlanabilir.",
    "author": "Friedrich Nietzsche"
  },
  {
    "text": "Dün bir kelimedir, yarın bir kelimedir, bugün hakkıyla yaşamaktır.",
    "author": "Rumi"
  }
];

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

// Rastgele söz göster
function displayRandomQuote() {
    if (quotes.length === 0) {
        quoteText.textContent = 'Sözler yüklenemedi. Lütfen daha sonra tekrar deneyin.';
        quoteAuthor.textContent = '';
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];
    
    quoteText.textContent = currentQuote.text;
    quoteAuthor.textContent = currentQuote.author;
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

// Event Listeners
newQuoteBtn.addEventListener('click', displayRandomQuote);
addFavoriteBtn.addEventListener('click', addToFavorites);
themeToggleBtn.addEventListener('click', toggleTheme);

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    displayRandomQuote();
}); 