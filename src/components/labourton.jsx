import {  useEffect, useState } from "react"
import url from "./path"

export default function Labourton(){

    const [labname,setLabname]=useState('')
     const [data,setData]=useState([])
     const [total,setTotal]=useState('')
     useEffect(()=>{

      const fetching=async()=>{
        await fetch(`${url}/labourton1`,{
          method:'get',
          headers: {
              "Content-Type": "application/json",
            },    }).then(async(result)=>{
          setData(await result.json())
      })
      }
      fetching()
     },[])
   async function find(){
    await fetch(`${url}/labourton`,{
        method:'post',
        body:JSON.stringify({labname}),
        headers: {
            "Content-Type": "application/json",
          },    }).then(async(result)=>{
            const r=await result.json()
        setData(r.data)
        setTotal(r.sum)
    })
    }
    const toggleStatus = async (Id) => {
        try {
            // Find the inquiry with the given itemId
            const datas = data.find((item) => item.id === Id);
            if (datas) {
            if(datas.payment==='payed'){
                alert("already payed")
            }
            else{
            const updatedStatus = getUpdatedStatus(datas.payment);
            await fetch(`${url}/updatepaytolabour/${Id}`,{
                method:"PUT",
                body:JSON.stringify({paytolabour:updatedStatus}),
                headers: {
                    "Content-Type": "application/json",
                  },

            }).then(async(item)=>{
                const r=await item.json()
                if(r.message==="success"){
                await fetch(`${url}/labourton`,{
                    method:'post',
                    body:JSON.stringify({labname}),
                    headers: {
                        "Content-Type": "application/json",
                      },    }).then(async(result)=>{
                    setData(await result.json())
                })
            }
            })
            // Update the local state to reflect the change
        }
          }
        } catch (error) {
          console.error('Error updating status:', error);
        }
      };
    
      const getUpdatedStatus = (currentStatus) => {
        switch (currentStatus) {
          case 'pending':
            return 'payed';
          default:
            return currentStatus;
        }
      };
    return(
        <div>
            <input value={labname} className="find" onChange={(e)=>setLabname(e.target.value)}></input>
            <button onClick={find}>find</button>
            {
              total>0 &&(
                <>
                total is{total}
                </>
              )
            }
            
            {
                data.length!==0 &&(
                    <>
                    <br></br>
                    {
                        data.map((data)=>{
                            return(
                            <>
                            <ul>
                                <li>{data.date}--{data.location}--{data.broker}({data.labour})---{data.ton}---{data.payment}{data.payment==='pending'?<button onClick={()=>toggleStatus(data.id)}>pay to labour</button>:null}</li>
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