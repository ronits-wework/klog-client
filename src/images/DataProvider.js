export class DataProvider{
  get (url) {
    return fetch(url)
      .then(response => response.json());
  }

  post (url, data) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
  }
}

export let dataProvider = new DataProvider();
