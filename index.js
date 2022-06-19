let shop = document.getElementById("shop");



let basket = JSON.parse(localStorage.getItem("data")) || [];

let genrateShop = () =>{
    
 return (shop.innerHTML = shopdata.map((x)=>{
    let {id,name,price,desc,img} = x;
       
       let search = basket.find((x) => x.id == id) || [];
         return  `<div class="items">
         <img width = "220" src= ${img} alt="">
          <div class="details">
             <h3> ${name}</h3>
             <p> ${desc} </p>
             <div class="price-quantity">
              <h2>RS ${price} </h2>
     
            <div class="button">
                
             <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
             <div id = ${id} class="quantity"> 
             
               ${search.item !== undefined ? search.item:0}
             </div>
            <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
     
            </div>
             
         </div>
          </div>
      </div>`
    }).join(""));
};

genrateShop();

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
    
     
     localStorage.setItem("data",JSON.stringify(basket));

};
let update = (id) => { 
   
     let search = basket.find((x) => x.id === id);
     document.getElementById(id).innerHTML = search.item;

    calculation();
};

let calculation = () =>  {
   let sum = 0
  basket.map((x)=> sum += x.item);
  
  document.getElementById("cartamount").innerHTML = sum;

}
 calculation();

//  let print(shopdata.map(x)){

//     map()
//  }