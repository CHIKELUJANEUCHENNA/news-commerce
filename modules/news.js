let currentPage = 1;
const itemsPerPage = 9; // Number of news items per page

document.addEventListener("DOMContentLoaded", () => {
  setup();
});

const setup = () => {
  setupPagination();
  newsList();
};

const setupPagination = () => {
  document
    .getElementById("next-page")
    .addEventListener("click", handleNextPage);
  document
    .getElementById("prev-page")
    .addEventListener("click", handlePrevPage);
};

const handleNextPage = () => {
  currentPage++;
  newsList();
};

const handlePrevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    newsList();
  }
};

const newsList = async () => {
  try {
    const news = await fetchNews(currentPage);
    renderNews(news);
    paginationInfo(news.length);
  } catch (error) {
    displayError("Failed to load all news");
  }
};

const fetchNews = async (page) => {
  return api(`/news?page=${page}&limit=${itemsPerPage}`);
};

const renderNews = (news) => {
  const listOfNews = document.getElementById("news-list");
  listOfNews.innerHTML = news.map(newsItem).join("");
};

const newsItem = (item) => {
  return `
    <div class="news-item" onclick="viewDetails(${item.id})">
      <img src="${item.avatar}" alt="${item.title}" class="news-avatar" />
      <h2>${item.title}</h2>
      <p>${item.author}</p>
    </div>
  `;
};

const viewDetails = (id) => {
  window.location.href = `news.html?id=${id}`;
};

const paginationInfo = (newsCount) => {
  document.getElementById("page-info").textContent = `Page ${currentPage}`;
  document.getElementById("prev-page").disabled = currentPage === 1;
  document.getElementById("next-page").disabled = newsCount < itemsPerPage;
};

const displayError = (message) => {
  alert(message);
};

const fetchNewsDetails = async (newsId) => {
  try {
    const news = await fetchDetails(newsId);
    newsDetails(news);
  } catch (error) {
    displayError("Failed to load news details");
  }
};

const fetchDetails = async (newsId) => {
  return api(`/news/${newsId}`);
};

const newsDetails = (news) => {
  const newsContent = document.getElementById("news-content");
  newsContent.innerHTML = `
    <img src="${news.avatar}" alt="News Avatar" style="width: 100px; height: auto" />
    <h1>${news.title}</h1>
    <p>Author by: ${news.author}</p>
  `;
  getComments(news.id);
  slider(news.id);
};


const newsId = new URLSearchParams(window.location.search).get("id");
if (newsId) {
  fetchNewsDetails(newsId);
}
