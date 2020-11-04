const express = require('express');
const router = express.Router();

const { dataFilter, } = require('../services/datafilter-service');
const { OkSuccessfulResponse, } = require('../errors/successful-response')
const { BadRequestClientError, } = require('../errors/error-response');

async function dataFilterRouter(req, res, next) {
  try {
    let response = new OkSuccessfulResponse();
    response.data = await dataFilter(req.body).catch(error => {
      const err = new BadRequestClientError(error);
      res.status(err.code).json(err.message);
    });
    res.status(response.code).json(response.data);
  } catch (error) {
    throw error;
  }
}
/* POST data filter */
router.post('/api/data-filter', dataFilterRouter);

module.exports = { router };

