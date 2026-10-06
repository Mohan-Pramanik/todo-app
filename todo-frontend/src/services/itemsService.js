// Base URL of the backend.
// On Vercel: VITE_API_URL is set to the Render URL.
// On your machine: it's not set, so it falls back to localhost.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const API_URL = `${BASE_URL}/api/todo`;

//This function is used to send a new Todo item from your frontend to your backend server using a POST request.
export const addItemToServer = async (task, date) => {
  // Send a POST request to the backend server with the new Todo item data
  const response = await fetch(API_URL, {
    method: "POST",

    //This tells Express: The request body contains JSON data.
    headers: {
      "Content-Type": "application/json",
    },

    // Convert the data to JSON
    body: JSON.stringify({ task, date }),
  });

  //response.json() converts that JSON response into a JavaScript object.
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

export const getItemsFromServer = async () => {
  const response = await fetch(API_URL);
  const items = await response.json();
  return items.map(mapServerItemToLocalItem);
};

export const markItemCompletedOnServer = async (id) => {
  const response = await fetch(`${API_URL}/${id}/completed`, {
    method: "PUT",
  });
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

export const deleteItemFromServer = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return id;
};

const mapServerItemToLocalItem = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.date,
    completed: serverItem.completed,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};