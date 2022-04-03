const sinon = require('sinon');
const { expect } = require('chai');

const productsModels = require('../../../models/productModel');
const productService =  require('../../../services/productService');
const productsMocks = require('../mocks/productsMocks');

describe('Service products tests', () => {

    describe('Test service that list all products', () => {

      describe('returns all products', async() => {

        before(() => {
          sinon.stub(productsModels, 'getAll').callsFake(() => productsMocks.allProducts);
        });

        after(() => {
          productsModels.getAll.restore();
        });

        it('check if it is an array', async () => {
          const result = await productService.getAll();
          expect(result.payload).to.be.an('array');
        })

        it('checks if it returns all products', async () => {
          const result = await productService.getAll();
          const obj = {code: 200, payload: productsMocks.allProducts }
          expect(result).to.eql(obj)
        })
      })

      describe('When there are not products registered in the database', async() => {

        before(() => {
          sinon.stub(productsModels, 'getAll').callsFake(() => productsMocks.dataEmpty);
        });

        after(() => {
          productsModels.getAll.restore();
        });

        it('returns empty array', async () => {
          const result = await productService.getAll();
          expect(result.payload).to.be.an('array');
          expect(result.payload).to.have.length(0)
        })
      })
    });

    describe('Test service that list for products by id', async () =>{
      describe('existing product', () => {
        before(() => {
          sinon.stub(productsModels, 'getById').callsFake((id) => {
            const getId = productsMocks.allProducts.find((e) => e.id === id)
            return getId ? [getId]: { message: 'Product not found' }
            });
          });

          after(() => {
            productsModels.getById.restore();
          });

          it('returns the product that contains the order id', async () => {
            const result = await productService.getById(1);
            // result
            const obj = {code: 200, payload: productsMocks.productById2[0] }
            expect(result).to.eql(obj);
          })
      })

      describe('not existing product', async () => {
          before(() => {
            sinon.stub(productsModels, 'getById').callsFake((id) => {
              const getId = productsMocks.allProducts.find((e) => e.id === id)
              return getId ? [getId] : { message: 'Product not found' }
            });
          });

          after(() => {
            productsModels.getById.restore();
          });

          it('return erro massage', async () => {
            const result = await productService.getById(999);
            const obj = {code: 404, payload: { message: 'Product not found' }}
            expect(result).to.be.eql(obj);
        })
      })
    })


    describe('Test service that registers product', () =>{
      describe('register success and register falid', () => {
        before(() => {
          sinon.stub(productsModels, 'register').callsFake((name) => {
            const product = productsMocks.allProducts.find((e) => e.name === name )
            return product ?  { message: 'Product already exists' } : productsMocks.createProduct })
          sinon.stub(productsModels, 'getAll').callsFake(() => productsMocks.allProducts)
          });

          after(() => {
            productsModels.register.restore();
            productsModels.getAll.restore();
          });

          it('return product registered', async () => {
            const {name, quantity} = productsMocks.createProductParamsSuccess
            const result = await productService.register(name, quantity);
            const obj =  { code: 201, payload: productsMocks.createProduct }
            expect(result).to.be.eql(obj);
          })

          it('return massage "product already registered"', async () => {
            const {name, quantity} = productsMocks.createProductParamFalid
            const result = await productService.register(name, quantity);
            const obj =  { code: 409, payload: { message: 'Product already exists' } }
            expect(result).to.be.eql(obj);
          })
        })
      })

    describe('Test service that removes product', () =>{
      describe('successfully remove and remove falid', () => {
        before(() => {
          sinon.stub(productsModels, 'remove').callsFake((id) => null)
          sinon.stub(productsModels, 'getById').callsFake((id) => {
            const product = productsMocks.allProducts.find((e) => e.id === id )
            return product ? [product] : {} })
          });

          after(() => {
            productsModels.remove.restore();
            productsModels.getById.restore();
          });

          it('existing product', async () => {
            const result = await productService.remove(2);
            expect(result.code).to.be.equal(204)
          })

          it('not existing product', async () => {
            const result = await productService.remove(99999);
            expect(result).to.be.eql({ code: 404, payload: { message: 'Product not found' }} )
          })
        })

    });

    describe('Test service that updates a product', () =>{
      describe('update success and falid', () => {
        before(() => {
          sinon.stub(productsModels, 'update').callsFake((id) => productsMocks.productById )
          sinon.stub(productsModels, 'getById').callsFake((id) => {
            const product = productsMocks.allProducts.find((e) => e.id === id )
            return product ? [product] : {} })
          });

          after(() => {
            productsModels.update.restore();
            productsModels.getById.restore();
          });

          it('existing product', async () => {
            const { name, quantity, id } = productsMocks.productById
            const result = await productService.update(name, quantity, id);
            const obj = {code: 200, payload: productsMocks.productById }
            expect(result).to.be.eql(obj)
          })

          it('not existing product', async () => {
            const { name, quantity } = productsMocks.productById
            const result = await productService.update(name, quantity, 9999);
            const obj = { code: 404, payload: { message: 'Product not found' }}
            expect(result).to.be.eql(obj)
          })
        })
      });
});