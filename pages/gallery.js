let gallery = [
  "../images/Gal1.jpg",
  "../images/Gal2.jpg",
  "../images/Gal3.jpg",
  "../images/Gal4.jpg",
  "../images/Gal5.jpg",
  "../images/Gal6.jpg",
  "../images/Gal7.jpg",
];

let galinfo = [
  "Steak on a grill",
  "Grilled steak is served",
  "Salad to go with the meal",
  "Side salad",
  "Tasty appetizers",
  "Yummy egg breakfast",
  "Dinner is served",
];

let gal = document.querySelector(".images");
let galOutput = "<br>";
let i = 0;

gallery.map((item) => {
  galOutput += `   
     <div>
      <img src=${item} width="300px ">
      <p>${galinfo[i++]}</p>
      </div>
  `;
  galOutput;
});

gal.innerHTML = galOutput;
