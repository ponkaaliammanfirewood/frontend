import {   useEffect, useState } from "react"
import url from "./path"

export default function Companyton(){

    const [companyname,setCompanyname]=useState('')
     const [data,setData]=useState([])
     useEffect(()=>{
        const fetching=async()=>{
            await fetch(`${url}/companyton1`,{
                method:"get",
                headers: {
                    "Content-Type": "application/json",
                  },

            }).then(async(result)=>{
                const r=await result.json()
                setData(r)
            })
        }
        fetching()
     })
   async function find(){
    await fetch(`${url}/companyton`,{
        method:'post',
        body:JSON.stringify({companyname}),
        headers: {
            "Content-Type": "application/json",
          },    }).then(async(result)=>{
        setData(await result.json())
    })
    }
    
    return(
        <div>
            <input value={companyname} className="find" onChange={(e)=>setCompanyname(e.target.value)}></input>
            <button onClick={find}>find</button>
            {
                data.length!==0 &&(
                    <>
                    <br></br>
                    {
                        data.map((data)=>{
                            return(
                            <>
                            <ul>
                                <li>{data.date}--{data.broker}---{data.company}--{data.ton}</li>
                            </ul>
                            </>
                            )
                        })
                    }
                    </>
                )
            }
        </div>
    )
}