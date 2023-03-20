const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Users } = require('../models');
dotenv.config();

module.exports = { verifyAccessToken };