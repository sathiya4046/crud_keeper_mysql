import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import {MdEdit,MdDelete} from "react-icons/md"

const Content = () => {
    const [content,setContent] = useState([""])
    const navigate = useNavigate()
    useEffect(()=>{
        setInterval(()=>{
            try{
                axios.get("http://localhost:4000")
               .then(res=>setContent(res.data))
               .then(err=>console.log(err))
           }catch(error){
               return console.log(error)
           }

        },1000)
    },[])

    const handleDelete =(id)=>{
        axios.delete(`http://localhost:4000/delete/${id}`)
        .then(res=>{
            console.log(res)
            navigate('/')
        })
        .then(err=>console.log(err))
    }

  return (
    <>
        {content ?
            <div className="container-fluid">
            {content.map((item)=>(
                <div className="card m-4" id='card'>
                <div className="card-body">
    
                        <div key={item.id}>
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.notes}</p>
                        </div>
                     <Link to={`/edit/${item.id}`} className="btn btn-primary m-2"><MdEdit/></Link>
                     <button onClick={()=>handleDelete(item.id)} className="btn btn-primary ms-4"><MdDelete/></button>
                </div>
                 </div>  
            ))}
        </div> : <p>List is empty</p>
        }
    </>
  )
}

export default Content