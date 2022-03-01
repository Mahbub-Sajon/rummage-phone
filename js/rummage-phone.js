const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url)
    fetch (url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data));
}
const displaySearchResult = data =>{
    const searchResult = document.getElementById('search-result');
    data.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =
        `
        <div class="card h-100">
        <img src= "${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.brand}</h5>
            <p class="card-text">${phone.phone_name}</p>
            <button onclick="loadPhoneDetail('${phone.slug}')">Explore more</button>
    </div>
  </div>
        `;
        searchResult.appendChild(div)
    });
}
const loadPhoneDetail = phoneId =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showPhoneDetail(data.data))
}
const showPhoneDetail = phone =>{
    console.log(phone);
}