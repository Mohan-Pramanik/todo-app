//This function is used to send a new Todo item from your frontend to your backend server using a POST request.
export const addItemToServer = async (task, date) => {
  // Send a POST request to the backend server with the new Todo item data
  const response = await fetch("http://localhost:3001/api/todo", {
      method: "POST",

      //This tells Express: The request body contains JSON data.
      headers: {
        "Content-Type": "application/json",
      },
      //Therefore, your Express server should generally have middleware to parse JSON request bodies, such as app.use(express.json());

      // Convert the data to JSON
      //     {
      //          "task": "Study DSA",
      //         "date": "2026-10-06"
      //    }
      body: JSON.stringify({ task, date }),
  });

  //Get the server response
  //response.json() converts that JSON response into a JavaScript object.
  const item = await response.json();
  return mapServerItemToLocalItem(item); // define bellow function to map server item to local item
};

export const getItemsFromServer = async () => {
  const response = await fetch("http://localhost:3001/api/todo");
  const items = await response.json();
  return items.map(mapServerItemToLocalItem);
};

export const markItemCompletedOnServer = async (id) => {
  const response = await fetch(
    `http://localhost:3001/api/todo/${id}/completed`,
    {
      method: "PUT",
    }
  );
  const item = await response.json();
  return mapServerItemToLocalItem(item);
};

export const deleteItemFromServer = async (id) => {
  await fetch(`http://localhost:3001/api/todo/${id}`, {
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
