const escape = function(str) {
  // avoid js style inputs affecting the code
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const disable = () => {
    console.log($(this).find('button'))
  }


const createProduct = (data) => {
  let $favButton = `is this item already favorited?`;
  if (!data.user_id) {
    $favButton = `<button type="button" class="btn btn-warning btn-lg btn-sm favorite" ${disabled}>Add to Favorties</button>`;
  } else {
    $favButton = `<button type="button" class="btn btn-warning btn-lg btn-sm favorite favorite-clicked" ${disabled}>Remove from Favorites</button>`
  }
  const disabled = (data.sold) ? `disabled` : ``
  const status = (data.sold) ? `<p class="sold">SOLD</p>` : `<p class="price">$${escape(data.price) / 100}</p>`;

  let $product = `
  <div class="card">
    <p id="product-id" >${escape(data.id)}</p>
    <p id="seller-id" >${escape(data.seller_id)}</p>
    <img src=${escape(data.img_url)} alt="Denim Jeans" style="width:100%">
    <div class='product-details'>
      <h1>${escape(data.name)}</h1>
      <p>${escape(data.description)}</p>
      ${status}
      <p class="contact-owner"><button type="submit" class="btn btn-dark btn-lg btn-sm" ${disabled}>Contact Seller</button></p>
      <p>${$favButton}</p>
      </div>
  </div>
  `;
  return $product
};

const renderProducts = (productData) => {
  for (const product of productData.guitars) {
    // do the favorites check here
    const $product = createProduct(product);
    $('.listings').prepend($product);
  }
};

const loadProducts = () => {
  $.ajax('/api/guitars', {
    method:'GET'
  }).then(res => {
    $('.listings').empty();
    renderProducts(res);
  })
};

$(document).ready(function() {
  loadProducts()
});
