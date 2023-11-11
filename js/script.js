let imgs = ["url('./images/24.jpg')","url('./images/Rectangle\ 25.jpg')","url('./images/25a06a33769af9bf5fe8f8ed81ce75d8.png')"];
let nextBtn = document.getElementById("nextSlideId");
let prevBtn = document.getElementById("prevSlideId");
let nodeCounter=0;
let imgIndex=0;

function nextSlide()
{
    if (imgIndex>=imgs.length-1)
    {
      imgIndex=0;
      document.getElementById("fullSizeImgId").style.backgroundImage = imgs[imgIndex]; 
      document.getElementById("midImgId").style.backgroundImage = imgs[imgIndex+1];
      document.getElementById("cropedImgId").style.backgroundImage = imgs[imgIndex+2];
      document.getElementById(`node(`+imgIndex+`)`).classList.add("activeNode");
      return;
    } else{
        document.getElementById("fullSizeImgId").style.backgroundImage = imgs[imgIndex+1];
    }
    if (imgIndex==imgs.length-2){
        imgIndex=0;
        document.getElementById("midImgId").style.backgroundImage = imgs[imgIndex]; 
        imgIndex++;
      } else{
        document.getElementById("midImgId").style.backgroundImage = imgs[imgIndex+2];
      }
    document.getElementById("cropedImgId").style.backgroundImage = imgs[imgIndex];
    imgIndex++; 
    nodeCounter++;
    document.getElementById(`node(`+nodeCounter+`)`).classList.add("activeNode");
};
function prevSlide()
{
    if (imgIndex<1)
    {
      imgIndex=imgs.length -1;
      document.getElementById("fullSizeImgId").style.backgroundImage = imgs[imgIndex]; 
      document.getElementById("midImgId").style.backgroundImage = imgs[imgIndex-2];
      document.getElementById("cropedImgId").style.backgroundImage = imgs[imgIndex-1];
      return;
    } else{
        document.getElementById("fullSizeImgId").style.backgroundImage = imgs[imgIndex-1];
    }
    if (imgIndex==imgs.length-2){
        imgIndex=imgs.length;
        document.getElementById("midImgId").style.backgroundImage = imgs[imgIndex-2]; 
        imgIndex++;
         
    } else{
        document.getElementById("midImgId").style.backgroundImage = imgs[imgIndex];
    }
    document.getElementById("cropedImgId").style.backgroundImage = imgs[imgIndex-2];
    imgIndex--;
    if (imgIndex>=imgs.length)
    {
        imgIndex=0;
    }  
};

nextBtn.addEventListener("click",nextSlide);
prevBtn.addEventListener("click",prevSlide);
 
    
    
    //    document.body.style.backgroundImage= imgs[i] ;

//products 

const productsCartona = document.getElementById('productsContainer');
const cartItemsCartona = document.getElementById('cartItems');
const suptotalCartona = document.getElementById('subtotalCart');
const totalCartItems = document.querySelector('.cartItemsTotalNum');

function renderProducts() {
  products.forEach((product) => {
    productsCartona.innerHTML += `
    <div class=" col-lg-3 col-md-4 col-sm-6 ">
    <div class="productCard m-2 my-4">
              <img class="w-100 productImage" src="${product.imgSrc}" alt="">
              <div class="cardContent">
              <h5 class="itemName">${product.name}</h5>
              <p class="discreption">${product.dicreption}</p>
                <div class=" d-flex justify-content-between">
                <h6 class="productPrice">EGP ${product.price}</h6>
                <p class="oldPrice"> ${product.oldPrice}</p>
                </div>
                </div>
                <div class="d-flex justify-content-center w-100 addToCartBtnParent ">
                <button class="addToCartBtn" onclick="addToCart(${product.id})">Add to cart</button>
                </div>
                 
                <div class="secoundLayer d-flex  align-items-center">
                <div class="w-100 text-center">
                <div class="cartMedia d-flex justify-content-evenly">
                <div class="d-flex align-items-center">
                <i class="fa-solid fa-share-nodes"></i>
                <a href="#"><p>Share</p></a>
                </div>
                <div class="d-flex align-items-center ">
                      <i class="fa-solid fa-arrow-right-arrow-left"></i>
                      <a href="#"><p>Compare</p></a>
                    </div>
                    <div class="d-flex align-items-center">
                    <i class="fa-regular fa-heart"></i>
                    <a href="#"><p>Like</p></a> 
                    </div>
                    
                    </div>
                    </div>
                    </div>
                    <span class="${product.conditionClass} d-flex justify-content-center align-items-center">${product.condition}</span>
                    
                    </div>
                    
                    </div>
                    `;
                  });
                }
renderProducts();


//end products


// open cart modal
const cart = document.getElementById('cartIcon');
const cartModalOverlay = document.getElementById('cartModel');

cart.addEventListener('click', () => {
  cartModalOverlay.style.visibility="visible";
});
// end of open cart modal

//close cart
const colseCart = document.getElementById('closeCartBtn');
colseCart.addEventListener('click',() => {
  cartModalOverlay.style.visibility ="hidden"
});
//end of close cart

//cart array
let cartContainer = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// add to cart start
function addToCart(id) {
  //check if product already in cart
  if (cartContainer.some((item) => item.id === id)){
    alert("product already in cart");
  } else {
    const item = products.find((product) => product.id === id);
    cartContainer.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  
  updateCart();
}
//add to cart end

// update cart
function updateCart(){
  renderCartItems();
  renderSubTotal();

  // store items in localStorage
  localStorage.setItem("CART",JSON.stringify(cartContainer));
}
// update cart end

// render cart items
function renderCartItems() {
  cartItemsCartona.innerHTML =""; //clear cart
  cartContainer.forEach((item) => {
    cartItemsCartona.innerHTML += `
    <div class="productRow">
    <div class="cartProduct d-flex justify-content-between align-items-center">
      <div class="cartImgDiv">
        <img class="w-100" src="${item.imgSrc}" alt="${item.name}">
      </div>
      <div class="cartProductContent">
        <p class="cartProductName">${item.name}</p>
        <div class="d-flex productDetails align-items-center justify-content-between align-items-center">
          <div class=" d-flex justify-content-between units">
            <div class="minusBtn d-flex justify-content-center align-items-center" onclick="changeNumberOfUnits('minus',${item.id})"><b>-</b></div>
            <div class="itemQuantity">${item.numberOfUnits}</div>
            <div class="plusBtn d-flex justify-content-center align-items-center" onclick="changeNumberOfUnits('plus',${item.id})"><b>+</b></div>
          </div>
          <b>X</b>
          <p class="cartProductPrice">${item.price} EGP</p>
        </div>
      </div>
      <div class="deleteProduct d-flex justify-content-center align-items-center" onclick="removeCartItem(${item.id})">
        <i class="fa-solid fa-x"></i>
      </div>
    </div>
  </div>
    `;
  });
}
// render cart items end

// change number of units
function changeNumberOfUnits(action, id) {
  cartContainer = cartContainer.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
  
}

// render subtotal
function renderSubTotal() {
  let totalPrice=0,
    totalItems=0;

  cartContainer.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  suptotalCartona.innerHTML =`
  <p>Subtotal</p>
  <b class="totalPrice">EGP ${totalPrice}</b>
  `;
  totalCartItems.innerHTML =`<b>${totalItems}</b>`;

}
// remove item from cart
function removeCartItem(id) {
  cartContainer = cartContainer.filter((item) => item.id !== id);

  updateCart();
}


 