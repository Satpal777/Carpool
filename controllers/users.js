const UsersModel = require("../models/users");
var bcrypt = require('bcryptjs');
module.exports = {
    add_users: async (req, res) => {
        var bcrypt = require('bcryptjs');
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        let newusers = new UsersModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mno: req.body.mno,
            password: hash,
            licenseno: req.body.licenseno,
            tmc: req.body.tmc
        });
        await newusers.save(function (err, newusers) {
            if (err)
                res.send(err);
            else
                res.send({ status: 200, msg: 'Data added successfully', user: newusers });
        });
    },

    get_users: async (req, res) => {
        UsersModel.find(function (err, response) {
            if (err)
                res.send(err);
            else
                res.send({
                    status: 200, resultFound: response.length,
                    users: response
                });
        });
    },

    get_user_by_email: (req, res) => {
        const user_email = req.body.email;
        const pass = req.body.password;
        UsersModel.findOne({ email: user_email }, function (err, response) {
            try {
                if(bcrypt.compareSync(pass,response.password)){ 
                    valid=true
                }
                else{
                    valid= false
                }
                res.send({ status: 200,authenticated:valid ,resultFound: response.length, user: response });
            } catch (error) {
                res.send({status:400,message:"Error"})
            } 
        });
    },

    get_user_by_id: (req, res) => {
        const usersId = req.query._id;
        UsersModel.findOne({ _id: usersId }, function (err, response) {
            if (err)
                res.send(err);
            else
                res.send({ status: 200, resultFound: response.length, users: response });
        });
    },

    update_user_by_id: (req, res, next) => {
        const usersId = req.query._id;
        UsersModel.findByIdAndUpdate(usersId, { $set: req.body }, function (err, response) {
            console.log(next)
            if (err)
                res.send(err);
            else
                res.send({ status: 200, users: response })
        });
    },
    delete_users: (req, res, next) => {
        const usersid = req.query._id;
        UsersModel.findByIdAndDelete(usersid, function (err, response) {
            if (err)
                res.send(err);
            else
                res.send({ status: 200, users: response });
        });
    }
}