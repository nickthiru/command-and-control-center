// API Service Object

// const PostmanMockServerUrl = "https://246e037d-72f1-4123-9332-568319d38935.mock.pstmn.io";
// const baseUrl = PostmanMockServerUrl;

import { CdkStackApiStackHttpStack813D57AD as BackendApi } from "../../cdk/outputs.json";
const baseUrl = BackendApi.RestApiEndpoint0551178A;


// Subcribe to token store to get and add the token, if it exists, to the Authorization header
// of each API request. Remember some routes/sdk commands don't require authentication e.g.
// sign up, confirm sign up, and sign in.

async function get(endpoint) {
  return fetch(baseUrl + endpoint)
    .then((response) => response.json())
    .catch((error) => {
      // To Do
    });
}

async function post(endpoint, data) {
  return fetch(baseUrl + endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      // To Do
    });
}

export default {
  get,
  post,
}