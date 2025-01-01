import backgroundImages from './images.js';

// getting elements
const body = document.querySelector('body');
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const blueskyBtn = document.getElementById('bluesky');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let data = [];

//  Get quotes from API
async function getQuote() {
    showLoading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'

    try {
        const response = await fetch(apiUrl);
        data = await response.json();
        const quote = data[Math.floor(Math.random() * data.length)];

    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    removeLoading();
    } catch (error) {
        alert('Whoops, no quote', error)
    }
}

function changeBackground() {
    const image = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    body.style.backgroundImage = `url(${image.src})`;
}

function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    body.style.backgroundColor = 'rgba(30, 144, 255, 1)';
};

function removeLoading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Event Listeners
newQuoteBtn.addEventListener('click', () => {
    getQuote();
    changeBackground();
});

twitterBtn.addEventListener('click', () => {
    const author = authorText.innerText;
    const quote = quoteText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
});

blueskyBtn.addEventListener('click', () => {
    const author = authorText.innerText;
    const quote = quoteText.innerText;
    const blueskyUrl = `https://bsky.app/intent/compose?text=${quote} - ${author}`;
    window.open(blueskyUrl, '_blank');
});

// On Load
getQuote();
