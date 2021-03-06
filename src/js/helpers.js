import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      timeoutID = setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} seconds`));
      }, s * 1000);
    });
  };

export const getJSON = async (url) => {
    try {
        const fetchPro = fetch(url);
        const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]) ;  // API call coupled with a Promise.race method in which the first to finish either the API call or the setTimeout method will then win the race and be labeled the response variable.
        // clearTimeout(timeoutID);
        const data = await response.json(); // Get data from response and use .json() method to turn it into a JavaScript object
        if(!response.ok) throw new Error(`${data.message} (${res.status})`);  // Creation of a custom error message. IF response.ok is false ! turns it to true so that it can throw New Error message
        console.log(response, data);  // Prints Response {type: "cors", url: "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886", redirected: false, status: 200, ok: true, …}
        return data;
    } catch (error) {
        throw error;    // This will throw the error to the model.js file in the load recipe function where there is a custom error message with fire emojis
    }  
}