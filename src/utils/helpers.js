// helper functions
export function featuredProducts(data) {
  return data.filter((item) => {
    return item.featured === true;
  });
}

export function paginate(products) {
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);
  // const newProducts = Array.from({ length: numberOfPages }, () => {
  //   return products.splice(0, itemsPerPage)
  // });
  const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  });
  return newProducts;
}
