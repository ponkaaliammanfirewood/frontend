import {  useEffect, useState } from "react"
import url from "./path"

export default function Viewamount1(){
    const [brokername,setBrokername]=useState('')
     const [data,setData]=useState([])
     useEffect(()=>{
        const fetching=async()=>{
            await fetch(`${url}/viewamount1`,{
                method:'get',
                    }).then(async(result)=>{
                    const result1=await result.json()
                    console.log(result1)
                     setData(result1)
                })
        }
        fetching()
     },[])
     async function find(){
        await fetch(`${url}/brokeramount`,{
          method:'post',
          body:JSON.stringify({brokername}),
            headers: {
                "Content-Type": "application/json",
              },    })
              .then(async(result)=>{
             setData(await result.json())
        })
        }
        async function deleteitem(id){
        await fetch(`${url}/delete/${id}`,{
            method:"delete",
            headers: {
                "Content-Type": "application/json",
              },
        })
        .then(async(result)=>{
            setData(await result.json())
            console.log("hi")

        })

        }
    return(
        <div>
            <input value={brokername} className="find" onChange={(e)=>setBrokername(e.target.value)}></input>
            <button onClick={find}>find</button>
            {
                data.length!==0 &&(
                    <>
                    
                    {
                        data.map((data)=>{
                            return(
                            <>
                            <ul>
                                <li>{data.date}----{data.giver}----{data.receiver}----{data.amount} <button onClick={()=>deleteitem(data._id)}>x</button></li>
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