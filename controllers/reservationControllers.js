const { ObjectId } = require('mongodb');
const reservationModel = require('../models/reservationsModel');
const jwt = require('jsonwebtoken');

const createToken  =  (_id) =>  {
    const jwtKey = process.env.JWT_SEC_KEY;
    return jwt.sign({ _id }, jwtKey, { expiresIn: "7d" });
};

const createReservation = async (req, res) => {
    const { passengerId, flightId, seatNumber, ReservationDateandTime, TotalFare } = req.body;

    try {
        const reservation = new reservationModel(req.body);

        const saveReservation = await reservation.save();

        const token = createToken(reservation._id);

        if (saveReservation) return res.status(201).json({_id: reservation._id, passengerId, flightId, seatNumber, ReservationDateandTime, TotalFare, token});
    } catch (e) {
        console.error(new Error(e));
        res.status(500).json(e);
    };
};

const findReservation = async (req, res) => {
    if (ObjectId.isValid(req.params.passengerId)) {
        try {
            const { passengerId } = req.params;

            const reservation = await reservationModel.findOne({ passengerId });

            if (reservation) return res.status(200).json(reservation);

            else return res.status(404).json({ error: 'A passenger with this id does not exist' });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    } else return res.status(422).json({ error: 'Invalid id' });
};

const updateReservation = async (req, res) => {
    const updates = req.body;
    if (ObjectId.isValid(req.params._id)) {
        const { _id } = req.params;
        try {
            const updatedReservation = await reservationModel.findByIdAndUpdate(_id, { $set: updates }, { new: true });

            if (updatedReservation) return res.status(200).json({ successful: "Update successful" });

            else return res.status(404).json({ error: "Unable to make this changes" });
        } catch (e) {
            console.error(new Error(e));
            res.status(500).json(e);
        };
    } else return res.status(422).json({ error: "Invalid id" });
};

const deleteReservation = async (req, res) => {
    const { _id } = req.params;
    if (ObjectId.isValid(req.params._id)) {
        try {
            const deletedReservation = await reservationModel.findByIdAndDelete(_id);
    
            if (deletedReservation) return res.status(200).json({ successful: "Your reservation has been successfully cancelled" });
    
            else return res.status(500).json({ error: "An error just occured while deleting, Please try deleting again"});
        } catch (e) {
            console.error(new Error(e));
            rs.status(500).json(e);
        };
    } else return res.status(422).json({ error: "Invalid id" });
};

const getReservations = async (req, res) => {
    try {
        const reservations = await reservationModel.find();

        res.status(200).json(reservations);
    } catch (e) {
        consol.error(new Error(e));
        res.status(500).json(e);
    };
};

module.exports = { createReservation, findReservation, updateReservation, getReservations, deleteReservation };
