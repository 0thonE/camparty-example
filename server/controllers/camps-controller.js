
const MyDB = require('./../controllers/db-controller')
const CampModel = require('../models/camp-model');
const { ObjectID } = require('mongodb');
const socketIO = require("socket.io");

class Camps {

    // this function retrives all the documents in the camps collection
    getAll = (req, res) => {
        MyDB.find('camps').
            then((collection) => {
                collection.find((results) => {
                    res.status(200).send(results);
                    res.end();
                })
            }).catch((error) => {
                res.status(500).send('' + error)
                res.end()
            })

    }

    // this function filters by the query in the collection, it takes the query from the req query
    getByQuery = (req, res) => {
        MyDB.find('camps', req.query).
            then((collection) => {
                collection.find((results) => {
                    res.status(200).send(results);
                    res.end();
                })
            }).catch((error) => {
                res.status(500).send('' + error)
                res.end()
            })

    }

    // this function filters by id trough the collection, it takes the id from the route param
    getById = (req, res) => {

        MyDB.findById('camps', req.params.id).
            then((collection) => {
                collection.findById((results) => {
                    res.status(200).send(results);
                    res.end();
                })
            }).catch((error) => {
                res.status(500).send('' + error)
                res.end()
            })

    }

    // this function creates a new camping place
    addNew = (req, res) => {


        // check user is valid and complies with the model
        let newCamp;
        try {
            newCamp = new CampModel(req.body)
        } catch (error) {
            res.status(400).send("Error: Camp invalid information\n" + error)
            res.end();
        }

        let campBody = newCamp.getCamp();

        MyDB.insert('camps', campBody).
            then((collection) => {
                collection.insert((error, result) => {
                    if (error) {
                        res.status(500).send(error);
                        res.end();
                    } else if (result.result.n !== result.ops.length) {
                        res.status(400).send(`Could do all insertions\n${result.result.n} out of ${result.ops.length} insertions where made`);
                        res.end();
                    }
                    res.status(201).send(`Sueccess\n${result.result.n} out of ${result.ops.length} insertions where made`);
                    res.end();
                })
            }).catch((error) => {
                res.status(500).send('' + error)
                res.end()
            })
    }



    updateCamp = (req, res, filter, update) => {

        // check for optional arguments and fill them if empty
        filter = (filter) ? filter : req.query;
        update = (update) ? update : req.body;

        update = (Object.keys(update).some(function (k) { return ~k.indexOf("$") }))
            ? update : { $set: update };

        if(filter.campId){
            filter={_id:ObjectID(filter.campId)}
        }



        MyDB.updateOne('camps', filter, update).
            then((collection) => {
                collection.updateOne((error, result) => {
                    if (error) {
                        res.status(500).send(error);
                        res.end();
                    }
                    res.status(200).send(`Sueccessful update\n${result.result.nModified} changes where made to ${result.result.n} properties`);
                    res.end();
                })
            }).catch((error) => {
                res.status(500).send('' + error)
                res.end()
            })
    }
}


module.exports = new Camps();