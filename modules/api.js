const API_BASE_URL = "https://61924d4daeab5c0017105f1a.mockapi.io/skaet/v1";

const api = async (endpoint, method = "GET", body = null) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });

    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
      console.error('Data failed to fetch');
      throw error;
  }
};
