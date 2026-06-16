let productNameInput = document.getElementById("productName"),
  productPriceInput = document.getElementById("productPrice"),
  productCategoryInput = document.getElementById("productCategory"),
  productDescriptionInput = document.getElementById("productDescription"),
  productImageInput = document.getElementById("productImage"),
  searchInput = document.getElementById("searchInput");

  
let productList = [];
let btnAdd = document.getElementById("btnAdd");
let btnUpdate = document.getElementById("btnUpdate");
let currentIndex = 0;

if (localStorage.getItem("productContainer")) {
  productList = JSON.parse(localStorage.getItem("productContainer"));
  displayData();
}

function addProduct() {
  if (
     validateInputs(productNameInput, "alertName")&&
     validateInputs(productPriceInput, "alertPrice")&&
     validateInputs(productCategoryInput, "alertCategory")&&
     validateInputs(productDescriptionInput, "alertDescription")&&
     validateInputs(productImageInput, "alertImage")
    // validateName() &&
    // validatePrice() &&
    // validateCategory() &&
    // validateDescription() &&
    // validateImage()
  ) {
    let product = {
      name: productNameInput.value.trim(),
      price: productPriceInput.value,
      category: productCategoryInput.value.trim(),
      description: productDescriptionInput.value.trim(),
      image: productImageInput.files[0]
        ? `images/Products/${productImageInput.files[0].name}`
        : "images/Products/OPPO Reno10.jpg",
    };

    productList.push(product);

    localStorage.setItem("productContainer", JSON.stringify(productList));

    displayData();

    clearForm();
  }
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;

  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
}

function createCols(currIndex) {
  let regExp = new RegExp(searchInput.value, "gi");
  return `  <div class="col-md-6 col-lg-3">
            <div class="card h-100">
              <img
                src="${productList[currIndex].image}"
                class="card-img-top product-img w-100 h-100 objec-fit-cover"
                alt="${productList[currIndex].name}"
              />
              <div class="card-body text-center">
                <span class="badge bg-info">ID: ${currIndex + 1}</span>
                <h3 class="product-name">${productList[currIndex].name}</h3>
                <p class="product-price">${productList[currIndex].price}</p>
                <p class="product-category">${
                  productList[currIndex].category
                }</p>
                <p class="product-desc">${
                  productList[currIndex].description
                }</p>
              </div>
              <div class="card-footer text-center">
                <button onclick="deleteProduct(${currIndex})" class="btn btn-outline-danger btn-sm">
                  <i class="icon fa-solid fa-trash-can"></i>
                </button>
                <button onclick="setUpdateInfo(${currIndex})" class="btn btn-outline-warning btn-sm">
                  <i class="icon fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </div>
          </div>`;
}

function displayData() {
  let box = "";

  for (let i = 0; i < productList.length; i++) {
    box += createCols(i);
  }

  document.getElementById("row").innerHTML = box;
}

function deleteProduct(index) {
  // console.log(index);
  productList.splice(index, 1);
  displayData();
  localStorage.setItem("productContainer", JSON.stringify(productList));
}

function searchItem() {
  let customSearchValue = searchInput.value;
  let box = "";

  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(customSearchValue.toLowerCase())
    )
      box += createCols(i);
  }
  document.getElementById("row").innerHTML = box;
}

