const userModel = require('../../models/userModel')
const counterModel = require('../../models/userPostModel')
const validator = require('../../util/validator')


/****************************************************Create A User********************************************* */
const createUser = async function (req, res) {

    try {
    let userDetails = req.body
   
    if (!validator.isValidRequestBody(userDetails)) {
        return res.status(400).send({ status: false, message: "please provide valid user Details" })
    }

    if (!validator.isValid(userDetails.name)) {
        return res.status(400).send({ status: false, message: "Name is required" })
    }

    if (!validator.isValid(userDetails.email)) {
        return res.status(400).send({ status: false, message: "Email-ID is required" })
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email))
        return res.status(400).send({ status: false, message: "Invalid Email id." })

    const checkEmailFromDb = await userModel.findOne({ email: userDetails.email })

    if (checkEmailFromDb) {
        return res.status(400).send({ status: false, message: `emailId is Exists!` })
    }

    if (!validator.isValid(userDetails.mobile)) {
        return res.status(400).send({ status: false, message: "Mobile number is required" })
    }

    if (!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(userDetails.mobile))
        return res.status(400).send({ status: false, message: "Mobile number must be a valid." })

    const checkPhoneFromDb = await userModel.findOne({ mobile: userDetails.mobile })

    if (checkPhoneFromDb) {
        return res.status(400).send({ status: false, message: `${userDetails.mobile} is already in use!` })
    }

    if (!validator.isValid(userDetails.password)) {
        return res.status(400).send({ status: false, message: "password is required" })
    }

    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/).test(userDetails.password))
        return res.status(400).send({ status: false, message: "password should be minimum 8 letters and contains special,lower,upper char" })

    if (!validator.isValid(userDetails.gender))
        return res.status(400).send({ status: false, msg: "Gender is Required" })

    if (['male', 'female', 'other'].indexOf(userDetails.gender) == -1)
        return res.status(400).send({ status: false, data: "Enter a valid gender ", });

    if (!validator.isValid(userDetails.user_name)) {
        return res.status(400).send({ status: false, message: "username is required" })
    }

    const checkUserNameFromDb = await userModel.findOne({ user_name: userDetails.user_name })

    if (checkUserNameFromDb) {
        return res.status(400).send({ status: false, message: `${userDetails.user_name} is already in use.` })
    }


    const saveUserInDb = await userModel.create(userDetails)
    
    return res.status(201).send({ status: true, message: "user created successfully!!", data: saveUserInDb });
   

    } catch (err) {

    return res.status(500).send({ status: false, error: err.message })

    }

}
module.exports = createUser