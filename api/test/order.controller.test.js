const chai = require('chai');
var expect = chai.expect
const sinon = require('sinon');
const Order = require('../models/order.model');
const orderController = require('../controllers/order.controller');

describe('Order Controller', () => {
    describe('getAllOrders', () => {
        it('should return all orders', (done) => {
            // Mock the data that Order.getAll() should return
            const mockOrders = [
                { orderId: 1, product: 'Laptop #1', seller: 1, country: 'BRA', price: 1000 },
                { orderId: 2, product: 'Laptop #2', seller: 2, country: 'USA', price: 1500 }
            ];

            // Stub the Order.getAll() method to return the mock data
            sinon.stub(Order, 'getAll').callsFake((callback) => {
                callback(null, mockOrders);
            });

            // Mock the req and res objects
            const req = {};
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            // Call the controller method
            orderController.getAllOrders(req, res);

            // Assertions
            expect(res.status.called).to.be.false; // should not call res.status() as there is no error
            expect(res.json.calledOnce).to.be.true; // should call res.json() once
            expect(res.json.firstCall.args[0]).to.deep.equal(mockOrders); // should pass the mockOrders to res.json()

            // Restore the stubbed method
            Order.getAll.restore();
            done();
        });

        it('should handle error when Order.getAll() fails', (done) => {
            // Stub the Order.getAll() method to simulate an error
            const mockError = new Error('Database error');
            sinon.stub(Order, 'getAll').callsFake((callback) => {
                callback(mockError, null);
            });

            // Mock the req and res objects
            const req = {};
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            // Call the controller method
            orderController.getAllOrders(req, res);

            // Assertions
            expect(res.status.calledOnce).to.be.true; // should call res.status() once
            expect(res.status.firstCall.args[0]).to.deep.equal(500); // should set status to 500
            expect(res.json.calledOnce).to.be.true; // should call res.json() once
            expect(res.json.firstCall.args[0]).to.deep.equal({
                message: 'Error retrieving orders',
                error: mockError
            });

            // Restore the stubbed method
            Order.getAll.restore();
            done();
        });
    });
});
