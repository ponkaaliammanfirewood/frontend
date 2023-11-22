import {  useEffect, useState } from "react"
import url from "./path"

export default function Brokerton(){

    const [brokername,setBrokername]=useState('')
     const [data,setData]=useState([])
     useEffect(()=>{

      const fetching=async()=>{
        await fetch(`${url}/brokerton1`,{
          method:'get',
          headers: {
              "Content-Type": "application/json",
            },    }).then(async(result)=>{
              const r=await result.json()
          setData(r)
      })
      }
      fetching()
     },[])
   async function find(){
    await fetch(`${url}/brokerton`,{
      method:'post',
      body:JSON.stringify({brokername}),
        headers: {
            "Content-Type": "application/json",
          },    })
          .then(async(result)=>{
         setData(await result.json())
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
            await fetch(`${url}/updatepaytobroker/${Id}`,{
                method:"PUT",
                body:JSON.stringify({paytobroker:updatedStatus}),
                headers: {
                    "Content-Type": "application/json",
                  },

            }).then(async(item)=>{
                const r=await item.json()
                if(r.message==="success"){
                await fetch(`${url}/brokerton`,{
                    method:'post',
                    body:JSON.stringify({brokername}),
                    headers: {
                        "Content-Type": "application/json",
                      },    }).then(async(result)=>{
                        const r=await result.json()
                    setData(r)
                    console.log(r)
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
                                <li>{data.date}--{data.broker}({data.location})--{data.company}---{data.labour}---{data.ton}---{data.payment}{data.payment==='pending'?<button onClick={()=>toggleStatus(data.id)}>pay to broker</button>:null}</li>
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