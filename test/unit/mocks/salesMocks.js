const allSalesProducts = [
  {
    sale_id: 1,
    date: "2022-03-31 13:19:34",
    product_id: 1,
    quantity: 5,
  },
  {
    sale_id: 1,
    date: "2022-03-31 13:19:34",
    product_id: 2,
    quantity: 10,
  },
  {
    sale_id: 2,
    date: "2022-03-31 13:19:34",
    product_id: 3,
    quantity: 15,
  },
];


const salesById = [
  {
    date: "2022-03-31 13:19:34",
    product_id: 1,
    quantity: 5,
  },
  {
    date: "2022-03-31 13:19:34",
    product_id: 2,
    quantity: 10,
  },
];

const createSale = [{
  saleId: 1,
  itemUpdated: [
    {
      productId: 1,
      quantity: 10
    }
  ]
}];

const dataEmpty= [];

module.exports = {
  allSalesProducts,
  salesById,
  createSale,
  dataEmpty
};