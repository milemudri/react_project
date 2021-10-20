import { Navbar,Nav,NavDropdown,Form,FormControl} from 'react-bootstrap';

export default function Navigation(data){
    console.log(data);
    const mapChild=(item)=>{
        item.map((e)=>{return (<NavDropdown.Item href={e.link}>{e.title}</NavDropdown.Item>)})
    }
    const mapMenu=(item)=>{
        const yourArray = item.map(function (element, index, array) {
            console.log(element);
        if (array.indexOf(element) < 5) {
            return {
               //logic here
            };
        } else {
            return {
                //logic here
            };
        }

    });
    }
    return (
        mapMenu(data)
    )
}
