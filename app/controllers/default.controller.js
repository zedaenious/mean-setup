const db = require('../models');
const Tutorial = db.tutorials;

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({ message: 'Content can not be empty'});
        return;
    }

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'I am error'
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: 'i' }} : {};

    Tutorial.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'I am error.'
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Cannot find id ${id}`});
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error finding ${id}`});
        });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: 'Data to update cannot be empty'
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Could not update tutorial with id ${id}`});
            } else {
                res.send({ message: 'Tutorial was updated successfully.'});
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error upding Tutorial with id ${id}`});
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Cannot delete tutorial with id ${id}`});
            } else {
                res.send({ message: 'Tutorial was deleted successfully'});
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete tutorial with id ${id}`});
        });
};

exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deletedCount} tutorials successfully deleted.`});
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'An error occurred while trying to delete all objects.'});
        });
};

exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
        .then(data => { res.send(data)})
        .catch(err => {
            res.status(500).send({ message: err.message || 'An error occurred during findAllPublished' });
        });
};