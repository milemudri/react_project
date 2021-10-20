import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Navbar,Nav,NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './Content';



export default function App () {
    const menu = {
        data: [
            {
                title: "2019",
                link : "/pregled/2019/",
                type: "NavDropdown",
                child: [
                    {
                        title: "Kriminal",
                        link: "/pregled/2019/kriminal/",
                        type: "NavDropdown.Item",
                    },
                    {
                        title: "Idiotizam",
                        link: "/pregled/2019/idiot/",
                        type: "NavDropdown.Item",
                    },
                    {
                        title: "Kontrasi",
                        link: "/pregled/2019/kontra/",
                        type: "NavDropdown.Item",
                    },
                ],
            },
            {
                title: "2020",
                link : "/pregled/2020/",
                type: "NavDropdown",
                child: [
                    {
                        title: "Kriminal",
                        link: "/pregled/2020/kriminal/",
                        type: "NavDropdown.Item",
                    },
                    {
                        title: "Idiotizam",
                        link: "/pregled/2020/idiot/",
                        type: "NavDropdown.Item",
                    },
                    {
                        title: "Kontrasi",
                        link: "/pregled/2020/kontra/",
                        type: "NavDropdown.Item",
                    },
                ],
            },
            {
                title: "2021",
                link : "/pregled/2021/",
                type: "NavDropdown",
                child: [
                    {
                        title: "Kriminal",
                        link: "/pregled/2021/kriminal/",
                        type: "NavDropdown.Item",
                    },
                    {
                        title: "Idiotizam",
                        link: "/pregled/2021/idiot/",
                        type: "NavDropdown.Item",
                    },
                    {
                        title: "Kontrasi",
                        link: "/pregled/2021/kontra/",
                        type: "NavDropdown.Item",
                    },
                ],
            },
            {
                title: "About",
                link: "/about",
                type:"Nav.Link"
            },
            {
                title: "Contact",
                link:"/contact",
                type:"Nav.Link"
            },
        ],
    };
    const NavSub=(child)=>{

        return(
            <div>
                {child.map((e,index)=>(
                    <NavDropdown.Item href={e.link} key={index}>{e.title}</NavDropdown.Item>
                ))}
            </div>
        )

    }


    const renderMenu =  (item)=>{

        return(
            <div>
            {item.filter(i=>i.type==="NavDropdown").map((e,index)=>(
                <NavDropdown id={index}  title={e.title} key={index} href={e.link}>
                    {NavSub(e.child)}
                </NavDropdown>
            ))}
            {item.filter(i=>i.type==="Nav.Link").map((e,index)=>(
                <Nav.Link id={index}  title={e.title} key={index} href={e.link}>
                    {e.title}
                </Nav.Link>
            ))}
        </div>
           )

    }
    const RouteWithSubRoutes=(route,i)=> {
      return (
        <Route key={i}
          path={route.link}
          render={props => (
                <Content {...props} routes={route.child} ></Content>
          )}
        />
      );
    }
    const MenuC=(e)=>{
        console.log(e);
    }
    return(
        <div className="container-fluid">

                <div className="col-md-12 g-1">
                    <Router>
                        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" onClick={(e)=>MenuC(e)}>

                        <NavDropdown id="1"  title="Doks">
                             {renderMenu(menu.data) }
                        </NavDropdown>
                        </Navbar>

                        <Switch>
                            <div className="row">
                                <div className="col-12">
                                  {menu.data.map((route, i) => (
                                    RouteWithSubRoutes(route,i)
                                  ))}
                                </div>
                        </div>
                        </Switch>
                    </Router>
                </div>

        </div>
    )
}
