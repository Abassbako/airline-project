const { ObjectId } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config();
const passengerModel = require('../models/passengersModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SEC_KEY;
    return jwt.sign({ _id }, jwtKey, { expiresIn: '10d' });
};

const createPassengers = async (req, res) => {
    try{
        const { FirtsName, LastName, DOB, Email, Phone } = req.body;

        let passenger =  await passengerModel.findOne({ $or: [{ Email }, { Phone }] });

        if (passenger) return res.status(400).json('A passenger with this email address or phone number already exist');

        if (!validator.isEmail(Email)) return res.status(401).json('Not a valid emal address');

        passenger = new passengerModel(req.body);

        const savePassenger = await passenger.save();

        const token = createToken(passenger._id);

        if (savePassenger) res.status(201).json({ _id: passenger._id, FirtsName, LastName, DOB, Email, Phone, token });

        else return res.status(400).json({ error: "An error just occured while creating..." });

    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const findPassengers = async (req, res) => {
   if (ObjectId.isValid(req.params.passengerId)) {
        try {
            const { passengerId } = req.params;

            const passenger = await passengerModel.findById(passengerId);

            if (passenger) return res.status(200).json(passenger);

            else return res.status(404).json({ error: "Passenger not found" });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
   } else return res.status(422).json({ error: "Invalid id" });
};

const updatePassenger = async (req, res) => {
  if (ObjectId.isValid(req.params._id)) {
    try{
        const updates = req.body;

        const { _id } = req.params;

        const passenger = await passengerModel.findByIdAndUpdate(_id, { $set: updates }, { new: true });

        if (passenger) return res.status(200).json({ successful: "Your account has been successfully updated" });

        else return res.status(404).json({ error: "Could not update your account" });
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
  } else return res.status(422).json({ error: "Invalid id" });
};

const deletePassengers = async (req, res) => {
    if (ObjectId.isValid(req.params._id)) {
        try {
        const { _id } = req.params;

        const passenger = await passengerModel.findByIdAndDelete(_id);

        if (passenger) return res.status(200).json('Your account has been successfully deleted');

        else return res.status(422).json({ error: "Could not delete the document" });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    }  else return res.status(500).json({ error: "invalid id" });
};

const getPassengers = async (req, res) => {
    res.cookie('welcome to verdoose airlines', true, {
        maxAge: 1000*60*60,
        httpOnly: true,
        secure: true
    });
    try {
        const passengers = await passengerModel.find();

        res.status(200).json(passengers);
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

module.exports = { createPassengers, findPassengers, updatePassenger, deletePassengers, getPassengers };