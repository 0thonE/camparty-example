const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const { updateDbStatus } = require('./../controllers/health-controller');
const { ObjectID } = require('mongodb');


require('dotenv').config();


const db_url = process.env.DB_HOST;


// Test connection to Mongodb DB
MongoClient.connect(db_url, { useUnifiedTopology: true },
    (err, client) => {
        if (err) {
            updateDbStatus('ERROR: ' + err);
            return;
        }
        console.log("Connected succesfully to DB");
        updateDbStatus('OK');
        client.close();
    }
);


class DbController {

    //this function connects to de DB in the indicated collection & finds all occurrences with the query filter
    find = (collectionName, query) => {


        return new Promise((resolve, reject) => {
            MongoClient.connect(db_url, { useUnifiedTopology: true },
                (err, client) => {
                    if (err) {
                        updateDbStatus('ERROR: ' + err);
                        reject(err)
                        return;
                    }
                    console.log("Connected succesfully to DB");
                    updateDbStatus('OK');

                    const db = client.db();
                    const collection = db.collection(collectionName);

                    resolve({
                        find: function (callback) {
                            collection.find(query).toArray((error, results) => {
                                callback(results);
                                client.close();
                            });
                        }
                    })
                }
            );
        });
    }

    //this function connects to de DB in the indicated collection & finds all occurrences with the filter
    findById = (collectionName, id) => {

        return new Promise((resolve, reject) => {
            MongoClient.connect(db_url, { useUnifiedTopology: true },
                (err, client) => {
                    if (err) {
                        updateDbStatus('ERROR: ' + err);
                        reject(err)
                        return;
                    }
                    console.log("Connected succesfully to DB");
                    updateDbStatus('OK');

                    const db = client.db();
                    const collection = db.collection(collectionName);

                    resolve({
                        findById: function (callback) {
                            collection.find(ObjectID(id)).toArray((error, results) => {
                                console.log(results);
                                callback(results);
                                client.close();
                            });
                        }
                    });
                }
            );
        });
    }


    insert = (collectionName, insertions, writeConcern, ordered) => {

        return new Promise((resolve, reject) => {
            MongoClient.connect(db_url, { useUnifiedTopology: true },
                (err, client) => {
                    if (err || insertions === undefined) {
                        console.log("shouldn't be printing")
                        updateDbStatus('ERROR: ' + (err || 'No data to insert'));
                        reject(err || 'Error: No data to insert')
                        return;
                    }
                    console.log("Connected succesfully to DB");
                    updateDbStatus('OK');

                    const db = client.db();
                    const collection = db.collection(collectionName);

                    resolve({
                        insert: function (callback) {
                            insertions = (Array.isArray(insertions)) ? insertions : [insertions]
                            collection.insertMany(insertions, (error, result) => {
                                try {
                                    callback(error, result);
                                    client.close();
                                } catch (horror) {
                                    client.close();
                                }
                            })

                        }
                    });
                }
            );
        });
    }


    updateOne = (collectionName, filter, update) => {

        return new Promise((resolve, reject) => {
            MongoClient.connect(db_url, { useUnifiedTopology: true },
                (err, client) => {
                    if (err || filter === undefined || update === undefined) {
                        console.log("shouldn't be printing")
                        updateDbStatus('ERROR: ' + (err || 'No data to insert'));
                        reject(err || 'Error: No data to insert')
                        return;
                    }
                    console.log("Connected succesfully to DB");
                    updateDbStatus('OK');

                    const db = client.db();
                    const collection = db.collection(collectionName);

                    resolve({
                        updateOne: function (callback) {

                            collection.updateOne(filter, update, (error, result) => {
                                try {
                                    callback(error, result);
                                    client.close();
                                } catch (horror) {
                                    client.close();
                                }
                            })

                        }
                    });
                }
            );
        });
    }


}

module.exports = new DbController();