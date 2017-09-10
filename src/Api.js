export function fetchGifs(query, callback) {
  fetch(`/gifs/search/${query}`, {
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .then(data => {
      callback(data);
    });
}

export function fetchTrendingGifs(callback) {
  fetch(`/gifs/trending`, {
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .then(data => {
      callback(data);
    });
}

export function fetchRandomGifs(callback) {
  fetch(`/gifs/random`, {
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .then(data => {
      callback(data);
    });
}
