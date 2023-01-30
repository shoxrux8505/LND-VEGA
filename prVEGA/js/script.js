
AOS.init();

var swiper = new Swiper(".mySwiper", {
	slidesPerView: 3,
	spaceBetween: 30,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});

var kursorx = new kursor({
	type: 1,
	color: '#7FAD39',
})


// let age = prompt("how old are you !");

// if(age > 16){
// 	console.log(age);
// 	alert('WELCOME TO WEBSITE')
// }

let open = document.getElementById("open-sidebar").addEventListener("click", () => {
	document.getElementById("saidbar").classList.toggle("active");
});
// vega loader
let loaderContainer = document.querySelector(".loader_container");
window.addEventListener("load", () => {
	setInterval(() => {
		document.body.style.overflowY = "auto";
		loaderContainer.classList.add("loader_hide");

	}, +1500);
});



// vega shop bascet start
let $ = document;
let ModalProduct = $.querySelector('.modal');
let openProduct = $.getElementById('said-shop')
let CloseBtn = $.getElementById('close');
let Bag = $.querySelector('#bag')
let productContainer = $.querySelector(".shop-items");
let cartContainer = $.querySelector(".cart-items");
let removeAllProductsBtn = $.querySelector("#remove-all-products");
let cartTotalPrice = $.querySelector(".cart-total-price");
let contanta = $.querySelector('.container');
contanta.style.background = '#7ead39c1';
cartContainer.style.background = '#7ead39c1'
let storeProduct = [
	{ id: 1, product: "Bunch of bananas", image: "../img/cards-img/banana.png", price: 5, count: 1 },
	{ id: 2, product: "Fresh organic apricot", image: "../img/cards-img/avricos.png", price: 25, count: 1 },
	{ id: 3, product: "Avokado fruit", image: "../img/cards-img/avacado.png", price: 17, count: 1 },
	{ id: 4, product: "Red apple", image: "../img/cards-img/apple-red.png", price: 8, count: 1 },
	{ id: 5, product: "Two fresh figs", image: "../img/cards-img/figs.png", price: 25, count: 1 },
	{ id: 6, product: "Cucumber", image: "../img/cards-img/cucomber.png", price: 12, count: 1 },
	{ id: 7, product: "Beef steak", image: "../img/cards-img/staek.png", price: 5, count: 1 },
	{ id: 8, product: "Raw broccoli", image: "../img/cards-img/broccali.png", price: 25, count: 1 },
	{ id: 9, product: "Fountain Pen", image: "../img/orex.png", price: 17, count: 1 },
	{ id: 10, product: "Rice", image: "../img/orex.png", price: 8, count: 1 },
	{ id: 11, product: "T-Shirt", image: "../img/orex.png", price: 25, count: 1 },
	{ id: 12, product: "Coffee Cup", image: "../img/orex.png", price: 12, count: 1 },
];

let userBasket = [];

storeProduct.forEach(function (product, i) {
	let itemDiv = $.createElement("div")
	itemDiv.classList.add("shop-item")

	let itemTitleSpan = $.createElement("span")
	itemTitleSpan.classList.add("shop-item-title")
	itemTitleSpan.innerHTML = product.product

	let itemCoverImg = $.createElement("img")
	itemCoverImg.classList.add("shop-item-image")
	itemCoverImg.src = product.image

	let itemDetailDiv = $.createElement("div")
	itemDetailDiv.classList.add("shop-item-details")

	let itemPriceSpan = $.createElement("span")
	itemPriceSpan.style.fontSize = '20px'
	itemPriceSpan.style.color = '#FFFFFF'
	itemPriceSpan.classList.add("shop-item-price")
	itemPriceSpan.innerHTML = "$" + product.price

	let itemAddBtn = $.createElement("button");
	itemAddBtn.style.background = '#7FAD39'
	itemAddBtn.style.border = ' none '
	itemAddBtn.style.boxShadow = '0 0 10px #7FAD39'
	itemAddBtn.style.borderRadius = '10px'
	itemAddBtn.className = "btn btn-success shop-item-button"
	itemAddBtn.setAttribute("type", "button")
	itemAddBtn.innerHTML = "🛒"
	let c = 1;

	let classBtn = itemAddBtn.className = "btn";


	document.querySelectorAll(".btn").forEach ((v, i) => {
		v.addEventListener("click", () => {
			document.querySelector(".count").innerHTML = c++;
			userBasket.innerHTML += product
			Bag.classList.add('red-radius')
			addToCard(product.id, userBasket);
		})
	})

	Bag.addEventListener('click', () => {
		ModalProduct.style.display = 'block';
	})
	itemDetailDiv.append(itemPriceSpan, itemAddBtn)
	itemDiv.append(itemTitleSpan, itemCoverImg, itemDetailDiv)
	productContainer.append(itemDiv)
});

