import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

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

export { router as adminRouter };