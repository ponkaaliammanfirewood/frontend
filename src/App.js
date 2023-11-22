
import { HashRouter,Routes,Route  } from "react-router-dom";

import Add from './components/ton';
import Amount from "./components/amount";
import Labourton from "./components/labourton";
import Brokerton from "./components/brokerton";
import Viewamount from "./components/viewamount";
import Brokeramount from "./components/brokeramount";
import Viewamount1 from "./components/viewamount1";
import Navbar1 from "./components/navbar";
import Companyton from "./components/companyton";

function App() {
  return (
    <>
        <HashRouter>
          <Navbar1 />
            <Routes>
                <Route path='/' element={<Add />}></Route>
                <Route path='/amount' element={<Amount />}></Route>
                <Route path='/labourton' element={<Labourton />}></Route>
                <Route path='/brokerton' element={<Brokerton />}></Route>
                <Route path='/companyton' element={<Companyton />}></Route>
                <Route path='/viewamount' element={<Viewamount />}></Route>
                <Route path='/viewamount1' element={<Viewamount1 />}></Route>
                <Route path='/brokeramount' element={<Brokeramount />}></Route>
            </Routes>
        </HashRouter>
        </>
  );
}

export default App;
