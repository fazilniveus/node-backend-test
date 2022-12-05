/* eslint-disable import/extensions */
/* eslint-disable camelcase */
const utils = require('../../../node-backend-common/utils/writer');
const businesslogic = require('../businessLogic/UserBusinessLogic');

const logger = require('../../../node-backend-common/utils/logger');


module.exports.loginUser = function loginUser(req, res) {
  logger.info('Entered Login');

  businesslogic
    .loginUser(req.swagger.params.body.value)
    .then((response) => {
      utils.writeJson(res, response, response.status);
    })
    .catch((error) => {
      utils.writeJson(res, error, error.status);
    });
};
