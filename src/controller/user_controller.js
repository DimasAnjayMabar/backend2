import userService from "../service/user_service.js";

const editName = async (req, res, next) => {
    try {
        const result = await userService.editName(req); // Panggil service
        res.status(200).json({
            success: true,
            message: "Nama berhasil diperbarui",
            data: result
        });
    } catch (e) {
        next(e); // Lanjutkan error ke middleware error handler
    }
}

const editPhone = async (req, res, next) => {
    try {
        const result = await userService.editPhone(req); // Panggil service
        res.status(200).json({
            success: true,
            message: "nomor telepon berhasil diperbarui",
            data: result
        });
    } catch (e) {
        next(e); // Lanjutkan error ke middleware error handler
    }
}

const editEmail = async (req, res, next) => {
    try {
        const result = await userService.editEmail(req); // Panggil service
        res.status(200).json({
            success: true,
            message: "Email berhasil diperbarui",
            data: result
        });
    } catch (e) {
        next(e); // Lanjutkan error ke middleware error handler
    }
}

export default {
    editName, editEmail, editPhone
}