// getting elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const blueskyBtn = document.getElementById('bluesky');
const newQuoteBtn = document.getElementById('new-quote');

let data = [];

// new quote button event listener
newQuoteBtn.addEventListener('click', newQuote);

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
    // random quote from api quote array
    const quote = data[Math.floor(Math.random() * data.length)];
    const author = quote.author;
    const text = quote.text;
    quoteText.textContent = text
    authorText.textContent = author
}

//  Get quotes from API
async function getQuote() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiUrl);
        data = await response.json();
        newQuote();
    } catch (error) {
        alert('Whoops, no quote', error)
    }
}

// On Load
getQuote();
