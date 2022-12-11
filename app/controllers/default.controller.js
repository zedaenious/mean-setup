const db = require('../models');
const Thing = db.thing;

exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({ message: 'Content can not be empty'});
        return;
    }

    const thing = new Thing({
        name: req.body.name
    });

    thing
        .save(thing)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'I am error'
            });
        });
};

exports.findOne = (req, res) => {
    const name = req.body.name;

    Thing.findByName(name)
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Cannot find thing by name ${name}`});
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error finding thing by name ${name}`});
        });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: 'Thing to update cannot be empty'
        });
    }

    const name = req.body.name;

    Thing.findByIdAndUpdate(name, req.body)
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Could not update thing with name ${name}`});
            } else {
                res.send({ message: 'Thing was updated successfully.'});
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error upding thing with name ${name}`});
        });
};

exports.delete = (req, res) => {
    const name = req.body.name;

    Thing.findByIdAndRemove(name)
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Cannot delete thing with name ${name}`});
            } else {
                res.send({ message: 'Thing was deleted successfully'});
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete thing with name ${name}`});
        });
};