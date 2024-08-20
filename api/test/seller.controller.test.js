const chai = require('chai');
var expect = chai.expect
const sinon = require('sinon');
const Seller = require('../models/seller.model');
const sellerController = require('../controllers/seller.controller');

describe('Seller Controller', () => {
    describe('getAllSellers', () => {
        it('should return all sellers', (done) => {
            // Mock the data that Seller.getAll() should return
            const mockSellers = [
                { id: 1, name: 'Seller #1', total: 2000 },
                { id: 2, name: 'Seller #2', total: 1500 }
            ];

            // Stub the Seller.getAll() method to return the mock data
            sinon.stub(Seller, 'getAll').callsFake((callback) => {
                callback(null, mockSellers);
            });

            // Mock the req and res objects
            const req = {};
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            // Call the controller method
            sellerController.getAllSellers(req, res);

            // Assertions
            expect(res.status.called).to.be.false; // should not call res.status() as there is no error
            expect(res.json.calledOnce).to.be.true; // should call res.json() once
            expect(res.json.firstCall.args[0]).to.deep.equal(mockSellers); // should pass the mockSellers to res.json()

            // Restore the stubbed method
            Seller.getAll.restore();
            done();
        });

        it('should handle error when Seller.getAll() fails', (done) => {
            // Stub the Seller.getAll() method to simulate an error
            const mockError = new Error('Database error');
            sinon.stub(Seller, 'getAll').callsFake((callback) => {
                callback(mockError, null);
            });

            // Mock the req and res objects
            const req = {};
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            // Call the controller method
            sellerController.getAllSellers(req, res);

            // Assertions
            expect(res.status.calledOnce).to.be.true; // should call res.status() once
            expect(res.status.firstCall.args[0]).to.deep.equal(500); // should set status to 500
            expect(res.json.calledOnce).to.be.true; // should call res.json() once
            expect(res.json.firstCall.args[0]).to.deep.equal({
                message: 'Error retrieving sellers',
                error: mockError
            });

            // Restore the stubbed method
            Seller.getAll.restore();
            done();
        });
    });
});
