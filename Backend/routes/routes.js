var express = require('express');
var router = express.Router();

const UserController = require("../controllers/users");

const RidesController = require("../controllers/rides");

const SharedRidesController = require("../controllers/sharedrides")

router.get('/', (req, res) => {
    res.send('Welcome Students')
});

//  User APIs

router.post('/add-user', UserController.add_users);

router.post('/get-userbyemail', UserController.get_user_by_email);

router.get('/get-all-user', UserController.get_users);

router.get('/getuserById', UserController.get_user_by_id);

router.put('/update-user', UserController.update_user_by_id);

router.delete('/delete_user', UserController.delete_users);

//  Rides APIs

router.post('/add-ride', RidesController.add_ride);

router.put('/update-ride', RidesController.update_ride_by_id);

router.get('/get-all-rides', RidesController.get_rides);

router.get('/get-ridesByuid', RidesController.get_ride_by_uid);

router.get('/get-ridesById', RidesController.get_ride_by_id);

router.delete('/delete-rides', RidesController.delete_ride);

// Shared Rides

router.post('/add-sharedride', SharedRidesController.add_sharedride);

router.get('/get-all-sharedrides', SharedRidesController.get_sharedrides);

router.get('/get-sharedridesByrid', SharedRidesController.get_sharedrides_by_rid);

router.get('/get-sharedridesBypid', SharedRidesController.get_sharedrides_by_pid);

router.get('/get-sharedridesById', SharedRidesController.get_sharedride_by_id);

router.delete('/delete-sharedrides', SharedRidesController.delete_sharedride);

module.exports = router;
