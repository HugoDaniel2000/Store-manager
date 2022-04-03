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
        sinon.stub(connection, 'execute').resolves( product ,[salesMocks.createSale] );
      });

      after(() => {
        connection.execute.restore();
      });
        it('return sale created', async () => {
          const sale = salesMocks.salesInsert
          const result = await salesModels.create(sale);
          expect(result).to.be.eql(salesMocks.createSale);
        })

      })
    })

  // describe('Test service that removes product', () =>{
  //   describe('Remove Product', () => {

  //       it('existing product', async () => {
  //       })
  //     })

  // });

  describe('Test service that updates a sale', () =>{
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