function fetchCountries(searchQuery) {
  return fetch(searchQuery)
    .then(response => response.json())
    .catch(error => console.log(error));
}
export default fetchCountries;
