const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const db = require('../config/db.config');
const Seller = require('../models/seller.model');

describe('Seller Model', () => {
    describe('getAll', () => {
        it('should return all sellers with their total sales', (done) => {
            // Mock the database query result
            const mockResults = [
                { id: 1, name: 'Seller #1', total: 2000 },
                { id: 2, name: 'Seller #2', total: 1500 }
            ];

            // Stub the db.query() method to simulate the database interaction
            sinon.stub(db, 'query').callsFake((query, callback) => {
                callback(null, mockResults);
            });

            // Call the getAll method
            Seller.getAll((err, results) => {
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
            Seller.getAll((err, results) => {
                expect(err).to.equal(mockError); // should return the mock error
                expect(results).to.be.null; // should return null results

                // Restore the stubbed method
                db.query.restore();
                done();
            });
        });
    });
});
