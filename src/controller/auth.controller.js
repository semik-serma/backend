import { Admin } from "mongodb";
import { otpmodel } from "../models/otpModel.js";
import User from "../models/userModels.js";
import { hashthepassword } from "../utils/bcrypt.js";
import { otpgenerate } from "../utils/generateOtp.js";
import { tokengenerate } from "../utils/generatetoken.js";
import { sendmail } from "../utils/mailer.js";
import { errorResponse, successResponse } from "../utils/response.js";
import bcrypt from 'bcrypt'

// export const register = async (req, res) => {
//     try {
//         // Validate req.body exists before destructuring
//         if (!req.body) {
//             return errorResponse(res, 'Request body is required');
//         }

//         const { firstname, lastname, email, password } = req.body;

//         if (!email) return errorResponse(res, 'pls enter your email');
//         if (!password) return errorResponse(res, 'pls enter your password');
//         if (!firstname) return errorResponse(res, 'pls enter your first name');
//         if (!lastname) return errorResponse(res, 'pls enter your last name');

//         const existing = await User.findOne({ email });
//         if (existing) {
//             return errorResponse(res, 'user already registered');
//         }

//         const hash = await hashthepassword(password.trim());
//         await User.create({
//             email,
//             password: hash,
//             firstname,
//             lastname
//         });

//         successResponse(res, 'user created successfully');
//     } catch (error) {
//         errorResponse(res, 'error at register', 500, error.message);
//     }
// };

export const registerSecond = async (req, res) => {
    try {
        const email = req.body.email
        if (!email) {
            return errorResponse(res, 'email required')
        }
        const userfound = await User.findOne({ email })
        if (userfound) {
            return errorResponse(res, 'user already registered')
        }
        const emailotp = await otpmodel.findOne({ email })
        if (emailotp) {
            return errorResponse(res, 'sendmail after 5 minute')
        }
        const otp = otpgenerate()
        const create = await otpmodel.create({
            email: email,
            otp: otp
        })
        await sendmail(email, otp)
        successResponse(res, 'This opt expires at 5 minute go and verify', otp)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'error at register second',
            error: error.message
        })
    }
}

export const verifyuser = async (req, res) => {
    try {
        // Validate req.body exists before destructuring
        if (!req.body) {
            return errorResponse(res, 'Request body is required');
        }

        const { email, password, otp, firstname, lastname } = req.body
        if (!email) {
            return errorResponse(res, 'pls enter your email')

        }
        if (!password) {
            return errorResponse(res, 'pls enter your password')
        }
        if (!otp) {
            return errorResponse(res, 'enter your otp')
        }
        const findemail = await otpmodel.findOne({ email, otp, isUsed: false })

        if (!findemail) {
            return errorResponse(res, 'cant find')
        }
        const hash = await hashthepassword(password)
        await otpmodel.findOneAndUpdate({ email }, { isUsed: true })
        await User.create({
            email: email,
            password: hash,
            firstname: firstname,
            lastname: lastname
        })
        successResponse(res, 'user created successfully')

    } catch (error) {
        res.status(400).json({
            message: "error at verifyuser",
            error: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        // Validate req.body exists before destructuring
        if (!req.body) {
            return errorResponse(res, 'Request body is required');
        }

        console.log(req.body)
        const { email, password } = req.body
        if (!email) {
            return errorResponse(res, 'pls enter your email')
        }
        if (!password) {
            return errorResponse(res, 'pls enter your password')
        }
        const emailfind = await User.findOne({ email })
        if (!emailfind) {
            return errorResponse(res, 'couldnt find your email')
        }
        const passwordhash = await bcrypt.compare(password.trim(), emailfind.password)

        console.log(passwordhash, emailfind.password, password)
        if (!passwordhash) {
            return errorResponse(res, 'password not matched')
        }
        const payload = {
            email: emailfind.email,
            firstname: emailfind.firstname,
            role: emailfind.role,
            lastname: emailfind.lastname,
        }
        const token = tokengenerate(payload)


        successResponse(res, 'logined successfully', { data: payload, token })
    } catch (error) {
        errorResponse(res, 'error at login', 500, error.message)
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        successResponse(res, 'logged out successfully')
    } catch (error) {
        errorResponse(res, 'error at logout', 500, error.message)
    }
}