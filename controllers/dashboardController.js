const { error } = require('console')
const path = require('path')
const query = require('../db/connectionDB')

module.exports = class Dashboard{

    static dashboardGET = async(req, res)=>{
        try {
            const user = await query('SELECT * FROM  developer;')
            const skills = await query('SELECT * FROM  skill ORDER BY id;')
            const projects = await query('SELECT * FROM  project ORDER BY id;')
            const contact = await query('SELECT * FROM  contact;')
            const comments = await query('SELECT * FROM  msg ORDER BY id DESC;')
            res.render('dashboard', {
                user: user[0],
                skills:skills,
                projects,
                contact: contact[0],
                comments
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async aboutPost(req, res){
        try {
            const {name, job, about} = req.body
            if(!req.files|| req.files.length ==''){
                await query('UPDATE developer SET fullname = $1, job = $2, about_me = $3 WHERE id=$4',
                [name, job, about, 1])
                console.log('malumotlar yangilandi')
                res.redirect('/dashboard')
                return
            } 
            const image = req.files.image
            const imageName = image.name.split('.')[1]
            const imageType = image.mimetype.split('/')[0]
            const imageFormat = image.mimetype.split('/')[1]
            const imagePath  = path.join(__dirname, '..', 'public', 'assets', 'images', `${imageName}-${image.md5}.${imageFormat}`)
            console.log(imagePath)
            const ejs_url = `${imageName}-${image.md5}.${imageFormat}`
            console.log(imagePath)
            if(imageType=='image' || imageType == 'vector'){
                await image.mv(imagePath)
                console.log('image saqlandi')
            }
            await query('UPDATE developer SET fullname = $1, job = $2, about_me = $3, my_image = $4 WHERE id=$5',
            [name, job, about, ejs_url, 1])
            console.log('data has been updated!')
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    static blogPost = async (req, res)=>{
        try {
            const {title, snippet, main} = req.body
            console.log(req.body)
            if(!req.files || req.files.length == ''){
                throw new error('Rasm yuklanishi shart!')
            }
            const image = req.files.image
            const imageName = image.name.split('.')[1]
            const imageType = image.mimetype.split('/')[0]
            const imageFormat = image.mimetype.split('/')[1]
            const imagePath  = path.join(__dirname, '..', 'public', 'assets', 'post_images', `${imageName}-${image.md5}.${imageFormat}`)
            console.log(imagePath)
            const ejs_url = `${imageName}-${image.md5}.${imageFormat}`
            console.log(imagePath)
            if(imageType=='image' || imageType == 'vector'){
                await image.mv(imagePath)
                console.log('image saqlandi')
            }
            const post = await query('INSERT INTO blog (post_image, title, snippet, main) VALUES ($1, $2, $3, $4)',
            [ejs_url, title, snippet, main])
            console.log(post)
            console.log('posted!')
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    static skillPost = async (req, res)=>{
        try {
            const skill = req.body.skill
            const data = await query('INSERT INTO skill (skill_name)  VALUES ($1)', [skill])
            res.status(200).json({
                ok:true,
                data
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    static skillUpdate = async(req, res)=>{
        try {
            const skill = await query('UPDATE skill SET skill_name = $1 WHERE id = $2 RETURNING *', 
            [req.body.skill, req.params.id])
            res.json({
                ok:true,
                skill
            })
        } catch (error) {
            console.log(error)
        }
    }

    static skillDelete = async (req, res)=>{
        try {   
            const skill = await query('DELETE FROM skill WHERE id=$1 RETURNING *', [req.params.id])
            res.json({
                ok:true,
                skill
            })
        } catch (error) {
            console.log(error)
        }
    }

    static projecrPost = async (req, res)=>{
        try {
            const {title, about, link} = req.body
            const data = await query('INSERT INTO project (project_name, about, link)  VALUES ($1, $2, $3)', 
            [title, about, link])
            res.status(200).json({
                ok:true,
                data
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    static projectUpdate = async (req, res)=>{
        try {
            const {project_name, project_about, project_link} = req.body
            const project = await query('UPDATE project SET project_name = $1, about =$2, link=$3 WHERE id = $4 RETURNING *', 
            [project_name, project_about, project_link, req.params.id])
            res.json({
                ok:true,
                project
            })
        } catch (error) {
            console.log(error)
        }
    }

    static projectDelete = async (req, res)=>{
        try {
            const project = await query('DELETE FROM project WHERE id=$1 RETURNING *', [req.params.id])
            res.json({
                ok:true,
                project
            })
            console.log('O`chirildi')
        } catch (error) {
            console.log(error)
        }
    }

    static async contactPost(req, res){
        try {
            const {contact_email, address, phone_number, telegram, github} = req.body 
            console.log(contact_email)
            // console.log(req.body)
            const data = await query('UPDATE contact SET telegram = $1, github = $2, phone_number = $3, address = $4, email=$5 WHERE id=$6',
            [telegram, github, phone_number, address, contact_email, 1])
            console.log(data, 'contact has been updated!')
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }
}