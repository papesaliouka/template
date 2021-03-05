const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote-text');
const twitterBtn= document.getElementById('twitter');
const quoteAuthor= document.getElementById('author');
const newQuoteBtn= document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
};

function removeLoadingSpinner(){
    if (!loader.hidden) {
        quoteContainer.hidden=false;
        loader.hidden= true;} 
}


// Get Quote from API
async function getQuote (){ 
    showLoadingSpinner();
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';  
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        //if quote.author is unknow
        quoteAuthor===''? quoteAuthor.innerText="Unknown": quoteAuthor.innerText = data.quoteAuthor;
        //changing font-size for long text
        (data.quoteText.length>50 )? (quoteText.classList.add('long-quote')) : (quoteText.classList.remove('long-quote'));
        quoteText.innerText= data.quoteText;
        removeLoadingSpinner();
    }catch(error) {
        getQuote();
    }
}

// tweetQuotes
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');

}

//evenlistener

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();
