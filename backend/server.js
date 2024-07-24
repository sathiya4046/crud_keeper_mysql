import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

const app = express()
const port = 4000

app.use(express.json())
app.use(cors({
    Origin:"http://localhost:3000/",
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"crudkeeper"
})

app.get('/',(req,res)=>{
    const sql = "SELECT * FROM content"
    db.query(sql,(err,data)=>{
        if(err) return res.json({Error:"Get value error"})
        if(data){
            return res.json(data)
        }
    })
})
app.get('/edit/:id',(req,res)=>{
    const sql = "SELECT * FROM content WHERE id = (?)"
    const id = req.params.id
    db.query(sql,[id],(err,data)=>{
        if(err) return res.json({Error:"edit value error"})
        if(data){
            return res.json(data)
        }
    })
})
app.post("/input",(req,res)=>{
        const title = req.body.title
        const notes = req.body.notes
    const sql = "INSERT INTO content (title,notes) VALUES (?)"
    db.query(sql,[[title,notes]],(err,data)=>{
        if(err) return res.json({Error:"Input error"})
        if(data){
            return res.json({Status:"Success"})
        }else{
            return res.json({Error:"Value error"})
        }
    })
})
app.put("/update/:id",(req,res)=>{
    const id = req.params.id
    const sql = 'UPDATE content SET `title`=?,`notes`=? WHERE id=?'
    db.query(sql,[req.body.title,req.body.notes,id],(err,data)=>{
        if(err) return res.json({Error:"update error"})
        return res.json(data)
    })
})
app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id
    const sql = 'DELETE FROM content WHERE id=(?)'
    db.query(sql,[id],(err,data)=>{
        if(err) return res.json({Error:"delete error"})
        return res.json(data)
    })
})

app.listen(port,()=>console.log("port running"))
