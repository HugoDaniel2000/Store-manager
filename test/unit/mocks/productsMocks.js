const allProducts = [
  {
    id: 1,
    name: "Martelo de Thor",
    quantity: 10
  },
  {
    id: 2,
    name: "Traje de encolhimento",
    quantity: 20
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
    quantity: 30
  }
];

const dataEmpty= [];

const productById = { id: 1, name: "Martelo de Thor", quantity: 10 };
const productById2 = [{ id: 1, name: "Martelo de Thor", quantity: 10 }];

const createProduct = {
  id: 100,
  name: "product",
  quantity: 100
};

const createProduct2 = [{
  id: 100,
  name: "product",
  quantity: 100
}];


const createProductParamsSuccess =  {
  name: "product",
  quantity: 100
}

const createProductParamFalid =  {
  name: "Martelo de Thor",
  quantity: 10
}


module.exports = {
  allProducts,
  productById,
  createProduct,
  dataEmpty,
  productById2,
  createProductParamsSuccess,
  createProductParamFalid,
  createProduct2,
};