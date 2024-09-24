document.addEventListener("DOMContentLoaded", () => {
  initializeCreateNewsModal();
  initializeEditNewsModal(); 
});

const initializeCreateNewsModal = () => {
  const createBtn = document.getElementById("create-news-btn");
  const createModal = document.getElementById("create-news-modal");
  const closeCreateModal = document.getElementById("close-create-modal-btn");
  const createForm = document.getElementById("create-news-form");

  if (createBtn && createModal && closeCreateModal && createForm) {
    createBtn.addEventListener("click", () => toggleModal(createModal, true));

    closeCreateModal.addEventListener("click", () => toggleModal(createModal, false));

    createForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newsData = getFormData("create");

      if (isValid(newsData)) {
        try {
          await api(`/news`, "POST", newsData);
          alert("News created successfully!");
          window.location.reload();
        } catch (error) {
          console.error("Error creating news:", error);
          alert("Failed to create news. Please try again.");
        }
      } else {
        alert("Please fill out all required fields.");
      }
    });
  } else {
    console.error("Create news elements not found. Check HTML structure.");
  }
};

const initializeEditNewsModal = () => {
  const editBtn = document.getElementById("edit-news-btn");
  const updateModal = document.getElementById("update-news-modal");
  const closeUpdateModal = document.getElementById("close-update-modal-btn");
  const updateForm = document.getElementById("update-news-form");

  const newsId = getId(); 

  if (editBtn && updateModal && closeUpdateModal && updateForm) {
    editBtn.addEventListener("click", () => toggleModal(updateModal, true));

    closeUpdateModal.addEventListener("click", () => toggleModal(updateModal, false));

    getNewsDetails(newsId, "update");

    updateForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const newsData = getFormData("update");
        try {
          await api(`/news/${newsId}`, "PUT", newsData);
          alert("News updated successfully!");
          window.location.href = `news.html?id=${newsId}`;
        } catch (error) {
          console.error("Error updating news:", error);
          alert("Failed to update news. Please try again.");
        }
    });
  } else {
    console.error("Edit news elements not found. Check HTML structure.");
  }
};

const toggleModal = (modal, show) => {
  if (modal) {
    modal.style.display = show ? "block" : "none";
  }
};

const getFormData = (prefix) => {
  return {
    author: document.getElementById(`${prefix}-author`)?.value || "",
    title: document.getElementById(`${prefix}-title`).value,
    url: document.getElementById(`${prefix}-url`).value,
    avatar: document.getElementById(`${prefix}-avatar`).value,
  };
};

// Validate form data
const isValid = (formData) => {
  return Object.values(formData).every((value) => value.trim() !== "");
};

const getNewsDetails = async (newsId, prefix) => {
  try {
    const news = await api(`/news/${newsId}`, "GET");
    document.getElementById(`${prefix}-title`).value = news.title;
    document.getElementById(`${prefix}-url`).value = news.url;
    document.getElementById(`${prefix}-avatar`).value = news.avatar;
  } catch (error) {
    console.error("Error loading news details:", error);
    alert("Failed to load news details. Please try again.");
  }
};

const getId = () => {
  return new URLSearchParams(window.location.search).get("id");
};

