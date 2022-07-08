const SharedRidesModel = require("../models/sharedRides");

module.exports = {
    add_sharedride: async (req, res) => {
        let newride = new SharedRidesModel({
            rid:req.body.rid,
            did:req.body.did,
            pid:req.body.pid,
            dmno:req.body.dmno,
            pmno:req.body.pmno,
            dname:req.body.dname,
            pname:req.body.pname,
            dmail:req.body.dmail,
            pmail:req.body.pmail
        });
        await newride.save(function (err, newride) {
            if (err)
                res.send({status: 400, msg: 'Error'});
            else
                res.send({status: 200, msg: 'Data added successfully', ride: newride });
        });
    },

    get_sharedrides: async (req, res) => {
        SharedRidesModel.find(function (err, response) {
            if (err)
                res.send(err);
            else
                res.send({
                    status: 200, resultFound: response.length,
                    rides: response
                });
        });
    },

    get_sharedride_by_id: (req, res) => {
        const ridesId = req.query._id;
        SharedRidesModel.findOne({ _id: ridesId }, function (err, response) {
            if (err)
                res.send(err);
            else
                res.send({ status: 200,resultFound: response.length,rides: response });
        });
    },

    get_sharedrides_by_rid: (req, res) => {
        const rideId = req.query.rid;
        SharedRidesModel.find({ rid: rideId }, function (err, response) {
            if (err)
                res.send(err);
            else
                res.send({ status: 200,resultFound: response.length, rides: response });
        });
    },

    get_sharedrides_by_pid: (req, res) => {
        const pId = req.query.pid;
        SharedRidesModel.find({ pid: pId }, function (err, response) {
            if (err)
                res.send(err);
            else
                res.send({ status: 200,resultFound: response.length, rides: response });
        });
    },


    delete_sharedride: (req, res) => {
        const rideid = req.query._id;
        SharedRidesModel.findByIdAndDelete(rideid, function (err, response) {
            if (err)
                res.send(err);
            else
                res.send({ status: 200, rides: response });
        });
    }

}