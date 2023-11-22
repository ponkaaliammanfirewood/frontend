import {  useEffect, useState } from "react"
import url from "./path"

export default function Viewamount(){
     const [data,setData]=useState([])
     const [data1,setData1]=useState([])
     useEffect(()=>{
        const fetching=async()=>{
            await fetch(`${url}/viewamount`,{
                method:'get',
                    }).then(async(result)=>{
                    const result1=await result.json()
                    console.log(result1)
                     setData(result1.cash)
                     setData1(result1.online)
                })
        }
        fetching()
     },[])
    return(
        <div>
            cash
            -----------------
            {
                data.length!==0 &&(
                    <>
                    
                    {
                        data.map((data)=>{
                            return(
                            <>
                            <ul>
                                <li>{data.date}----{data.giver}----{data.receiver}----{data.amount}</li>
                            </ul>
                            </>
                            )
                        })
                    }
                    </>
                )
            }
<br></br>
            online
            -----------
            {
                data1.length!==0 &&(
                    <>
                    
                    {
                        data1.map((data)=>{
                            return(
                            <>
                            <ul>
                                <li>{data.date}----{data.sender}----{data.receiver}----{data.amount}</li>
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