function addToCard(productId, userBasket) {
	console.log("added")
	let mainProduct = storeProduct.find(function (product) {
		return product.id === productId
	})

	if (userBasket.includes(mainProduct)) {
		++mainProduct.count
	} else {
		userBasket.push(mainProduct)
	}

	basketProductsGenerator(userBasket)
	calcTotalPrice(userBasket)
}

function basketProductsGenerator(userBasketArray) {
	cartContainer.innerHTML = ""
	userBasketArray.forEach(function (product) {
		let cartItemDiv = $.createElement("div")
		cartItemDiv.classList.add("cart-row")

		let cartItemColumnDiv = $.createElement("div")
		cartItemColumnDiv.className = "cart-item cart-column"

		let cartItemCoverImg = $.createElement("img")
		cartItemCoverImg.classList.add("cart-item-image")
		cartItemCoverImg.src = product.image
		cartItemCoverImg.setAttribute("width", "100")
		cartItemCoverImg.setAttribute("height", "100")

		let cartItemTitleSpan = $.createElement("span")
		cartItemTitleSpan.classList.add("cart-item-title")
		cartItemTitleSpan.innerHTML = product.product

		let cartItemPriceSpan = $.createElement("span")
		cartItemPriceSpan.style.color = '#FFFFFF'
		cartItemPriceSpan.className = "cart-price cart-column"
		cartItemPriceSpan.innerHTML = "$" + product.price

		let cartItemQuantityDiv = $.createElement("div")
		cartItemQuantityDiv.className = "cart-quantity cart-column"

		let cartQuantityInput = $.createElement("input")
		cartQuantityInput.classList.add("cart-quantity-input")
		cartQuantityInput.setAttribute("type", "number")
		cartQuantityInput.setAttribute("min", "1")
		cartQuantityInput.value = product.count
		cartQuantityInput.addEventListener("change", function () {
			updateProductCount(product.id, cartQuantityInput.value)
		})

		let cartItemDelBtn = $.createElement("button")
		cartItemDelBtn.style.boxShadow = ' 0 0 10px #7FAD39 '
		cartItemDelBtn.className = "btn btn-danger"
		cartItemDelBtn.setAttribute("type", "button")
		cartItemDelBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
		cartItemDelBtn.addEventListener("click", function (e) {
			removeProductFromBasket(product.id)
			calcTotalPrice(userBasket)
		})

		cartItemColumnDiv.append(cartItemCoverImg, cartItemTitleSpan)
		cartItemQuantityDiv.append(cartQuantityInput, cartItemDelBtn)
		cartItemDiv.append(cartItemColumnDiv, cartItemPriceSpan, cartItemQuantityDiv)
		cartContainer.append(cartItemDiv)
	})
}

function removeProductFromBasket(productId) {
	let mainProduct = userBasket.find(function (product) {
		return product.id === productId
	})

	mainProduct.count = 1

	let mainProductIndex = userBasket.indexOf(mainProduct)

	userBasket.splice(mainProductIndex, 1)

	basketProductsGenerator(userBasket)
}

removeAllProductsBtn.addEventListener("click", function () {
	userBasket = []
	basketProductsGenerator(userBasket)
	calcTotalPrice(userBasket)
})

function calcTotalPrice(userBasketArray) {
	let totalPriceValue = 0

	userBasketArray.forEach(function (product) {
		totalPriceValue += product.count * product.price
	})

	cartTotalPrice.innerHTML = "$" + totalPriceValue
}

function updateProductCount(productId, newCount) {
	userBasket.forEach(function (product) {
		if (product.id === productId) {
			product.count = newCount
		}
	})
	calcTotalPrice(userBasket)
}
//vaega shop bascet end

openProduct.addEventListener('click', () => {
	ModalProduct.classList.toggle('open')
})

CloseBtn.addEventListener('click', () => {
	ModalProduct.classList.remove('open');
});




      // 



