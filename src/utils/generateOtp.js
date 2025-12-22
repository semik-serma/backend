import otpGenerator from 'otp-generator';

export const otpgenerate=()=>{
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
}