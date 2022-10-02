const userModel = require('../../models/userModel')
const validator = require('../../util/validator')

/*************************************************update user************************************************* */
const updateUserDetails = async function (req, res) {

    try {

        let userDetails = req.body
        let userId = req.params.userId
        let userIdFromToken = req.userId

        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid UserId" })
        }

        const findUserData = await userModel.findById(userId)

        if (!findUserData) {
            return res.status(404).send({ status: false, message: "user not found" })
        }

        if (findUserData._id.toString() != userIdFromToken) {
            return res.status(403).send({ status: false, message: "You Are Not Authorized!!" })
        }

        let { name,password,email,user_name,gender,mobile} = userDetails

        
        if (!validator.isValidRequestBody(userDetails)) {
            return res.status(400).send({ status: false, message: "Please provide user's details to update." })
        }

        if (!validator.validString(name)) {
            return res.status(400).send({ status: false, message: 'name is Required' })
        }
        if (!validator.validString(gender)) {
            return res.status(400).send({ status: false, message: 'Gender is Required' })
        }

        if (!validator.validString(email)) {
            return res.status(400).send({ status: false, message: 'email is Required' })
        }
        if (email) {

            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userDetails.email))
                return res.status(400).send({ status: false, message: "Invalid Email id." })

            const checkEmailFromDb = await userModel.findOne({ email: userDetails.email })

            if (checkEmailFromDb)
                return res.status(404).send({ status: false, message: `emailId is Exists. Please try another email Id.` })
        }


        if (!validator.validString(mobile)) {
            return res.status(400).send({ status: false, message: 'Mobile number is Required' })
        }

        if (mobile) {
            if (!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(userDetails.mobile))
                return res.status(400).send({ status: false, message: "Mobile number must be a valid Indian number." })

            const checkPhoneFromDb = await userModel.findOne({ mobile: userDetails.mobile })

            if (checkPhoneFromDb) {
                return res.status(400).send({ status: false, message: `${userDetails.mobile} is already in use, Please try a new phone number.` })
            }
        }

         if (!validator.validString(user_name)) {
            return res.status(400).send({ status: false, message: 'username is Required' })
        }

        if (user_name) {
            const checkUserNameFromDb = await userModel.findOne({ user_name: userDetails.user_name })

            if (checkUserNameFromDb) {
                return res.status(400).send({ status: false, message: `${userDetails.user_name} is already in use.` })
            }
        }

        if (!validator.validString(password)) {
            return res.status(400).send({ status: false, message: 'password is Required' })
        }

        if (password) {

            if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/).test(password)) {
                return res.status(400).send({ status: false, message: "Password minimum 8 char combinantion of small,capital special char " })
            }
            
        }

        let updateProfileDetails = await userModel.findOneAndUpdate(
            { _id: userId },
              userDetails,
            { new: true })

        return res.status(200).send({ status: true, msg: "User Update Successful!!", data: updateProfileDetails })

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}
module.exports=updateUserDetails