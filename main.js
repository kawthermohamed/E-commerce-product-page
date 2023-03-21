//mobile navbar
let navbtn = document.querySelector(".bar-icon");
let nav = document.querySelector(" header .nav ul");
let closebtn = document.querySelector(" .close-icon");
let bgOverlay = document.querySelector(".overlay");
navbtn.onclick = function () {
  nav.classList.add("open");
  closebtn.classList.add("open");
  bgOverlay.classList.add("open");
};

closebtn.onclick = function () {
  nav.classList.remove("open");
  closebtn.classList.remove("open");
  bgOverlay.classList.remove("open");
};

//price after sale

let salePrice = document.querySelector(".price .sale-price");
let salePercentage = document.querySelector(".price .sale-percentage");
let originalPrice = document.querySelector(".price .original-price");

salePercentage.innerHTML = salePercentage.dataset.percentage + "%";
let priceaftersale =
  (originalPrice.innerHTML.slice(1) / 100) * salePercentage.dataset.percentage;
salePrice.innerHTML = "$" + priceaftersale.toFixed(2);

//small img on click
let imgs = document.querySelectorAll(".photos img");
console.log(imgs);
let mainImgs = document.querySelectorAll(".main-photo img");

imgs.forEach((img) => {
  img.onclick = function () {
    let neededimg = img.dataset.pro;
    imgs.forEach((e) => {
      e.classList.remove("active");
    });
    mainImgs.forEach((el) => {
      el.classList.remove("active");
      if (el.classList.contains(neededimg)) {
        el.classList.add("active");
      }
    });

    this.classList.add("active");
  };
});
// // large img on click
let imgOverlay = document.querySelector(".img-overlay");
mainImgs.forEach((ele) => {
  ele.onclick = function () {
    let eleSrc = ele.src;
    imgOverlay.classList.add("open");
    imgOverlay.children[0].src = eleSrc;
  };
});

//close opened img
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("open-img") == false) {
    e.target.classList.remove("open");
  }
});

// cart plus & minus
let plusBtn = document.querySelector(".plus");
let minusBtn = document.querySelector(".minus");
let itemNo = document.querySelector(".No");

minusBtn.onclick = function () {
  itemNo.innerHTML++;
};
plusBtn.onclick = function () {
  if (itemNo.innerHTML <= 0) {
  } else {
    itemNo.innerHTML--;
  }
};

//add to cart btn on click
let addBtn = document.querySelector(".cart-btn");
let produtsContainer = document.querySelector(".products");
let neededTitle = document.querySelector(".text-sec h2");
let chckoutBtn = document.querySelector(".checkout");
let notify = document.querySelector(".notify ");
addBtn.onclick = function () {
  if (itemNo.innerHTML > 0) {
    emptyText.classList.remove("active");
    chckoutBtn.classList.add("active");
    if (produtsContainer.innerHTML == "") {
      addelement();
      notify.classList.add("open");

      notify.innerHTML++;
    } else {
      //update no & price
      let newNo = itemNo.innerHTML;
      let oldNo = document.querySelector(".pro-no").innerHTML;
      document.querySelector(".pro-no").innerHTML =
        Number(newNo) + Number(oldNo);
      document.querySelector(".total").innerHTML =
        "$" +
        (
          document.querySelector(".pro-price").innerHTML.slice(1) *
          document.querySelector(".pro-no").innerHTML
        ).toFixed(2);
      notify.classList.add("open");
      notify.innerHTML++;
      console.log(oldNo);
    }
  } else {
  }
};

//add element fn
function addelement() {
  let proBox = document.createElement("div");
  proBox.className = "pro-box";
  let proImg = document.createElement("img");
  proImg.className = "pro-img";
  proImg.src = "images/image-product-1-thumbnail.jpg";
  let tpContainer = document.createElement("div");
  tpContainer.className = "tp";
  let proTitle = document.createElement("div");
  proTitle.className = "pro-title";
  proTitle.textContent = neededTitle.textContent;
  let proPrice = document.createElement("span");
  proPrice.className = "pro-price";
  proPrice.innerHTML = salePrice.innerHTML;
  let multiplyIcon = document.createElement("span");
  multiplyIcon.innerHTML = "x";
  let proNo = document.createElement("span");

  proNo.className = "pro-no";
  proNo.innerHTML = itemNo.innerHTML;
  let totalPrice = document.createElement("span");
  totalPrice.className = "total";
  totalPrice.innerHTML =
    "$" + (proPrice.innerHTML.slice(1) * proNo.innerHTML).toFixed(2);
  let delImg = document.createElement("img");
  delImg.src = "images/icon-delete.svg";
  delImg.className = "del";
  //appending
  tpContainer.appendChild(proTitle);
  tpContainer.appendChild(proPrice);
  tpContainer.appendChild(multiplyIcon);
  tpContainer.appendChild(proNo);
  tpContainer.appendChild(totalPrice);
  //appending
  proBox.appendChild(proImg);
  proBox.appendChild(tpContainer);
  proBox.appendChild(delImg);
  //
  produtsContainer.appendChild(proBox);
}
//deletbtn on click
document.addEventListener("click", function (e) {
  if (e.target.className == "del") {
    e.target.parentElement.remove();

    checkCart();
  } else {
  }
});

//header cart btn on click

let headerCart = document.querySelector(".cart");
let cartBox = document.querySelector(".cart-box");
let emptyText = document.querySelector(".empty");

headerCart.onclick = function () {
  cartBox.classList.toggle("open");
  notify.classList.remove("open");
  notify.innerHTML = 0;
  checkCart();
};

///check if cart empty
function checkCart() {
  if (produtsContainer.children.length < 1) {
    emptyText.classList.add("active");
    produtsContainer.style.paddingBottom = 100 + "px";
    chckoutBtn.classList.remove("active");
  }
}
