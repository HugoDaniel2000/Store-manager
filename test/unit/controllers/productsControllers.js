const sinon = require('sinon');
const { expect } = require('chai');

const productService =  require('../../../services/productService');
const productController =  require('../../../controllers/product/index');
const productsMocks = require('../mocks/productsMocks');

describe('Controllers products tests', () => {
    let req = {};
    let res = {};
    let next = {};
    before(()=> {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()
    })
  describe('Test controller that list all products', () => {

    describe('When there are no products registered in the database', async() => {

      before(() => {
        sinon.stub(productService, 'getAll').resolves({code: 200, payload: productsMocks.dataEmpty});
      });

      after(() => {
        productService.getAll.restore();
      });

      it('Response is called with status code 200', async () => {
    let req = {};
        await productController.getAllProduct(req, res, next);

        expect(res.status.calledWith(200)).to.be.equal(true);
      })

      it('res.json() is called by passing an empty array', async () => {
    let req = {};
        await productController.getAllProduct(req, res);
        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)
        expect(res.json.calledWith(productsMocks.dataEmpty)).to.be.equal(true);
      })
    })

    describe('When there are products registered in the database', async() => {

      before(() => {
        sinon.stub(productService, 'getAll').resolves({code: 200, payload: productsMocks.allProducts});
      });

      after(() => {
        productService.getAll.restore();
      });

      it('Response is called with status code 200', async () => {
    let req = {};
        await productController.getAllProduct(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)
        expect(res.json.calledWith(productsMocks.allProducts)).to.be.equal(true);
      })
    })
  });

  describe('Test conrtroller that list for products by id', async () =>{
    describe('existing product', () => {
      before(() => {
        sinon.stub(productService, 'getById').resolves({code: 200, payload: productsMocks.productById},
          req.params = {id: 1}
          );
        });

        after(() => {
          productService.getById.restore();
        });

        it('status code 200', async () => {
          await productController.getByIdProduct(req, res);
          expect(res.status.calledWith(200)).to.be.equal(true);
          expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)
          expect(res.json.calledWith(productsMocks.productById)).to.be.equal(true);
      })
  })

  describe('not existing product', async () =>{
    before(() => {
      sinon.stub(productService, 'getById').resolves({code: 200, payload: { message: 'Product not found' }},
        req.params = {id: 9999}
        );
    });

    after(() => {
      productService.getById.restore();
    });

    it('status code 200', async () => {
      await productController.getByIdProduct(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
  })

})});

  describe('Test controller that registers product', () =>{
    describe('register success', () => {
      before(() => {
        sinon.stub(productService, 'register').resolves({code: 201, payload: productsMocks.createProduct},
          req.body = {
          name: "product",
          quantity: 100
        }
          );
        });

        after(() => {
          productService.register.restore();
        });

        it('status code 201', async () => {
          await productController.registerPoduct(req, res);
          expect(res.status.calledWith(201)).to.be.equal(true);
          expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)
          expect(res.json.calledWith(productsMocks.createProduct)).to.be.equal(true);
      })
    },300000)
  });

  describe('Test conrtroller that removes product', () =>{
    describe('successfully remove', () => {
      before(() => {
        sinon.stub(productService, 'remove').resolves({code: 204}, req.params = {id: 2});
        });

        after(() => {
          productService.remove.restore();
        });

        it('status code 204', async () => {
          await productController.removeProduct(req, res);
          expect(res.status.calledWith(204)).to.be.equal(true);
        })
      })


  describe('invalid removal', () => {
    before(() => {
      sinon.stub(productService, 'remove').resolves({code: 404, payload: { message: 'Product not found' } }, req.params = {id: 99999});
      });

      after(() => {
        productService.remove.restore();
      });

      it('status code 404', async () => {
        await productController.removeProduct(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      })
    })
  });

  describe('Test controller that updates a product', () =>{
    describe('update success', () => {
      before(() => {
      sinon.stub(productService, 'update').resolves({code: 200},
        req.params = {id: 2},
        req.body = productsMocks.createProduct);
        });

        after(() => {
          productService.update.restore();
        });

        it('status code 200', async () => {
          await productController.updateProduct(req, res);
          expect(res.json.calledWith(sinon.match.object)).to.be.equal(true)
          expect(res.status.calledWith(200)).to.be.equal(true);
        })
      })

      describe('update falid', () => {
        before(() => {
        sinon.stub(productService, 'update').resolves({code: 404, payload: {message: 'Product not found' }},
          req.params = {id: 9999},
          req.body = productsMocks.createProduct);
          });
          after(() => {
            productService.update.restore();
          });
          it('status code 404', async () => {
            await productController.updateProduct(req, res);
            expect(res.status.calledWith(404)).to.be.equal(true);
            expect(res.json.calledWith({message: 'Product not found' })).to.be.equal(true);
          })
        })
    });
});