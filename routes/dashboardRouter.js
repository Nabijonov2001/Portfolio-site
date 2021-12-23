const { aboutPost, 
        dashboardGET, 
        blogPost, 
        skillPost,
        skillDelete,
        skillUpdate,
        projecrPost, 
        projectDelete,
        projectUpdate,
        contactPost
        } = require('../controllers/dashboardController')
const router = require('express').Router()


router.get('/', dashboardGET)

router.post('/', aboutPost)

router.post('/post', blogPost)

router.post('/skill', skillPost)

router.put('/skill/:id', skillUpdate)

router.delete('/skill/:id', skillDelete)

router.post('/project', projecrPost)

router.delete('/project/:id', projectDelete)

router.put('/project/:id', projectUpdate)

router.post('/contact', contactPost)

module.exports = {
    router, path:'/dashboard'
}