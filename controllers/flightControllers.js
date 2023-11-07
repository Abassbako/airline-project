const { ObjectId } = require('mongodb');
const flightModel = require('../models/flightsModel');

const createFlight = async (req, res) => {
    try {
        const flight = new flightModel(req.body);

        const saveFlights  = await flight.save();

        res.status(201).json(saveFlights);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const findFlight = async (req, res) => {
    if (ObjectId.isValid(req.params.flightId)) {
        try {
            const { flightId } = req.params;

            const flight = await flightModel.findById(flightId);

            if (flight) return res.status(200).json(flight);

            else return res.status(404).json({ error: "A passenger with this flight id does not exist" });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    } else return res.status(422).json({ error: "Invalid id" });
};

const updateFlight = async (req, res) => {
    const updates = req.body;
    if (ObjectId.isValid(req.params._id)) {
       try {
        const _id = req.params._id;

        const flight = await flightModel.findByIdAndUpdate(_id, { $set: updates }, { new: true });

        if (flight) return res.status(200).json('Your flight has been successfully updated');

        else return res.status(404).json({ error: "Could not update your flight" });
       } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
       };
    } else return res.status(422).json({ error: "Invalid id" });
};

const deleteFlight = async (req, res) => {
   if (ObjectId.isValid(req.params._id)) {
        try {
            const { _id } = req.params;

            const flight = await flightModel.findByIdAndDelete(_id);

            if (flight) return res.status(200).json('Your flight has been succesfully cancelled');

            else return res.status(400).json({ error: "Could not cancel your flight"});
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
   } else return res.status(422).json({ error: "Invalid id" });
};

const getUsers = async (req, res) => {
    try {
        const flight = await flightModel.find();

        res.status(200).json(flight);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    }
}


module.exports = { createFlight, findFlight, updateFlight, deleteFlight, getUsers };