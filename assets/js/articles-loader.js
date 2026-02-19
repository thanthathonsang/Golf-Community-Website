// Change the URL to point to your new Articles JSON
const dbURL = "../assets/json/articles.json"; 
const itemsPerPage = 6; 
let currentArticles = [];

async function loadArticles() {
    try {
        const response = await fetch(dbURL);
        currentArticles = await response.json();

        renderPage(1);
        setupPagination();
    } catch (error) {
        console.error("Article loading failed:", error);
    }
}

function renderPage(page) {
    const container = document.getElementById('articles-container'); // Note the ID change
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = currentArticles.slice(start, end);

    container.innerHTML = paginatedItems.map(item => `
        <article class="news-card">
            <img src="${item.image}" class="news-card-img" alt="${item.title}">
            <div class="news-card-body">
                <div class="card-divider-line"></div>
                <h3 class="news-card-title">${item.title}</h3>
                <p class="news-card-desc">${item.desc}</p>
            </div>
            <div class="news-card-footer">
                <div class="footer-meta-left">
                    <span><div class="icon-placeholder tiny-icon"></div> ${item.upvotes}</span>
                    <span><div class="icon-placeholder tiny-icon"></div> ${item.comments}</span>
                </div>
                <span>${item.date}</span>
            </div>
        </article>
    `).join('');
}

function setupPagination() {
    const wrapper = document.getElementById('pagination-wrapper');
    const pageCount = Math.ceil(currentArticles.length / itemsPerPage);
    wrapper.innerHTML = ""; 

    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement('div');
        btn.classList.add('page-circle');
        btn.innerText = i;
        if (i === 1) btn.classList.add('active');

        btn.addEventListener('click', function() {
            renderPage(i);
            document.querySelectorAll('.page-circle').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        wrapper.appendChild(btn);
    }
}

document.addEventListener('DOMContentLoaded', loadArticles);