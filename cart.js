let basket = JSON.parse(localStorage.getItem("data")) || [];
let  label = document.getElementById("label");
 let shoppingcart = document.getElementById("shoppingcart");
 
let calculation = () =>  {
    let sum = 0
   basket.map((x)=> sum += x.item);
   
   document.getElementById("cartamount").innerHTML = sum;
 
 }

  calculation();
  

  let genrateCart = () => {

    if(basket.length !== 0){

       
           
        return (shoppingcart.innerHTML = basket.map((x) => {
             
            let {id,item} = x;
            let search = shopdata.find((y)=>y.id === id) || [];
            return `
             <div class="cart-name">
             <img class = "cart-img" width = "100px" src="${search.img}" alt="">
             <div class="details">
                 <div class="tittle-price-x">
                    
                 <h4 class="tittle-price">
                 <p>${search.name}</p>
                 <p class = "cart-price" > Rs ${search.price} </p>
                  </h4>

                 <i onclick = "removeitem(${id})"  class="bi bi-x-lg"></i>

                 </div>
                
                 <div class="button">
                
                 <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                 <div id = ${id} class="quantity"> 
                 
                   ${item}
                 </div>
                <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
               </div>

              <h3  >Rs ${item * search.price}</h3>
             
             </div> 
         </div>
         
             `
        })
        .join(""));

    }else{

         shoppingcart.innerHTML = ``;
         label.innerHTML = `<h2>Cart is Empty</h2>
         <a href="index.html">
           <button class="HomeBtn"> Back To Home</button>
         </a> `
         ;
    }

  };


genrateCart();


let increment = (id)=> {
 
  let selecteditem = id;
   let search = basket.find((x) => x.id === selecteditem.id)

   if(search === undefined) {
      basket.push({
          id: selecteditem.id,item: 1,
      });
   }else{
      search.item += 1;
   }
   //console.log(basket);
   update(selecteditem.id);
   genrateCart();
   localStorage.setItem("data",JSON.stringify(basket));
};
   
let  decrement= (id)=> {
  
  let selecteditem = id;
  let search = basket.find((x) => x.id === selecteditem.id)


  if(search === undefined) return ;
   if(search.item > 0) {
      search.item -= 1 ;
   }else{
      return ;
   }
   //console.log(basket);
   update(selecteditem.id);

   basket = basket.filter ( (x) => x.item !==0 );
  
     genrateCart();
   localStorage.setItem("data",JSON.stringify(basket));

};

let update = (id) => { 
   
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;

     calculation();
};

// let calculation = () =>  {
//   let sum = 0;
//  basket.map((x)=> sum += x.item);
 
//  document.getElementById("cartamount").innerHTML = sum;

// }
//  calculation();

let removeitem = (id) =>{

  basket = basket.filter((x)=>x.id !== id.id);
  calculation();
  genrateCart(); 

  localStorage.setItem("data",JSON.stringify(basket));
  

}

let totalamount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopdata.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
   
    label.innerHTML = `
        
    <h2>Total Bill : Rs ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick = "clearcart()" class="removeAll">Clear Cart</button>
    `
    ;
    genrateCart();
  } else return;
};


totalamount();
let clearcart = () => {
  basket = [];
  genrateCart();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
