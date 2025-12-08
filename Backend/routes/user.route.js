import express from 'express';
import {createUser, getUser} from '../controllers/user.controller.js'

const route = express.Router();

route.get('/', getUser);
route.post('/signup', createUser )



export default route;