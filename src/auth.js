

export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
    //   'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'email': email, 
        'password': password
    })
  })
  .then(_handleResponse)
};

function _handleResponse(response) {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  } else {
    throw response.statusText
  }
}