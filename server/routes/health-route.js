// import dependencies and initialize the express router
const express = require('express');
const HealthController = require('../controllers/health-controller');

const router = express.Router();

/**
 * @swagger
 * /health: 
 *  get: 
 *     operationId: get
 *     description: Get health status of nodejsmicroservice
 *     responses: 
 *        200: 
 *           description: Health check response
 *           schema: 
 *              $ref: #/definitions/healthResponse
 *           
 *           examples: 
 *              application/json: 
 *                 status: UP
 *                 "dbConnectionStatus": "OK"
 */

// define routes
router.get('', HealthController.getHealth);

module.exports = router;
