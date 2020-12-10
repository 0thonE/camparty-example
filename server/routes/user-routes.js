const express = require('express');
const Users = require('../controllers/users-controller');


const router  = express.Router();



////////////////////////////////////////////////////////////////////////////////////
////////////////////////        Users Routes     ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * @swagger
 * /users:
 *  get: 
 *      tags:
 *      - "User"
 *      summary: Get users query
 *      description: Gets all the users that match the query
 *      responses:  
 *          200:
 *              description: success  
 */
router.get('', Users.getByQuery);

/**
 * @swagger
 * /users:
 *  put: 
 *      tags:
 *      - "User"
 *      summary: Get users query
 *      description: Gets all the users that match the query
 *      responses:  
 *          200:
 *              description: success  
 */
router.put('', Users.updateUser);

/**
 * @swagger
 * /users:
 *  get: 
 *      tags:
 *      - "User"
 *      summary: Get all users
 *      description: Gets all the camping places 
 *      responses:  
 *          200:
 *              description: success  
 */
router.get('/', Users.getAll);

/**
 * @swagger
 * /users/{id}:
 *  get: 
 *      tags:
 *      - "User"
 *      summary: find Camp by id
 *      description: Retrieves a Camp object by id
 *      responses:  
 *          200:
 *              description: success       
 */
router.get('/:id', Users.getById);

/**
 * @swagger
 * /users/new:
 *  post:
 *      deprecated: true
 *      tags:
 *      - "User"
 *      summary: Add a new user
 *      description: Adds a new user to the site
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: "#/definitions/Camp"
 *      responses:  
 *          201:
 *              description: insertion succeded     
 */
router.post('/new', Users.addNew);

/** 
 * @swagger
 * /users/register:
 *  post:
 *      tags:
 *      - "User"
 *      summary: Add a new user
 *      description: Adds a new user to the site
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: "#/definitions/Camp"
 *      responses:  
 *          201:
 *              description: insertion succeded     
 */
router.post('/register', Users.addNew);

/**
 * @swagger
 * /users/login:
 *  get: 
 *      tags:
 *      - "User"
 *      summary: find Camp by id
 *      description: Retrieves a Camp object by id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      usern || email:
 *                          type: string
 *                      pwd: 
 *                          type: string
 *      responses:  
 *          200:
 *              description: success       
 *          401:
 *              description: Incorrect password or email/usern       
 */
router.post('/login',Users.login)


module.exports = router;