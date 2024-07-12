const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const fetchProducts = async (categoryname, top = 10, minPrice = "1", maxPrice = "10000", page = 1, sort = 'rating', order = 'desc') => {
  const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
  const allProducts = [];

  for (const company of companies) {
    console.log(top);
    const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });
    console.log(response.data);
    allProducts.push(...response.data.slice(0, top).map((product) => ({
      ...product,
      id: uuidv4(),
      company
    })));
  }

  
  allProducts.sort((a, b) => {
    if (order === 'asc') {
      return a[sort] - b[sort];
    } else {
      return b[sort] - a[sort];
    }
  });

  const pageSize = 10; 
  const totalProducts = allProducts.length;
  console.log(totalProducts);
  const totalPages = Math.ceil(totalProducts / pageSize);

  let startIndex = (page - 1) * pageSize;
  let endIndex = startIndex + pageSize;

  if (top <= pageSize || startIndex + pageSize > top) {
    endIndex = Math.min(startIndex + pageSize, top);
  }

  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  return {
    page,
    totalPages,
    products: paginatedProducts
  };
};

module.exports = {
  fetchProducts
};

const fetchProductDetails = async (categoryname, productid) => {
  const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
  
  for (const company of companies) {
    const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products`;
    const response = await apiClient.get(url);
    const product = response.data.find((product) => product.id === productid);
    if (product) {
      return { ...product, company };
    }
  }

  throw new Error('Product not found');
};

module.exports = {
  fetchProducts,
  fetchProductDetails,
};
