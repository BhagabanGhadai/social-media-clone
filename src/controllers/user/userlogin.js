const userModel = require('../../models/userModel')
const validator = require('../../util/validator')
const jwt=require('jsonwebtoken')

/****************************************************User Login********************************************* */

const userLogin = async function (req, res) {

    try {

        const loginDetails = req.body;

        const { email, password } = loginDetails;

        if (!validator.isValidRequestBody(loginDetails)) {
            return res.status(400).send({ status: false, message: 'Please provide login details' })
        }

        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: 'Email-Id is required' })
        }


        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: 'Password is required' })
        }

        const userData = await userModel.findOne({ email, password });


        let userId = userData._id
        const token = jwt.sign({
            userId: userId,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
        }, 'BYRD87KJVUV%^%*CYTC')

        res.setHeader('user-auth-key', token)
        return res.status(200).send({ status: true, message: "LogIn Successful!!", data: { Token: token } });

    } catch (err) {

        return res.status(500).send({ status: false, error: err.message });

    }
}
module.exports=userLogin