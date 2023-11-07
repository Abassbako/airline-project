//Routers
const passengerRoutes = require('./routers/passengerRoutes');
const flightRoutes = require('./routers/flightRoutes');
const reservationRoutes = require('./routers/reservationRoutes');
const aircraftRoutes = require('./routers/aircraftRoutes');
const airportRoutes = require('./routers/airportRoutes');
const crewRoutes = require('./routers/crewRoutes');
const userRoutes = require('./routers/userRoutes');
const paymentRoutes = require('./routers/paymentRoutes');

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    console.log(`${ req.url } ${ req.method }`);
    next();
});
app.use('/api/v1/passengers', passengerRoutes);
app.use('/api/v1/flights', flightRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/aircrafts', aircraftRoutes);
app.use('/api/v1/airports', airportRoutes);
app.use('/api/v1/crews', crewRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/payments', paymentRoutes);

// Environment Variables
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URL;

app.listen(PORT, () => {
    console.log(`app listening on port ${ PORT }`);
});

mongoose.connect(uri, {
    useNewUrlParser: true
})
.then(() => {
    console.log('MongoDB connection successful');
})
.catch((e) => {
    console.error(new Error(`MongoDB connection error: ${ e.message }`));
});
