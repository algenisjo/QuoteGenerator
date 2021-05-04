const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes =[];

//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote(){
    loading();
 // Pick a random quote from APIQuotes arr
 const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
 
// Check if author field is blank, and replace it with "unknown"
if(!quote.author){
    authorText.textContent = "unknown";
} else {
    authorText.textContent = quote.author;
}

// Check quote length to determine styling
if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('lonq-quote');
}

// set quote, hide loader
 quoteText.textContent = quote.text;
complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        //Catch Error Here
        alert('sorry the page isnt working');
    }
}

// tweet quotes

function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

//event listener

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On Load
getQuotes();
