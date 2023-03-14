const passport = require('passport')
const Recipe = require('../models/recipe')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', {session: false})

router.put('/like', requireToken, (req, res) => {
    Recipe.findByIdAndUpdate(req.body.recipeId, {
        $push: {
            likes: req.user._id
        }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({
                error: err
            })
        } else {
            res.json(result)
        }
    })
})

router.put('/unlike', requireToken, (req, res) => {
    Recipe.findByIdAndUpdate(req.body.recipeId, {
        $pull: {
            likes: req.user._id
        }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({
                error: err
            })
        } else {
            res.json(result)
        }
    })
})

module.exports = router