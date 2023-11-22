import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './styles.css'
export default function Navbar1() {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav" id="navigation">
            <Nav.Link href="#/">add Ton</Nav.Link>
            <Nav.Link href="#/amount">add Amount</Nav.Link>
            <Nav.Link href="#/labourton">labourton</Nav.Link>
            <Nav.Link href="#/brokerton">brokerton</Nav.Link>
            <Nav.Link href="#/companyton">companyton</Nav.Link>
            <Nav.Link href="#/viewamount">view labouramount</Nav.Link>
            <Nav.Link href="#/brokeramount">add brokeramount</Nav.Link>
            <Nav.Link href="#/viewamount1">view brokeramount</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
