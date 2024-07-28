const cart__items = document.querySelector('.cart-items');
const sidebar = document.querySelector('.sidebar');
const information = document.querySelector('.sidebar .information');
const head = document.querySelector('.head');
const foot = document.querySelector('.foot');
const btnconfirm = document.querySelector('.btn-confirm');
const priceitem = document.querySelector('.price');









async function fetchData(){
  // ----------------------------------fetchDAta----------------------------
  const res =await fetch('./data.json')
  const data = await res.json();
  productData=data;
  printData(data);
  displayCart(data);
}

// ----------------------map the data-------------------------------------
function printData(data){
data.map((el,key)=>{
  const html = 
  `
  <div class="cart-item">
        <div class="image-box">
          <img src=${el.image.desktop} alt="">
        </div>
        <div class="bottem">
          <p>${el.category}</p>
          <h2 class='name'>${el.name}</h2>
          <h3 class='price'>$${el.price}</h3>
        </div>
        <div class="cart-btn2" onclick='addtocart(${key})'>
          <img src="assets/images/icon-add-to-cart.svg" alt="">
          <p class='addCart'>Add to Cart</p>
        </div>
      </div>
  `
  cart__items.insertAdjacentHTML('afterbegin',html);
})
}
  

// ----------------------addCArt-------------------------------------

let cart=[];
function addtocart(key){
  cart.push(productData[key])
  displayCart()
}

// ----------------------displayCart-------------------------------------
function displayCart(data){
    let total=0
    if(cart.length == 0){
      head.style.display = 'none'
      foot.style.display = 'none'
      btnconfirm.style.display = 'none'
      information.innerHTML = 
      `
      <div class="head">Your Cart (${cart.length})</div>
      <div class="empty">
        <img src="assets/images/illustration-empty-cart.svg" alt="">
        <p>Your added items will appear here</p>
      </div>
      `
      
    }else{
      head.style.display = 'block'
      foot.style.display = 'flex'
      btnconfirm.style.display = 'block';
      information.innerHTML = cart.map((items,key)=>{
        head.innerHTML = `Your Cart (${cart.length})`
        const {name,price} = items;
        total = total + price;
        priceitem.innerHTML = "$" +total
        return(
          `
        <div class="cartdetails">
          <h3>${name}</h3>
          <div class="cartPrice">
            <p class='number'>1x</p>
            <p>@ $${price}</p>
            <p>$${price}</p>
            <img class='close' onclick = 'removeItem(${key})' src="assets/images/icon-remove-item.svg" alt="">
          </div>
        </div>
        ` 
        )
        
      })
    }
  }

// -----------------------remove item-------------------
function removeItem(key){
  cart.splice(key,1)
  displayCart()
}


  fetchData()
