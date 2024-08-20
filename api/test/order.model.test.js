const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const db = require('../config/db.config');
const Order = require('../models/order.model');

describe('Order Model', () => {
    describe('getAll', () => {
        it('should return all orders with seller as sellers name', (done) => {
            // Mock the database query result
            const mockResults = [
                { orderId: 1, product: 'Laptop #1', seller: "Seller #1", country: 'BRA', price: 1000 },
                { orderId: 2, product: 'Laptop #2', seller: "Seller #2", country: 'USA', price: 1500 }
            ];

            // Stub the db.query() method to simulate the database interaction
            sinon.stub(db, 'query').callsFake((query, callback) => {
                callback(null, mockResults);
            });

            // Call the getAll method
            Order.getAll((err, results) => {
                expect(err).to.be.null; // should not be an error
                expect(results).to.deep.equal(mockResults); // should return the mock results

                // Restore the stubbed method
                db.query.restore();
                done();
            });
        });

        it('should handle errors when the database query fails', (done) => {
            // Mock an error
            const mockError = new Error('Database error');

            // Stub the db.query() method to simulate a database error
            sinon.stub(db, 'query').callsFake((query, callback) => {
                callback(mockError, null);
            });

            // Call the getAll method
            Order.getAll((err, results) => {
                expect(err).to.equal(mockError); // should return the mock error
                expect(results).to.be.null; // should return null results

                // Restore the stubbed method
                db.query.restore();
                done();
            });
        });
    });
});
