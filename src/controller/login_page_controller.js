import userService from "../service/login_page_service.js";

const register = async (req, res, next) => {
    try{    
        const result = await userService.register(req.body)

        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e)
    }
}

const login = async (req, res, next) => {
    try{
        const result = await userService.login(req.body)
        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e)
    }
}

const get = async (req, res, next) => {
    try{    
        const token = req.user.token
        const result = await userService.get(token)
        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e)
    }
}

const verify = async (req, res, next) => {
    try{
        const result = await userService.verify(req.headers);
        
        res.status(200).json({
            user : result
        })
    }catch(e){
        next(e)
    }
}

const logout = async(req, res, next) => {
    try{
        await userService.logout(req.user.username)
        res.status(200).json({
            data: "Logged out successfully"
        })
    }catch(e){
        next(e)
    }
}

export default {
    register, login, get, logout, verify
}