function setUpdateInfo(index) {
  currentIndex = index;

  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updateItem() {
  let product = {
    name: productNameInput.value.trim(),
    price: productPriceInput.value,
    category: productCategoryInput.value.trim(),
    description: productDescriptionInput.value.trim(),
    image: productImageInput.files[0]
      ? `images/Products/${productImageInput.files[0].name}`
      : "images/Products/OPPO Reno10.jpg",
  };

  clearForm();

  productList.splice(currentIndex, 1, product);

  localStorage.setItem("productContainer", JSON.stringify(productList));

  displayData();

  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
}

// function validateName() {
//   // console.log("hello");
//   // console.log(productNameInput.value);

//   let regex = /^[a-zA-Z][a-zA-Z0-9 ]{2,19}$/;
//   let input = productNameInput.value;
//   let alert = document.getElementById("alertName");

//   if (regex.test(input)) {
//     console.log("match");
//     productNameInput.classList.add("is-valid");
//     productNameInput.classList.remove("is-invalid");
//     alert.classList.add("d-none");
//     return true;
//   } else {
//     console.log("Nomatch");
//     productNameInput.classList.add("is-invalid");
//     productNameInput.classList.remove("is-valid");
//     alert.classList.remove("d-none");
//     return false;
//   }
// }

// function validatePrice() {
//   // console.log("hello");
//   // console.log(productNameInput.value);

//   let regex = /^\d{1,10}(\.\d{1,2})?$/;
//   let input = productPriceInput.value;
//   let alert = document.getElementById("alertPrice");

//   if (regex.test(input)) {
//     console.log("match");
//     productPriceInput.classList.add("is-valid");
//     productPriceInput.classList.remove("is-invalid");
//     alert.classList.add("d-none");
//     return true;
//   } else {
//     console.log("Nomatch");
//     productPriceInput.classList.add("is-invalid");
//     productPriceInput.classList.remove("is-valid");
//     alert.classList.remove("d-none");
//     return false;
//   }
// }
// function validateCategory() {
//   // console.log("hello");
//   // console.log(productNameInput.value);

//   let regex = /(tv|mobile|screens|electronic)/;
//   let input = productCategoryInput.value;
//   let alert = document.getElementById("alertCategory");

//   if (regex.test(input)) {
//     console.log("match");
//     productCategoryInput.classList.add("is-valid");
//     productCategoryInput.classList.remove("is-invalid");
//     alert.classList.add("d-none");
//     return true;
//   } else {
//     console.log("Nomatch");
//     productCategoryInput.classList.add("is-invalid");
//     productCategoryInput.classList.remove("is-valid");
//     alert.classList.remove("d-none");
//     return false;
//   }
// }

// function validateDescription() {
//   // console.log("hello");
//   // console.log(productNameInput.value);

//   let regex = /^.{3,}$/;
//   let input = productDescriptionInput.value;
//   let alert = document.getElementById("alertDescription");

//   if (regex.test(input)) {
//     console.log("match");
//     productDescriptionInput.classList.add("is-valid");
//     productDescriptionInput.classList.remove("is-invalid");
//     alert.classList.add("d-none");
//     return true;
//   } else {
//     console.log("Nomatch");
//     productDescriptionInput.classList.add("is-invalid");
//     productDescriptionInput.classList.remove("is-valid");
//     alert.classList.remove("d-none");
//     return false;
//   }
// }

// function validateImage() {
//   // console.log("hello");
//   // console.log(productNameInput.value);

//   let regex = /^.{1,}(jpg|png|svg|jpeg|avif)$/;
//   let input = productImageInput.value;
//   let alert = document.getElementById("alertImage");

//   if (regex.test(input)) {
//     console.log("match");
//     productImageInput.classList.add("is-valid");
//     productImageInput.classList.remove("is-invalid");
//     alert.classList.add("d-none");
//     return true;
//   } else {
//     console.log("Nomatch");
//     productImageInput.classList.add("is-invalid");
//     productImageInput.classList.remove("is-valid");
//     alert.classList.remove("d-none");
//     return false;
//   }
// }

function validateInputs(inputElement, alertId) {
  let regex = {
    productName: /^[a-zA-Z][a-zA-Z0-9 ]{2,19}$/,
    productPrice: /^\d{1,10}(\.\d{1,2})?$/,
    productCategory: /(tv|mobile|screens|electronic)/,
    productDescription: /^.{3,}$/,
    productImage: /^.{1,}(jpg|png|svg|jpeg|avif)$/,
  };
  let inputValue = inputElement.value;
  let alertElement = document.getElementById(alertId);

  if (regex[inputElement.id].test(inputValue)) {
    // console.log("match");
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
    alertElement.classList.add("d-none");
    return true;
  } else {
    // console.log("no match");
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
    alertElement.classList.remove("d-none");
    return false;
  }
}


