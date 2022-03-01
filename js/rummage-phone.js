// Searching field is here 
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clearing search bar 
    searchField.value = '';
    // dynamic api link
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch (url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data));
}
// showing the search result 
const displaySearchResult = data =>{
    const searchResult = document.getElementById('search-result');
    const errorHnadle = document.getElementById('error-handle');
    searchResult.innerHTML = '';
    errorHnadle.innerHTML = '';

// checking whether the search keyword is available
    if(data.length == 0){
        const h5 = document.createElement('h5');
        h5.innerHTML = `
        <h5 class=" text-primary text-center fs-1">Please enter a valid keyword!!!</h5>
        `;
        errorHnadle.appendChild(h5);
    }

    // this condition will work if the result is available
  else{
    data.slice(0,20).forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');

        // creating new html 
        div.innerHTML =
        `
        <div class="card h-100">
        <img src= "${phone.image}" class="w-50 mx-auto card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.brand}</h5>
            <p class="card-text">${phone.phone_name}</p>
            <button class="rounded-pill border border-info text-success fw-bold p-2 " onclick="loadPhoneDetail('${phone.slug}')">Explore more</button>
    </div>
  </div>
        `;
        searchResult.appendChild(div)
    });
  }
}

// calling api for single phone detail 
const loadPhoneDetail = phoneId =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showPhoneDetail(data.data))
}

// showing sinlge phone detail 
const showPhoneDetail = phone =>{
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add("card");
    // creating new html 
    div.innerHTML = `
  <img src="${phone.image}" class=" w-50 mx-auto card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${phone.brand}</h5>
    <h6 class="card-title">${phone.brand}</h6>
    <p class="card-text"> <span class='fw-bold'>Release Date:</span> ${phone.releaseDate?phone.releaseDate :"Coming soon" }</p>
    <p class="card-text"><span class='fw-bold'>Features of the Phone:</span> ${phone.mainFeatures.chipSet}</p>
    <p class="card-text"><span class='fw-bold'>Display Size:</span> ${phone.mainFeatures.displaySize}</p>
    <p class="card-text"><span class='fw-bold'>Memory Details:</span> ${phone.mainFeatures.memory}</p>
    <p class="card-text"><span class='fw-bold'>Storage:</span> ${phone.mainFeatures.storage}</p>
    <p class="card-text"><span class='fw-bold'>Available sensors:</span> ${phone.mainFeatures.sensors}</p>
    <p class="card-text"><span class='fw-bold'>Other Informations:</span> Bluetooth: ${phone.others.Bluetooth} <br> GPS: ${phone.others.GPS}  <br> NFC: ${phone.others.NFC} <br> Radio: ${phone.others.Radio} <br> USB: ${phone.others.USB} <br> WLAN: ${phone.others.WLAN}</p>
    
  
</div>
    
    `;
    
    phoneDetails.appendChild(div);
    window.scrollTo(0,0);
}