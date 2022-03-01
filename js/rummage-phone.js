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
    const errorHnadle = document.getElementById('error-handle');
    searchResult.innerHTML = '';
    errorHnadle.innerHTML = '';
    
    if(data.length == 0){
        const h5 = document.createElement('h5');
        h5.innerHTML = `
        <h5 class=" text-center fw-bold fs-1">Please enter a valid keyword!!!</h5>
        `;
        errorHnadle.appendChild(h5);
        
    }
  else{
    
    data.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =
        `
        <div class="card h-100">
        <img src= "${phone.image}" class="w-50 mx-auto card-img-top" alt="...">
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
    phoneDetails.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add("card");
    div.innerHTML = `
   
  <img src="${phone.image}" class=" w-50 mx-auto card-img-top" alt="...">
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