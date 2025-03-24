import distributorService from "../service/distributor_service.js"

const newDistributor = async (req, res, next) => {
    try{
        const result = await distributorService.newDistributor(req)
        res.status(200).json({
            data: result
        })
    }catch(e){
        next(e)
    }
}

const deleteDistributor = async (req, res, next) => {
    try{
        const result = await distributorService.deleteDistributor(req)
        res.status(200).json({
            message : "distributor deleted successfully"
        })
    }catch(e){
        next(e)
    }
}

const editDistributor = async (req, res, next) => {
    try{
        const result = await distributorService.editDistributor(req)
        res.status(200).json({
            message : "distributor updated succesfully", 
            data: result
        })
    }catch(e){
        next(e)
    }
}

const getDistributorDetails = async(req, res, next) => {
    try{
        const result = await distributorService.getDistributorDetails(req)
        res.status(200).json({
            data: result
        })
    }catch(e){
        next(e)
    }
}

const getAllDistributors = async(req, res, next) => {
    try{   
        const result = await distributorService.getAllDistributors(req)
        res.status(200).json({
            data: result
        })
    }catch(e){
        next(e)
    }
}

export default {
    newDistributor, deleteDistributor, editDistributor, getDistributorDetails, getAllDistributors
}