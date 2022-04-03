const sinon = require('sinon');
const { expect } = require('chai');

const saleModel = require('../../../models/saleModel');
const salesService =  require('../../../services/saleService');
const salesMocks = require('../mocks/salesMocks');

describe('Service sales tests', () => {

    describe('Test service that list all sales', () => {

      describe('returns all products', async() => {

        before(() => {
          sinon.stub(saleModel, 'getAll').callsFake(() => salesMocks.allSalesProducts);
        });

        after(() => {
          saleModel.getAll.restore();
        });

        it('check if it is an array', async () => {
          const result = await salesService.getAll();
          expect(result.payload).to.be.an('array');
        })

        it('checks if it returns all sales', async () => {
          const result = await salesService.getAll();
          const obj = {code: 200, payload: salesMocks.allSalesProducts }
          expect(result).to.eql(obj)
        })
      })

      describe('When there are not products registered in the database', async() => {

        before(() => {
          sinon.stub(saleModel, 'getAll').callsFake(() => salesMocks.dataEmpty);
        });

        after(() => {
          saleModel.getAll.restore();
        });

        it('returns empty array', async () => {
          const result = await salesService.getAll();
          expect(result.payload).to.be.an('array');
          expect(result.payload).to.have.length(0)
        })
      })
    });

    describe('Test service that list for sales by id', async () =>{
      describe('existing product', () => {
        before(() => {
          sinon.stub(saleModel, 'getById').callsFake((id) => {
            const getId = salesMocks.allSalesProducts.filter((e) => e.sale_id === id)
            return !getId.length ? {} : getId
            });
          });

          after(() => {
            saleModel.getById.restore();
          });

          it('returns the sales that contains the order id', async () => {
            const result = await salesService.getById(1);
            const obj = {code: 200, payload: salesMocks.salesById }
            expect(result).to.eql(obj);
          })

          it('not existing sale', async () => {
            const result = await salesService.getById(999);
            const obj = { code: 404, payload: { message: 'Sale not found' } }
            expect(result).to.eql(obj);
          })
      })

      describe('not existing sales', async () => {
        before(() => {
          sinon.stub(saleModel, 'getById').callsFake((id) => {
            const getId = salesMocks.allSalesProducts.filter((e) => e.sale_id === id)
            return !getId.length ? {} : getId
            });
          });

          after(() => {
            saleModel.getById.restore();
          });

          it('return erro massage', async () => {
            const result = await salesService.getById(999);
            const obj = { code: 404, payload: { message: 'Sale not found' } }
            expect(result).to.eql(obj);
          })
        })
      })


    describe('Test service that create sales', () =>{
      describe('create success and create falid', () => {
        before(() => {
          sinon.stub(saleModel, 'create').callsFake(() => salesMocks.createSale )
          });

          after(() => {
            saleModel.create.restore();
          });

          it('return sales created', async () => {
            const sales = salesMocks.salesInsert
            const result = await salesService.create(sales);
            const obj =  { code: 201, payload: salesMocks.createSale}
            expect(result).to.be.eql(obj);
          })
        })
      })

    // describe('Test service that removes product', () =>{
    //   describe('successfully remove and remove falid', () => {
    //     before(() => {
    //       sinon.stub(productsModels, 'remove').callsFake((id) => null)
    //       sinon.stub(productsModels, 'getById').callsFake((id) => {
    //         const product = productsMocks.allProducts.find((e) => e.id === id )
    //         return product ? [product] : {} })
    //       });

    //       after(() => {
    //         productsModels.remove.restore();
    //         productsModels.getById.restore();
    //       });

    //       it('existing product', async () => {
    //         const result = await productService.remove(2);
    //         expect(result.code).to.be.equal(204)
    //       })

    //       it('not existing product', async () => {
    //         const result = await productService.remove(99999);
    //         expect(result).to.be.eql({ code: 404, payload: { message: 'Product not found' }} )
    //       })
    //     })

    // });

    describe('Test service that update sales', () =>{
      describe('update success', () => {

        before(() => {
          sinon.stub(saleModel, 'update').resolves( salesMocks.updateSale )
          });

          after(() => {
            saleModel.update.restore();
          });

          it('return sale update', async () => {
            const sales = salesMocks.salesInsert
            const result = await salesService.update(sales);
            const obj = {code: 200, payload: salesMocks.updateSale}
            expect(result).to.be.eql(obj)
          })
      })
    });
});