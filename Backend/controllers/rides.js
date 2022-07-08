const RidesModel = require("../models/rides");

module.exports = {
    add_ride: async (req, res) => {
        let carseats=req.body.seats;
        let newride = new RidesModel({
            UID:req.body.UID,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mno: req.body.mno,
            licenseno: req.body.licenseno,
            from: req.body.from,
            fromlat: req.body.fromlat,
            fromlan: req.body.fromlan,
            fromstate: req.body.fromstate,
            fromcity: req.body.fromcity,
            dest: req.body.dest,
            datetime: req.body.datetime,
            destlat: req.body.destlat,
            destlan: req.body.destlan,
            deststate: req.body.deststate,
            destcity: req.body.destcity,
            seats: carseats,
            avlseats: carseats
        });
        await newride.save(function (err, newride) {
            if (err)
                res.send({status: 400, msg: 'Error'});
            else
                res.send({status: 200, msg: 'Data added successfully', ride: newride });
        });
    },

    get_rides: async (req, res) => {
        RidesModel.find(function (err, response) {
            if (err)
                res.send(err);
            else
                res.send({
                    status: 200, resultFound: response.length,
                    rides: response
                });
        });
    },

    get_ride_by_id: (req, res) => {
        const ridesId = req.query._id;
        try {
            RidesModel.findOne({ _id: ridesId }, function (err, response) {
                    res.send({ status: 200,resultFound: response.length,rides: response });
            });
        } catch (error) {
            res.send({status:400,message:error})
        }
       
    },

    get_ride_by_uid: (req, res) => {
        const userId = req.query.uid;
        RidesModel.find({ UID: userId }, function (err, response) {
            if (err)
                res.send(err);
            else
                res.send({ status: 200,resultFound: response.length, rides: response });
        });
    },
    update_ride_by_id: (req, res, next) => {
        const rideId = req.query._id;
        RidesModel.findByIdAndUpdate(rideId, { $set: req.body }, function (err, response) {
            if (err)
                res.send(err);
            else
                res.send({ status: 200, ride: response })
        });
    },
    delete_ride: (req, res) => {
        const ridesid = req.query._id;
        RidesModel.findByIdAndDelete(ridesid, function (err, response) {
            if (err)
                res.send(err);
            else
                res.send({ status: 200, rides: response });
        });
    }

}