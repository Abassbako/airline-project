const { ObjectId } = require('mongodb');
const airportModel = require('../models/airportsModels');

const newAirport = async (req, res) => {
    try {
        const newAirport = new airportModel(req.body);

        const savedAirport = await newAirport.save();

        res.status(201).json(savedAirport);
    } catch (e) {
        console.error(new Error(e));
        res.status()
    };
};

const searchAirport = async (req, res) => {
    const { airportId } = req.params;
   if (ObjectId.isValid(req.params.airportId)) {
        try {
            const airport = await airportModel.findById(airportId);

            if (airport) return res.status(200).json(airport);

            else return res.status(403).json({ error: "This airport is not available at the moment..." });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
   } else return res.status(422).json({ error: "Invalid id" });
};

const updateAirport = async (req, res) => {
    const { _id } = req.params;
    if (ObjectId.isValid(req.params._id)) {
        const updates = req.body;
        try {
            const airport = await airportModel.findByIdAndUpdate(_id, { $set: updates }, { new: true });

            if (airport) return res.status(200).json({ successful: "Update success!!!" });

            else return res.status(500).json({ error: 'There was an error while updating...' });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    } else return res.status(422).json({ error: "Invalid id" });
};

const deleteAirport = async (req, res) => {
    if (ObjectId.isValid(req.params._id)) {
        const { _id } = req.params;
        try {
            const deletedAirport = await airportModel.findByIdAndDelete(_id);

            if (deletedAirport) return res.status(200).json({ suucessful: "Your selected airport has been removed." });

            else return res.status(404).json({ error: "Could not deleted your selected airport." });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    } else return res.status(422).json({ error: "Invalid id" });
};

const getAirports = async (req, res) => {
    try {
        const allAirports = await airportModel.find();

        res.status(200).json(allAirports);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

module.exports = { newAirport, searchAirport, updateAirport, deleteAirport, getAirports };