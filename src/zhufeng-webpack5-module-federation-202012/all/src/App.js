import React from 'react';
const RemoteSlides = lazy(()=>import('host/Slides'));
//const RemoteNewList = React.lazy(()=>import('remote/NewsList'));
//TopAwait webpack5的新语法

let RemoteNewList = await import('remote/NewsList');
RemoteNewList = RemoteNewList.default;
//React.lazy
/* function lazy(fn){
    return class extends React.Component{
        state = {Component:null};
        componentDidMount(){
            fn().then(result=>{
                this.setState({Component:result.default});
            });
        }
        render(){
            let {Component} =this.state;
            return Component?<Component/>:null;
        }
    }
} */

const App = ()=>(
    <div>
         <h3>远程组件RemoteSlides</h3>
        <React.Suspense fallback="Loading RemoteSlides">
            <RemoteSlides/>
        </React.Suspense>
        <hr/>
        <h3>远程组件NewsList</h3>
        <React.Suspense fallback="Loading NewsList">
            <RemoteNewList/>
        </React.Suspense>
    </div>
)
export default App;