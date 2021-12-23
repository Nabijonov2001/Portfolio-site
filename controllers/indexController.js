const query = require("../db/connectionDB")

module.exports = class Index{
    static async indexGet(req, res){
        try {
            const user = await query('SELECT * FROM developer')
            const posts = await query('SELECT * FROM blog')
            const skills = await query('SELECT * FROM  skill ORDER BY id;')
            const projects = await query('SELECT * FROM  project ORDER BY id;')
            const contact = await query('SELECT * FROM  contact;')
            console.log(user[0].my_image)
            res.render('index', {
                developer:user[0],
                posts:posts,
                skills: skills,
                projects,
                contact: contact[0]
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async msgPost(req, res){
        try {
            const {name, email, message} = req.body
            const msg = await query('INSERT INTO msg (fullname, email, msg_text) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message])
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }
}