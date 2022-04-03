const sinon = require("sinon");
const { expect } = require("chai");

const connection  = require("../../../models/connection");
const salesModels = require('../../../models/saleModel');
const salesMocks = require('../mocks/salesMocks');

describe('2 - Model sales tests', () => {

  describe('Test model that list all products', () => {

    describe('returns all sales', async () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves( [ salesMocks.allProducts ]);
      });

      after(() => {
        connection.execute.restore();
      });


      it('checks if it returns all sales', async () => {
        const result = await salesModels.getAll();
        console.log(result);
        expect(result).to.eql(salesMocks.allProducts)
      })
    })

  });

  describe('Test model that list for sales by id', async () =>{
    describe('get sales by id', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves( [salesMocks.salesById] );
      });

      after(() => {
        connection.execute.restore();
      });

        it('returns the product that contains the order id', async () => {
          const result = await salesModels.getById(1);
          expect(result).to.eql(salesMocks.salesById );
        })
    })
  })


  describe('Test model that create sales', () =>{
    describe('Create sales', () => {
      before(() => {
        const product =  [{ insertId: 1 }]
        sinon.stub(connection, 'query').resolves( product ,salesMocks.createSale2 );
      });

      after(() => {
        connection.query.restore();
      });
        it('return sale created', async () => {
          const sale = salesMocks.salesInsert
          const result = await salesModels.create(sale);
          expect(result).to.be.eql(salesMocks.createSale2);
        })

      })
    })

    // describe('Test model that removes sales', () =>{
    //   describe('Remove sales', () => {
    //     before(() => {
    //       sinon.stub(connection, 'execute').resolves( "2" );
    //       sinon.stub(salesModels, 'increasedQuantityProduct').resolves(salesMocks.salesById)
    //     });

    //     after(() => {
    //       connection.execute.restore();
    //       salesModels.increasedQuantityProduct.restore();
    //     });

    //       it('existing product', async () => {
    //         await salesModels.increasedQuantityProduct(2)
    //         const result = await salesModels.remove(2);
    //         expect(result).to.be.equal(2)
    //       })
    //     })
    // });

  describe('Test model that updates a sale', () =>{
    describe('Update sale', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([salesMocks.salesInsert] );
      });

      after(() => {
        connection.execute.restore();
      });

        it('not existing product', async () => {
          const sale = salesMocks.salesInsert
          const result = await salesModels.update(1, sale);
          expect(result).to.be.eql(salesMocks.updateSale)
        })
      })
    });
});