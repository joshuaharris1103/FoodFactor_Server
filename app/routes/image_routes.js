const express = require('express')
const passport = require('passport')
const Recipe = require('../models/recipe')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })


const router = express.Router()

// update profile image
router.put(
    "/:userId/profile-image", 
    uploadImage.single("image"), // our uploadImage middleware
    (req, res, next) => {
        /* 
           req.file = { 
             fieldname, originalname, 
             mimetype, size, bucket, key, location
           }
        */

        // location key in req.file holds the s3 url for the image
        let data = {}
        if(req.file) {
            data.image = req.file.location
        }

        // HERE IS YOUR LOGIC TO UPDATE THE DATA IN DATABASE
    }
)