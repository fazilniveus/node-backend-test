/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable prefer-promise-reject-errors */
const User = require('../service/UserService');

exports.loginUser = params => User.loginUser(params);
