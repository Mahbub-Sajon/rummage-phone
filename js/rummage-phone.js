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
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add("card");
    div.innerHTML = `
   
  <img src="${phone.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${phone.brand}</h5>
    <h6 class="card-title">${phone.brand}</h6>
    <p class="card-text"> <span class='fw-bold'>Release Date:</span> ${phone.releaseDate}</p>
    <p class="card-text"><span class='fw-bold'>Features of the Phone:</span> ${phone.mainFeatures.chipSet}</p>
    <p class="card-text"><span class='fw-bold'>Display Size:</span> ${phone.mainFeatures.displaySize}</p>
    <p class="card-text"><span class='fw-bold'>Memory Details:</span> ${phone.mainFeatures.memory}</p>
    <p class="card-text"><span class='fw-bold'>Storage:</span> ${phone.mainFeatures.storage}</p>


    <p class="card-text"><span class='fw-bold'>Available sensors:</span> ${phone.mainFeatures.sensors[0]},  ${phone.mainFeatures.sensors[1]},  ${phone.mainFeatures.sensors[2]},  ${phone.mainFeatures.sensors[3]},  ${phone.mainFeatures.sensors[4]},  ${phone.mainFeatures.sensors[5]}</p>
    
  
</div>
    
    `;
    phoneDetails.appendChild(div);
}