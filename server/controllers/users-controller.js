const MyDB = require('./db-controller')
const UserModel = require('../models/user-model')
const { ObjectID } = require('mongodb')
const jwt  = require('jsonwebtoken');
require('dotenv').config();



class Users {

    // this function retrives all the documents in the users collection
    getAll = (req, res) => {
        MyDB.find('users').
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

    // this function filters by the query in the users collection, it takes the query from the req query
    getByQuery = (req, res) => {

        MyDB.find('users', req.query).
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

    // this function filters by id trough the  users collection, it takes the id from the route param
    getById = (req, res) => {

        MyDB.findById('users', req.params.id).
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

    // this function creates a new comment of a camping place
    addNew = (req, res) => {

        // check user is valid and complies with the model
        let newUser;
        try {
            newUser = new UserModel(req.body)
        } catch (error) {
            console.log("User creation error ", error);
            res.status(400).send("Error: User invalid information\n" + error)
            res.end();
        }

        let userBody = newUser.getUser();

        MyDB.insert('users', userBody).
            then((collection) => {
                collection.insert((error, result) => {
                    if (error) {
                        // save the msg description of the error to evaluate it
                        let tempErrmsg = error.writeErrors[0].err.errmsg;

                        // check if the error is because the email or username already exists, or if is for other reason
                        let [errStatus, errmsg] = (tempErrmsg.includes("emailUniqueIndex")) ? [409, "The email already exists"] :
                            tempErrmsg.includes("userNameUniqueIndex") ? [409, "The username already exists"] : [418, error];

                        if (!userBody.pwd && errStatus === 409) {
                            let { pToken } = { ...userBody }
                            this.updateUser(req, res, { email: error.writeErrors[0].err.op.email }, { $set: { pToken } });
                            return;
                        }

                        res.status(errStatus).send(errmsg);
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

    updateUser = (req, res, filter, update) => {

        // check for optional arguments and fill them if empty
        filter = (filter) ? filter :
            (req.query) ? req.query : { _id: ObjectID(req.params) };
        update = (update) ? update : req.body;
        update = (update.$set) ? update : { $set: update };

        MyDB.updateOne('users', filter, update).
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

    login = (req, res) => {
        let body = req.body
        console.log("body",body)

        if (!(UserModel.validateLogin(body).v || Object.keys(body).length === 2)) {
            res.status(401).send('Incorrect email/usern or password')
            res.end()
        }

        let query = { ...req.body }

        if(query.pwd)query.pwd = UserModel.encrypt(query.pwd)
        console.log("query",query)

        MyDB.find('users', query).
            then((collection) => {
                collection.find((results) => {
                    if(results.length===0){
                        
                        res.status(400).send("Make sure to input the right email/user & password");
                        res.end();
                        return;
                    }
                    let {usern, email} = {...results[0]}

                    let token = jwt.sign({_id:results[0]._id, usern,email},process.env.TOKEN_SECRET);
                    console.log('token', token)
                    // res.header('auth-token', token);
                    res.status(200).send({usern, email, token});
                    res.end();
                })
            }).catch((error) => {
                res.status(500).send('' + error)
                res.end()
            })


    }



}


module.exports = new Users();