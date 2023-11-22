import { useEffect, useState } from "react";
import url from "./path";
// import './styles.css'

export default function Add() {

  const [location, setLocation] = useState("");
  const [ton, setTon] = useState('');
  const [labname, setLabname] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [brokername, setBrokername] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [companynames, setCompanynames] = useState([]);
  const [labourname,setLabourname]=useState([]);
  const [brokers,setBrokers]=useState([])
  const paytolabour='pending'
  const paytobroker='pending'
  const [newbroker,setNewbroker]=useState("")
  const [newlabour,setNewlabour]=useState("")
  const [newcompany,setNewcompany]=useState("")
  useEffect(()=>{
  async function fect (){
await fetch(`${url}/names`,{
  method:"get",
  headers: {
    "Content-Type": "application/json",
  },
}).then(async(result)=>{
  const result1=await result.json()
  setCompanynames(result1.companyname)
  setLabourname(result1.labourname)
  setBrokers(result1.brokername)
})
    }
    fect()

  
  }, []);

  async function submit() {
    if(companyname==='other'){
      setCompanyname(newcompany)
      console.log(companyname)
    }
    if(brokername==='other'){
      setBrokername(newbroker)
      console.log(brokername)
    }
    if(labname==='other'){
      setLabname(newlabour)
      console.log(labname)
    }
    
    try {
     
       await fetch(`${url}/add`, {
        method: "post",
        body: JSON.stringify({ location, labname, companyname, brokername, ton, selectedDate,paytolabour,paytobroker,newbroker,newcompany,newlabour }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (result) => {
        const result1 = await result.json();
        if (result1.message === "success") {
          alert(result1.message);
          setBrokername("");
          setCompanyname("");
          setLabname("");
          setLocation("");
          setTon("");
          setSelectedDate('');
        } else {
          alert(result1.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  
  }

  

  
  return (
    <div className="card">
      <div className="card-content">
          <div>
        <label>
          Select Date
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </label>
        <label>
          Location
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required/>
        </label>
        <label>
          Ton
          <input type="number" value={ton} onChange={(e) => setTon(e.target.value)} required/>
        </label>
        <label >Select a labourname:
        <select  value={labname} onChange={(e) => setLabname(e.target.value)} required>
          <option></option>
          {labourname.map(name => (
            <option  value={name.id}>
              {name.name}
            </option>
          ))}
          <option value="other">other</option>
        </select>
        </label>
        {labname === 'other' && <input onChange={(e) => setNewlabour(e.target.value)} required></input>}

        <label >Select a Companyname:
        <select  value={companyname} onChange={(e) => setCompanyname(e.target.value)} required>
        <option></option>
          {companynames.map(name => (
            <option  value={name.id}>
              {name.name}
            </option>
          ))}
          <option value='other'>other</option>
        </select>
        </label>
        {companyname === 'other' && <input onChange={(e) => setNewcompany(e.target.value)} required></input>}
        <label >Select a brokername:
        <select  value={brokername} onChange={(e) => setBrokername(e.target.value)} required>
        <option></option>
          {brokers.map(name => (
            <option  value={name.id}>
              {name.name}
            </option>
          ))}
          <option value="other">other</option>
        </select>
        {brokername === 'other' && <input onChange={(e) => setNewbroker(e.target.value)} required></input>}
        </label>
       

        
        <div className="card-actions">
        <button type="button" onClick={submit}>Submit</button>
      </div>
        </div>
       
        
      </div>
      
    </div>
  );
}
