import express from 'express';
import {publicRouter} from '../route/public_api.js'
import {errorMiddleware} from '../middleware/error_middleware.js'
import {userRouter} from '../route/get_user_api.js'
import {distributorRouter} from '../route/distributor_api.js'
import cors from 'cors';

export const web = express();
web.use(express.json());
web.use(cors())

web.use(publicRouter)
web.use(userRouter)
web.use(distributorRouter)
web.use(errorMiddleware)