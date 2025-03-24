import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response_error.js"
import { addDistributor } from "../validation/distributor_validation.js"

const newDistributor = async (req) => {
    if (!req.user) {
        throw new ResponseError(403, "Forbidden");
    }

    const distributorData = validate(addDistributor, req.body)

    return await prismaClient.distributor.create({
        data: distributorData
    })
}

const deleteDistributor = async (req) => {
    if (!req.user) {
        throw new ResponseError(403, "Forbidden");
    }

    const {distributorId} = req.params;
    const id = Number(distributorId);
    if (isNaN(id)) {
        throw new ResponseError(400, "Invalid distributor ID");
    }

    try {
        // Soft delete the distributor
        await prismaClient.distributor.update({
            where: { distributorId: id }, 
            data: {
                isDistributorDeleted: true, 
                isDistributorActive: false
            }
        });

        // Create a distributor history record
        await prismaClient.distributorHistory.create({
            data: {
                distributorId: id,
                description: "Soft delete: Distributor marked as inactive and deleted.",
            }
        });

        return { message: "Distributor deleted successfully" };
    } catch (error) {
        throw new ResponseError(404, "Distributor not found");
    }
};

const editDistributor = async (req) => {
    if (!req.user) {
        throw new ResponseError(403, "Forbidden");
    }

    const { distributorId } = req.params; // Extract distributorId properly
    const distributorData = validate(addDistributor, req.body); // Validate input

    // Ensure distributorId is a number
    const id = Number(distributorId);
    if (isNaN(id)) {
        throw new ResponseError(400, "Invalid distributor ID");
    }

    // Fetch the current distributor data before updating
    const existingDistributor = await prismaClient.distributor.findUnique({
        where: { 
            distributorId: id
        }
    });

    if (!existingDistributor) {
        throw new ResponseError(404, "Distributor not found");
    }

    // Compare and track changes
    let changes = [];
    for (const key in distributorData) {
        if (distributorData[key] !== existingDistributor[key]) {
            changes.push(`${key} changed from '${existingDistributor[key]}' to '${distributorData[key]}'`);
        }
    }

    // If no changes, return early
    if (changes.length === 0) {
        throw new ResponseError(400, "No changes detected");
    }

    // Update the distributor
    const updatedDistributor = await prismaClient.distributor.update({
        where: { distributorId: id },
        data: distributorData,
    });

    // Save the history
    await prismaClient.distributorHistory.create({
        data: {
            distributorId: id,
            description: changes.join(", ") // Join changes into a single string
        }
    });

    return updatedDistributor;
};

const getDistributorDetails = async (req) => {
    if (!req.user) {
        throw new ResponseError(403, "Forbidden");
    }

    const { distributorId } = req.params; // Get ID from request params

    const distributor = await prismaClient.distributor.findUnique({
        where: { distributorId: Number(distributorId) }
    });

    if (!distributor) {
        throw new ResponseError(404, "Distributor not found");
    }

    return distributor;
};

const getAllDistributors = async (req) => {
    if (!req.user) {
        throw new ResponseError(403, "Forbidden");
    }

    const distributors = await prismaClient.distributor.findMany({ 
        where: {
            isDistributorDeleted : false
        }
    });

    if (distributors.length === 0) {
        throw new ResponseError(404, "No distributors found");
    }

    return distributors;
};


export default {
    newDistributor, deleteDistributor, editDistributor, getDistributorDetails, getAllDistributors
};
