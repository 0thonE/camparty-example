const express = require('express');
const Camps = require('./../controllers/camps-controller');
const Comments = require('../controllers/comments-controller')
const Rates = require('../controllers/rates-controller')
const auth = require('../midware/auth');

const router  = express.Router();




////////////////////////////////////////////////////////////////////////////////////
////////////////////////        Camps Routes        ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /api/camps:
 *  get: 
 *      tags:
 *      - "Camp"
 *      summary: Get all camps
 *      description: Gets all the camping places 
 *      responses:  
 *          200:
 *              description: success  
 *              schema: 
 *                  $ref: #/definitions/Camp
 */
router.get('/camps', Camps.getAll);


/**
 * @swagger
 * /api/camps/{id}:
 *  get: 
 *      tags:
 *      - "Camp"
 *      summary: find Camp by id
 *      description: Retrieves a Camp object by id
 *      responses:  
 *          200:
 *              description: success       
 */
router.get('/camps/:id', Camps.getById);


/**
 * @swagger
 * /api/camps/new:
 *  post:
 *    tags:
 *    - "Camp"
 *    summary: Add a new camp
 *    description: Adds a new camping place forom a Camp object 
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: Camp
 *        description: Camp object
 *        in:  body
 *        required: true
 *        type: object
 *        schema:
 *          $ref: '#/components/schemas/Camp'
 *    responses:  
 *      201:
 *        description: insertion succeded 
 *        schema: 
 *          type: string
 *          example: |
 *              Sueccess
 *              1 out of 1 insertions where made
 *     
 */
router.post('/camps/new',auth, Camps.addNew);
// router.post('/camps/new', Camps.addNew);



////////////////////////////////////////////////////////////////////////////////////
////////////////////////        Comments Routes     ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /api/comments:
 *  get: 
 *      tags:
 *      - "Comment"
 *      summary: Get all comments
 *      description: Gets all the camping places 
 *      responses:  
 *          200:
 *              description: success  
 */
router.get('/comments', Comments.getAll);

/**
 * @swagger
 * /api/comments/{id}:
 *  get: 
 *      tags:
 *      - "Comment"
 *      summary: find Camp by id
 *      description: Retrieves a Camp object by id
 *      responses:  
 *          200:
 *              description: success       
 */
router.get('/comments/:id', Comments.getById);

/**
 * @swagger
 * /api/comments/campid/{id}:
 *  get: 
 *      tags:
 *      - "Comment"
 *      summary: get all comments of a camp
 *      description: Retrieves all comments of a Camp by the ID of that camp
 *      responses:  
 *          200:
 *              description: success       
 */
router.get('/comments/campid/:id', Comments.getByCampId);

/**
 * @swagger
 * /api/comments/new:
 *  post:
 *      tags:
 *      - "Comment"
 *      summary: Add a new camp
 *      description: Adds a new camping place forom a Camp object
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: string
 *      responses:  
 *          201:
 *              description: success  
 *              schema: 
 *                  type: string
 */
router.post('/comments/new/', Comments.addNew);



////////////////////////////////////////////////////////////////////////////////////
////////////////////////        Rates Routes        ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /users:
 *  get: 
 *      tags:
 *      - "User"
 *      summary: Get rates query
 *      description: Gets all the rates that match with the query
 *      responses:  
 *          200:
 *              description: success  
 */
router.get('/rates', Rates.getByQuery);

/**
 * @swagger
 * /api/rates:
 *  get: 
 *      tags:
 *      - "Rate"
 *      summary: Get all rates
 *      description: Gets all the camping places 
 *      responses:  
 *          200:
 *              description: success  
 */
router.get('/rates/', Rates.getAll);

/**
 * @swagger
 * /api/rates/{id}:
 *  get: 
 *      tags:
 *      - "Rate"
 *      summary: find Camp by id
 *      description: Retrieves a Camp object by id
 *      responses:  
 *          200:
 *              description: success       
 */
router.get('/rates/:id', Rates.getById);

/**
 * @swagger
 * /api/rates/campid/{id}:
 *  get: 
 *      tags:
 *      - "Rate"
 *      summary: get all rates of a camp
 *      description: Retrieves all rates of a Camp by the ID of that camp
 *      responses:  
 *          200:
 *              description: success       
 */
router.get('/rates/campid/:id', Rates.getByCampId);

/**
 * @swagger
 * /api/rates/new:
 *  post:
 *      tags:
 *      - "Rate"
 *      summary: Add a new camp
 *      description: Adds a new camping place forom a Camp object
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: string
 *      responses:  
 *          201:
 *              description: insertion succeded     
 */

router.post('/rates/new/',auth,  Rates.addNew);



module.exports = router;