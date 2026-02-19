const dbURL = "../assets/json/news.json";
const itemsPerPage = 6; 
let currentArticles = []; // Store the full list here

async function loadNews() {
    try {
        const response = await fetch(dbURL);
        currentArticles = await response.json();

        // Initial load: show page 1
        renderPage(1);
        // Create the circles based on the count
        setupPagination();
    } catch (error) {
        console.error("Monkey error:", error);
    }
}

function renderPage(page) {
    const container = document.getElementById('news-container');
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = currentArticles.slice(start, end);

    container.innerHTML = paginatedItems.map(article => `
        <article class="news-card">
            <img src="${article.image}" class="news-card-img" alt="${article.title}">
            <div class="news-card-body">
                <div class="card-divider-line"></div>
                <h3 class="news-card-title">${article.title}</h3>
                <p class="news-card-desc">${article.desc}</p>
            </div>
            <div class="news-card-footer">
                <div class="footer-meta-left">
                    <span><div class="icon-placeholder tiny-icon"></div> ${article.upvotes}</span>
                    <span><div class="icon-placeholder tiny-icon"></div> ${article.comments}</span>
                </div>
                <span>${article.date}</span>
            </div>
        </article>
    `).join('');
}

function setupPagination() {
    const wrapper = document.getElementById('pagination-wrapper');
    const pageCount = Math.ceil(currentArticles.length / itemsPerPage);
    
    wrapper.innerHTML = ""; // Clear old circles

    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement('div');
        btn.classList.add('page-circle');
        btn.innerText = i;
        
        if (i === 1) btn.classList.add('active'); // Set first page as active

        btn.addEventListener('click', function() {
            renderPage(i);
            
            // UI Update: move the 'active' class
            document.querySelectorAll('.page-circle').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to top of news
            document.getElementById('news-container').scrollIntoView({ behavior: 'smooth' });
        });

        wrapper.appendChild(btn);
    }
}

document.addEventListener('DOMContentLoaded', loadNews);