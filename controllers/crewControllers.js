const { ObjectId } = require('mongodb');
const crewModel = require('../models/crewsModel');

const newCrew = async (req, res) => {
    try {
        const crew = new crewModel(req.body);

        const saveCrew = await crew.save();

        res.status(201).json(saveCrew);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const findCrew = async (req, res) => {
    const { crewId } = req.params;
   if (ObjectId.isValid(req.params.crewId)) {
        try {
            const crew =  await crewModel.findById(crewId);

            if  (crew) return res.status(200).json(crew);

            else return res.status(404).json({error: "No credentials found"});
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
   } else return res.status(422).json({ error: "Invalid id" });
}; 

const updateCrew = async (req, res) => {
    const { _id } = req.params;
    if (ObjectId.isValid(req.params._id)) {
        const updates = req.body;
        try {
            const updatedCrew = await crewModel.findByIdAndUpdate(_id, {$set: updates}, { new: true });

            if (updatedCrew) return res.status(200).json({ successful: "Updates has been successfully made" })
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    } else return res.status(422).json({ error: "Invalid id" });
};

const deleteCrew = async (req, res) => {
    const { _id } = req.params;
    if (ObjectId.isValid(req.params._id)) {
        try {
            const crew = await crewModel.findByIdAndDelete(_id);

            if (crew) return res.status(200).json({ successful: "Your deletion has been successfully deleted" });

            else return res.status(500).json({ error: "Could not delete your credentialds" });
        } catch (e) {
            console.error(e);
            res.status(500).json(e);
        };
    } else return res.status(422).json({ error: "Invalid id" });
};

const getCrews = async (req, res) => {
    try {
        const allCrews = await crewModel.find();

        if (allCrews) return res.status(200).json(allCrews);

        else return res.status(404).json('This field is empty');
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    };
};

module.exports = { newCrew, findCrew, updateCrew, deleteCrew, getCrews };