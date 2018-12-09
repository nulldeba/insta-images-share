import React,{Component} from 'react';
class Main extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            id:1,
            name:'Debashis Singh',
            phone:'7978104553',
            posts:[]
        }
    }
    saveToLocalStorage()
    {
        localStorage.setItem("user",this.state);
    }
    componentDidMount()
    {
        fetch('http://starlord.hackerearth.com/insta')
      .then(result => result.json())
      .then((result) => {
        this.setState({posts:result});
      });
    }
    render(){
        return(<div>
            </div>);
    }
}
export default Main;