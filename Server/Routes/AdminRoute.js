import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query Error" })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email }, 
                "jwt_secrey_key",  // Fixed: comma instead of space
                { expiresIn: '1d' }
            );
            res.cookie('token', token)
            return res.json({ loginStatus: true})
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email and password" })
        }
    })
})

// Add Category
router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)";
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

//get category
router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category"
     con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
     })
})

//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Image')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage : storage
})

// Add Employee
router.post('/add_employee',upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee (name, email, password, salary, address, image, category_id) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            
            const values = [
                req.body.name,
                req.body.email,
                hash,
                req.body.salary,
                req.body.address,
                req.file.filename,
                req.body.category_id
            ]
            con.query(sql, [values], (err, result) => {
                if(err) return res.json({Status: false, Error: "Query Error"})
                    console.log(err)
                return res.json({Status: true, Result: result})
            })
        })
})

//get employee
router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee"
     con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
     })
})

export { router as adminRouter };