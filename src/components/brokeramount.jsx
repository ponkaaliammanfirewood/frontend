import { useState } from "react";
import './styles.css'
import url from "./path";

export default function Brokeramount(){
  const [sender,setSender]=useState('')
   const [receiver,setReceiver]=useState('')
   const [amount,setAmount]=useState('')
   const [selectedDate, setSelectedDate] = useState("");

      async function payment(){
          try{
             await fetch(`${url}/brokercash`, {
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
    
    return(
        <div className="card">
      <div className="card-content">
        <div className="button-container">
          
        </div>
          <div>
            <div className="button-container">
          <button>Cash</button>
        </div>
       
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
         
           
          </div>
        



        
        
      </div>
      
    </div>

    )
}