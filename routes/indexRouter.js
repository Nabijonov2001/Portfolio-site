const { indexGet, msgPost } = require('../controllers/indexController')

const router = require('express').Router()

router.get('/', indexGet)
router.post('/', msgPost)


module.exports = {
    router, path:'/' 
}