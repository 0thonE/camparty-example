
const MyDB = require('./db-controller')
const CommentModel = require('../models/comment-model')

class Comments {

    // this function retrives all the documents in the comments collection
    getAll = (req, res) => {
        MyDB.find('comments').
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

    // this function filters by the query in the comments collection, it takes the query from the req query
    getByQuery = (req, res) => {
        MyDB.find('comments', req.query).
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

    // this function filters by id trough the  comments collection, it takes the id from the route param
    getById = (req, res) => {

        MyDB.findById('comments', req.params.id).
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

    // this function filters by id trough the  comments collection, it takes the id from the route param
    getByCampId = (req, res) => {

        MyDB.find('comments', { campId: req.params.id }).
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

        let newComment;
        try {
            newComment = new CommentModel(req.body);
        } catch (error) {
            res.status(400).send("Error: Comment invalid information\n" + error)
            res.end();
        }


        MyDB.insert('comments', newComment.getComment()).
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
}


module.exports = new Comments();