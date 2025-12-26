import jwt from 'jsonwebtoken';

export const tokengenerate=(payload)=>{
    return jwt.sign(payload,'key')
}