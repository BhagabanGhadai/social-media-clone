const userModel = require('../../models/userModel')
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
            return res.status(400).send({ status: false, message: `emailId is Exists. Please try another email Id.` })
        }

        if (!validator.isValid(userDetails.phone)) {
            return res.status(400).send({ status: false, message: "phone number is required" })
        }

        if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/).test(userDetails.phone))
            return res.status(400).send({ status: false, message: "Phone number must be a valid Indian number." })

        const checkPhoneFromDb = await userModel.findOne({ phone: userDetails.phone })

        if (checkPhoneFromDb) {
            return res.status(400).send({ status: false, message: `${userDetails.phone} is already in use, Please try a new phone number.` })
        }
        
        if (!validator.isValid(userDetails.password)) {
            return res.status(400).send({ status: false, message: "password is required" })
        }

        if (userDetails.password.length < 8 || userDetails.password.length > 15) {
            return res.status(400).send({ status: false, message: "Password must be of 8-15 letters." })
        }
        
        if (!validator.isValid(userDetails.username)) {
            return res.status(400).send({ status: false, message: "username is required" })
        }

        const checkUserNameFromDb = await userModel.findOne({ username: userDetails.username })

        if (checkUserNameFromDb) {
            return res.status(400).send({ status: false, message: `${userDetails.username} is already in use.` })
        }
        if (!validator.isValid(userDetails.Gender)) return res.status(400).send({ status: false, msg: "Gender is Required" })

        if (['male','female','other'].indexOf(data.title) == -1) return res.status(400).send({status: false,data: "Enter a valid title Mr or Mrs or Miss ",});

        const saveUserInDb = await userModel.create(userDetails);

        return res.status(201).send({ status: true, message: "user created successfully!!", data: saveUserInDb });

    } catch (err) {

        return res.status(500).send({ status: false, error: err.message })

    }

}
module.exports=createUser