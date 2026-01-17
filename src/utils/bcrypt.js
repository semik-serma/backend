import bcrypt from 'bcrypt'


export const hashthepassword=async(monkey)=>{
    return bcrypt.hashSync(monkey,10)
}
