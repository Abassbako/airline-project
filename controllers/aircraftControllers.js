const { ObjectId } = require('mongodb');
const aircraftModel = require('../models/aircraftsModel');

const createAircraft = async (req, res) => {
    const aircraft = new aircraftModel(req.body);

    const saveAircraft = await aircraft.save();

    res.status(201).json(saveAircraft);
};

const findAicraft = async (req, res) => {
   if (ObjectId.isValid(req.params.craftId)) {
    try {
        const { craftId } = req.params;

        const aircraft = await aircraftModel.findById(craftId);

        if (aircraft) return res.status(200).json(aircraft);

        else return res.status(404).json('This aircraft does not exist');
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    }
   } else return res.status(422).json({ error: 'Invalid id' });
};

const updateAircraft = async (req, res) => {
    const updates = req.body;
    if (ObjectId.isValid(req.params._id)) {
        const { _id } = req.params;
        try {
            const updatedAircraft = await aircraftModel.findByIdAndUpdate(_id, { $set: updates }, { new: true });

            if (updatedAircraft) return res.status(200).json({ successful: "Your changes has been successfully updated" });

            else return res.status(400).json({ error: "Unable to update, please try again..." });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        }
    } else return res.status(422).json({ error: "Invalid id" });
};

const deleteAircraft = async (req, res) => {
    if (ObjectId.isValid(req.params._id)) {
        const { _id } = req.params;
        try {
            const deletedAircraft = await aircraftModel.findByIdAndDelete(_id);

            if (deletedAircraft) return res.status(200).json({ successful: "Your current aircraft has been successfully cancelled" });

            else return res.status(500).json({ error: "An error just occured while deleting, Please try deleting again" });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    } else return res.status(500).json({ error: "Invalid id" });
};

const getAircrafts = async (req, res) => {
    try {
        const aircrafts = await aircraftModel.find();

        res.status(200).json(aircrafts);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

module.exports = { createAircraft, findAicraft, updateAircraft, deleteAircraft, getAircrafts };