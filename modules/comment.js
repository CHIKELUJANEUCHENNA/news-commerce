document
  .getElementById("comment-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const newsId = getNewsId();
    const commentId = document.getElementById("comment-id").value;
    const name = document.getElementById("new-name").value.trim();
    const userComment = document.getElementById("new-comment").value.trim();

    if (!name || !userComment) {
      alert("Please provide both name and comment.");
      return;
    }

    const payload = { name, comment: userComment };

    try {
      const url = commentId
        ? `/news/${newsId}/comments/${commentId}`
        : `/news/${newsId}/comments`;
      const method = commentId ? "PUT" : "POST";

      await api(url, method, payload);
      alert(`Comment ${commentId ? "updated" : "posted"} successfully!`);

      clearFormFields();
      getComments(newsId);
    } catch (error) {
      console.error(
        `Error ${commentId ? "updating" : "posting"} comment:`,
        error
      );
    }
  });

const getComments = async (newsId) => {
  try {
    const commentsList = await api(`/news/${newsId}/comments`);
    const commentsWrapper = document.getElementById("comments-list");
    commentsWrapper.innerHTML = commentsList
      .map(
        (comment) => `
          <div id="comment-item-${comment.id}" class="comment-item">
            <p><strong>${comment.name}</strong>: ${comment.comment}</p>
            <button onclick="editComment(${comment.id}, '${comment.name}', '${comment.comment}')" id='edit'>Edit</button>
            <button onclick="deleteComment(${comment.id}, ${newsId})" id='delete'>Delete</button>
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading comments:", error);
  }
};

const editComment = (commentId, name, userComment) => {
  document.getElementById("comment-id").value = commentId;
  document.getElementById("new-name").value = name;
  document.getElementById("new-comment").value = userComment;
};

const deleteComment = async (commentId, newsId) => {
  if (confirm("Are you sure you want to delete this comment?")) {
    try {
      await api(`/news/${newsId}/comments/${commentId}`, "DELETE");
      document.getElementById(`comment-item-${commentId}`).remove();
      alert("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }
};

const clearFormFields = () => {
  document.getElementById("comment-id").value = "";
  document.getElementById("new-name").value = "";
  document.getElementById("new-comment").value = "";
};

const getNewsId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
};
