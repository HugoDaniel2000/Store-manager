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
];

const createSale = [{
  saleId: 1,
  itemsSold: [
    {
      productId: 2,
      quantity: 10
    }
  ]
}];

const updateSale = [{
  saleId: 1,
  itemUpdated: [
    {
      productId: 2,
      quantity: 10
    }
  ]
}];

const salesInsert = [
  {
    productId: 2,
    quantity: 10
  }
]

const dataEmpty= [];

module.exports = {
  allSalesProducts,
  salesById,
  createSale,
  dataEmpty,
  salesInsert,
  updateSale
};