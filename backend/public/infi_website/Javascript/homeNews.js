const news_section = document.getElementById("news-track");

template = `<div class="news-card">
                <img src="https://via.placeholder.com/300x150" alt="News 1" />
                <h3>Breaking: New Tech Unveiled</h3>
                <p>
                  Today, a new tech gadget was released that could change the
                  game for mobile users...
                </p>
              </div>`

const NEWAPIS = "https://newsapi.org/v2/everything?q='image processing'&apiKey=805a73edd74c4f5cb9ce192c52031e32";
var req = new Request(NEWAPIS);
let DATA = 0;

async function display_News() {
        const res = await fetch(req);
        const data = await res.json();
        const container = news_section;
        container.innerHTML = "";
        data.articles.forEach((news) => {
          const card = document.createElement("div");
          card.className = "news-card";
        //   card.innerHTML = `
        //             <img class="news-image" src="${
        //               news.urlToImage || "https://via.placeholder.com/400"
        //             }" 
        //                  alt="${news.title}">
        //             <h3>${news.title}</h3>
        //             <p>${news.description.substring(0, 100)}...</p>
        //             <p class="date">${news.publishedAt}</p>
        //         `;
         
        card.innerHTML = `<img src="${news.urlToImage || "https://via.placeholder.com/400"}" alt="${news.title}" />
                <h3>${news.title}</h3>
                <p>
                  ${news.description.substring(0, 100)}...
                </p>`
          container.appendChild(card);
        });
}
window.addEventListener("load", display_News);