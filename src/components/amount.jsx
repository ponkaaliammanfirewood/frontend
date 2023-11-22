import { useState } from "react";
import './styles.css'
import url from "./path";

export default function Amount(){
    const [cash,setCash]=useState(true)
  const [Online,setOnline]=useState(false)
  const [sender,setSender]=useState('')
   const [receiver,setReceiver]=useState('')
   const [amount,setAmount]=useState('')
   const [selectedDate, setSelectedDate] = useState("");

    function method(value){
        if(value==='Cash'){
          setCash(true)
          setOnline(false)
          setSender('')
          setReceiver('')
          setSelectedDate('')
    
        }
        else if(value===  'Online'){
          setCash(false)
          setOnline(true)
          setSender('')
          setReceiver('')
          setSelectedDate('')
        }
    
      }
      async function payment(method){
        if(method==='Cash'){
          try{
             await fetch(`${url}/cash`, {
              method: "post",
              body: JSON.stringify({ sender,receiver,amount, selectedDate }),
              headers: {
                "Content-Type": "application/json",
              },
            }).then(async (result) => {
              const result1 = await result.json();
              if (result1.message === "success") {
                alert(result1.message);
                setSender('')
                setReceiver('')
                setSelectedDate('')
                setAmount('')
              } else {
                alert(result1.message);
              }
            });
    
          }
          catch (error) {
            console.log(error);
          }
        }
        else if(method==='Online'){
          console.log('hi')
          try{
             await fetch(`${url}/online`, {
              method: "post",
              body: JSON.stringify({ sender,receiver,amount, selectedDate }),
              headers: {
                "Content-Type": "application/json",
              },
            }).then(async (result) => {
              const result1 = await result.json();
              if (result1.message === "success") {
                alert(result1.message);
                setSender('')
                setReceiver('')
                setSelectedDate('')
                setAmount('')
              } else {
                alert(result1.message);
              }
            });
    
          }
          catch (error) {
            console.log(error);
          }
    
        }
    
      }
    
    return(
        <div className="card">
      <div className="card-content">
        
          <div>
            <div className="button-container">
          <button onClick={() => method('Cash')}>Cash</button>
          <button onClick={() => method('Online')}>Online</button>
        </div>
        {
          cash &&
          (
            <div>
               <label>
          Select Date
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </label>
               <label>
              Giver
              <input value={sender} onChange={(e) => setSender(e.target.value)}></input>
            </label>
            <label>
              Receiver
              <input value={receiver} onChange={(e) => setReceiver(e.target.value)}></input>
            </label>
          <label>
            Amount
            <input type="number" value={amount}  onChange={(e) => setAmount(e.target.value)}/>
          </label>
          <div className="card-actions">
        <button type="button" onClick={()=>payment('Cash')}>Submit</button>
      </div>
              </div>
          )
        }
        {
          Online && 
          (
            <div>
               <label>
          Select Date
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </label>
               <label>
                Sender
               <select value={sender} onChange={(e) => setSender(e.target.value)}>
            <option></option>
            <option value={"New Account"}>New Account</option>
            <option value={"Old Account"}>Old Account</option>
            <option value={"Mine"}>Mine</option>
            <option value={'other'}>other</option>
          </select>
          {sender==='other' && <input onChange={(e) => setSender(e.target.value)}></input>}
            </label>
            <label>
              Receiver
              <input value={receiver} onChange={(e)=> setReceiver(e.target.value)}></input>
            </label>
          <label>
            Amount
            <input type="number" value={amount}  onChange={(e) => setAmount(e.target.value)} />
          </label>
          <div className="card-actions">
        <button type="button" onClick={()=>payment('Online')}>Submit</button>
      </div>
              </div>
          )
        }
           
          </div>
        



        
        
      </div>
      
    </div>

    )
}