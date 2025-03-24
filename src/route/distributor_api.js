import express from 'express'
import distributorController from '../controller/distributor_controller.js'
import { authMiddleware } from '../middleware/auth_middleware.js'

const distributorRouter = new express.Router()
distributorRouter.use(authMiddleware)
distributorRouter.post('/api/distributor/add-distributor', distributorController.newDistributor)
distributorRouter.patch('/api/distributor/delete-distributor/:distributorId', distributorController.deleteDistributor)
distributorRouter.put('/api/distributor/edit-distributor/:distributorId', distributorController.editDistributor)
distributorRouter.get('/api/distributor/get-distributor-details/:distributorId', distributorController.getDistributorDetails)
distributorRouter.get('/api/distributor/get-all-distributor', distributorController.getAllDistributors)

export {
    distributorRouter
}
