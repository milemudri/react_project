import React  from 'react';
import Child from './Child';
import Table from './table';

class Parent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            open: false,
            data:[],
            link:'',
            loading:false
        };
        this.togglePopup = this.togglePopup.bind(this);

    }

    togglePopup() {
        this.setState({
            open: !this.state.open,
        });
    }

    componentDidMount(){
        this.SetState={
            loading:true,
        }
        fetch('http://localhost/site/server.php?Data=2&'+this.props.selectlink)
        .then(response=>{
            if(response.ok) {
                console.log(response);
                return response.json();
            }
            throw response;
        })
        .then((dt) =>{
            console.log(dt);
            this.setState({ data: dt });
        }
    )
}

render() {
    return (
        <div className="row">
            <Table data={this.state.data} />
            <Child show={this.state.open} parentAction={this.togglePopup} link={this.state.link}/>
        </div>
    );
}
}

export default Parent;
