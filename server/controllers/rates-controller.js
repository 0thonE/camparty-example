
const MyDB = require('./db-controller')
const RateModel = require('../models/rate-model');
const CampsController = require('../controllers/camps-controller');

class Rates {

    // this function retrives all the documents in the rates collection
    getAll = (req, res) => {
        MyDB.find('rates').
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

    // this function filters by the query in the rates collection, it takes the query from the req query
    getByQuery = (req, res) => {

        MyDB.find('rates', req.query).
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

    // this function filters by id trough the  rates collection, it takes the id from the route param
    getById = (req, res) => {

        MyDB.findById('rates', req.params.id).
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

    // this function filters by id trough the  rates collection, it takes the id from the route param
    getByCampId = (req, res) => {

        MyDB.find('rates', { campId: req.params.id }).
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

    // this function creates a new comment of a camping place
    addNew = (req, res) => {

        // check user is valid and complies with the model
        let newRate;
        try {
            newRate = new RateModel(req.body)
        } catch (error) {
            res.status(400).send("Error: Rate invalid information\n" + error)
            res.end();
        }

        let rateBody = newRate.getRate();

        MyDB.insert('rates', rateBody).
            then((collection) => {
                collection.insert((error, result) => {
                    if (error) {
                        // save the msg description of the error to evaluate it
                        let tempErrmsg = error.writeErrors[0].err.errmsg;

                        // check if the error is because the email or username already exists, or if is for other reason
                        let [errStatus, errmsg] = (tempErrmsg.includes("RatedCampByUserUniqueIndex")) ?
                            [409, "This user has already rated this place"] : [418, error];

                        if (errStatus === 409) {
                            let { value, userId, campId, ...restRate } = { ...rateBody }
                            this.updateRate(req, res, { userId, campId }, { $set: { value } });
                            return;
                        }

                        res.status(errStatus).send(errmsg);
                        res.end();
                    } else if (result.result.n !== result.ops.length) {
                        res.status(400).send(`Couldn't do all insertions\n${result.result.n} out of ${result.ops.length} insertions where made`);
                        res.end();
                    }
                    res.status(201).send(`Sueccess\n${result.result.n} out of ${result.ops.length} insertions where made`);
                    CampsController.updateCamp(req, res);
                    res.end();
                })
            }).catch((error) => {
                res.status(500).send('' + error)
                res.end()
            })
    }


    updateRate = (req, res, filter, update) => {

        // check for optional arguments and fill them if empty
        filter = (filter) ? filter : req.query;
        update = (update) ? update : req.body;

        let campRateValue = (update.$set) ? update.$set.value : update.value;

        update = (Object.keys(update).some(function (k) { return ~k.indexOf("$") }))
            ? update : { $set: update };


        MyDB.updateOne('rates', filter, update).
            then((collection) => {
                collection.updateOne((error, result) => {
                    if (error) {
                        res.status(500).send(error);
                        res.end();
                    }
                    res.status(200).send(`Sueccessful update\n${result.result.nModified} changes where made to ${result.result.n} properties`);
                    CampsController.updateCamp(req, res, { campId: filter.campId }, { $inc: {rateValue:campRateValue,rateCount:1} });
                    // res.end();
                })
            }).catch((error) => {
                res.status(500).send('' + error)
                res.end()
            })
    }
}


module.exports = new Rates();