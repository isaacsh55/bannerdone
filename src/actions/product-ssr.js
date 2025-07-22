import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

export async function getProducts() {
  // const res = await axios.get(endpoints.product.list);
  // return res.data;
  const products = await import('src/_mock/_cpproduct.js');
  const res = products.PRODUCT;
  return res;
}

// ----------------------------------------------------------------------

export async function getProduct(id) {
  // Find the product where product_id or id matches the given id
   // const URL = id ? `${endpoints.product.details}?productId=${id}` : '';
  // const res = await axios.get(URL);
  // return res.data;
  const products = await import('src/_mock/_cpproduct.js');
  const res = products.PRODUCT.find(
    (product) => product.product_id == id || product.id == id
  );
  return { product: res }; // Wrap it for destructuring
}

export async function getAddon(){
  const products = await import('src/_mock/_cpproduct.js');
  const res = products.ADDONS;
  console.log( 'addon:', res)
  return res;
}




