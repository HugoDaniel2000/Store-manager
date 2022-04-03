const sinon = require('sinon');
const { expect } = require('chai');

const salesService =  require('../../../services/saleService');
const salesController =  require('../../../controllers/sales/index');
const salesMocks = require('../mocks/salesMocks');

describe('1 - Controllers sales tests', () => {

  let req = {};
  let res = {};

  before(()=> {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()
  })
describe(' Test controller that list all sales', () => {

  describe('When there are no sales registered in the database', async() => {

    before(() => {
      sinon.stub(salesService, 'getAll').resolves({code: 200, payload: salesMocks.dataEmpty});
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('Response is called with status code 200', async () => {
  let req = {};
      await salesController.getAllSales(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    })

    it('res.json() is called by passing an empty array', async () => {
  let req = {};
      await salesController.getAllSales(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)
      expect(res.json.calledWith(salesMocks.dataEmpty)).to.be.equal(true);
    })
  })

  describe('When there are sales registered in the database', async() => {

    before(() => {
      sinon.stub(salesService, 'getAll').resolves({code: 200, payload: salesMocks.allSalesProducts});
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('Response is called with status code 200', async () => {
  let req = {};
      await salesController.getAllSales(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)
      expect(res.json.calledWith(salesMocks.allSalesProducts)).to.be.equal(true);
    })
  })
});

describe('Test sales that list for sale by id', async () =>{
  describe('existing sale', () => {
    before(() => {
      sinon.stub(salesService, 'getById').resolves({code: 200, payload: salesMocks.productById},
        req.params = {id: 1}
        );
      });

      after(() => {
        salesService.getById.restore();
      });

      it('status code 200', async () => {
        await salesController.getByIdSale(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(salesMocks.productById)).to.be.equal(true);
    })
})

describe('not existing sale', async () =>{
  before(() => {
    sinon.stub(salesService, 'getById').resolves({code: 200, payload: { message: 'Sale not found' }},
      req.params = {id: 9999}
      );
  });

  after(() => {
    salesService.getById.restore();
  });

  it('status code 200', async () => {
    await salesController.getByIdSale(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
})

})});

describe('Test controller that registers sale', () =>{
  describe('register success', () => {
    before(() => {
      sinon.stub(salesService, 'create').resolves({code: 201, payload: salesMocks.createProduct},
        req.body = {
        name: "product",
        quantity: 100
      }
        );
      });

      after(() => {
        salesService.create.restore();
      });

      it('status code 201', async () => {
        await salesController.createSales(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
        expect(res.json.calledWith(salesMocks.createProduct)).to.be.equal(true);
    })
  },300000)
});

describe('Test controller that updates a sale', () =>{
  describe('update success', () => {
    before(() => {
    sinon.stub(salesService, 'update').resolves({code: 200},
      req.params = {id: 2},
      req.body = salesMocks.createProduct);
      });

      after(() => {
        salesService.update.restore();
      });

      it('status code 200', async () => {
        await salesController.updateSales(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      })
    })

    describe('update falid', () => {
      before(() => {
      sinon.stub(salesService, 'update').resolves({code: 404, payload: {message: 'Sale not found'}},
        req.params = {id: 9999},
        req.body = salesMocks.createProduct);
        });
        after(() => {
          salesService.update.restore();
        });
        it('status code 404', async () => {
          await salesController.updateSales(req, res);
          expect(res.status.calledWith(404)).to.be.equal(true);
          expect(res.json.calledWith({message: 'Sale not found'})).to.be.equal(true);
        })
      })

      describe('Test conrtroller that removes sales', () =>{
        describe('successfully slaes', () => {
          before(() => {
            sinon.stub(salesService, 'remove').resolves({code: 204}, req.params = {id: 1});
            });
            after(() => {
              salesService.remove.restore();
            });

            it('status code 204', async () => {
              await salesController.removeSale(req, res);
              expect(res.status.calledWith(204)).to.be.equal(true);
            })
          })
        })
  });
});