const API_KEY = "ce48d05d13a74c678c3fd8ba3e1af8a2";
const url = "https://newsapi.org/v2/everything?q=";
const cardsContainer = document.querySelector('#cards-container')
const newsCardTemplate = document.querySelector('#template-news-card')

window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews (query) {
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
   const data = await res.json();
   bindData(data.articles);
};

function bindData(articles){
    cardsContainer.innerHTML = "";
    articles.forEach((news) => {
        if(!news.urlToImage) return;
      const cardClone = newsCardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone,news);
      cardsContainer.appendChild(cardClone);
    })
    
}

function fillDataInCard(cardClone,news){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = news.urlToImage;
    newsTitle.innerHTML = news.title;
    newsDesc.innerHTML = news.description;

    const date = new Date(news.publishedAt).toLocaleString("en-us",{
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${news.source.name} .${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(news.url,"_blank");
    })
};
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
};

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});