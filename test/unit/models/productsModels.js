const sinon = require("sinon");
const { expect } = require("chai");

const connection  = require("../../../models/connection");
const productsModels = require('../../../models/productModel');
const productsMocks = require('../mocks/productsMocks');

describe('2 - Model products tests', () => {

  describe('Test model that list all products', () => {

    describe('returns all products', async () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves( [ productsMocks.allProducts ]);
      });

      after(() => {
        connection.execute.restore();
      });


      it('checks if it returns all products', async () => {
        const result = await productsModels.getAll();
        expect(result).to.eql(productsMocks.allProducts)
      })
    })

  });

  describe('Test model that list for products by id', async () =>{
    describe('get product by id', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves( productsMocks.productById2 );
      });

      after(() => {
        connection.execute.restore();
      });

        it('returns the product that contains the order id', async () => {
          const result = await productsModels.getById(1);
          expect(result).to.eql(productsMocks.productById );
        })
    })
  })


  describe('Test model that registers product', () =>{
    describe('Register product', () => {
      before(() => {
        const product =  [{ insertId: 100 }]
        sinon.stub(connection, 'execute').resolves( product ,productsMocks.createProduct2 );
      });

      after(() => {
        connection.execute.restore();
      });
        it('return product registered', async () => {
          const {name, quantity} = productsMocks.createProductParamsSuccess
          const result = await productsModels.register(name, quantity);
          expect(result).to.be.eql(productsMocks.createProduct );
        })

      })
    })

  describe('Test service that removes product', () =>{
    describe('Remove Product', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves( "2" );
      });

      after(() => {
        connection.execute.restore();
      });

        it('existing product', async () => {
          const result = await productsModels.remove(2);
          expect(result).to.be.equal(2)
        })
      })

  });

  describe('Test service that updates a product', () =>{
    describe('Update product', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves(productsMocks.productById);
      });

      after(() => {
        connection.execute.restore();
      });

        it('not existing product', async () => {
          const { name, quantity } = productsMocks.productById
          const result = await productsModels.update(name, quantity, 1);
          expect(result).to.be.eql(productsMocks.productById)
        })
      })
    });
});