/* eslint-disable camelcase */
/* eslint-disable import/order */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

const { INTERNALERROR } = require('../../../node-backend-common/config/status-codes');
const logger = require('../../../node-backend-common/utils/logger');

exports.loginUser = params => new Promise((resolve, reject) => {
  try {
    resolve(params);
  } catch (error) {
    logger.error(error);
    reject({
      status: INTERNALERROR,
    });
  }
});
