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

// show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    body.style.backgroundColor = 'rgba(30, 144, 255, 1)';
};

// hide loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// new quote button event listener
newQuoteBtn.addEventListener('click', () => {
    newQuote();
    changeBackground();
});

// twitter button event listener
twitterBtn.addEventListener('click', () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
});

// bluesky button event listener
blueskyBtn.addEventListener('click', () => {
    const blueskyUrl = `https://bsky.app/intent/compose?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(blueskyUrl, '_blank');
});

// show new quote
function newQuote() {
    loading();
    // random quote from api quote array
    const quote = data[Math.floor(Math.random() * data.length)];

    // author exists or not
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // if quote length is long
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

//  Get quotes from API
async function getQuote() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiUrl);
        data = await response.json();
        newQuote();
    } catch (error) {
        alert('Whoops, no quote', error)
    }
}

// Change background image
function changeBackground() {
    const image = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    body.style.backgroundImage = `url(${image.src})`;
}

// On Load
getQuote();
changeBackground();
