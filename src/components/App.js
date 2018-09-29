import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
class App extends Component {
   constructor() {
       super();

      this.addFish = this.addFish.bind(this);
      this.loadSamples = this.loadSamples.bind(this);
      this.addToOrder = this.addToOrder.bind(this);
      this.removeFromOrder = this.removeFromOrder.bind(this);
      this.updateFish = this.updateFish.bind(this);
      this.removeFish = this.removeFish.bind(this);

        this.state = {
        fishes:{

        },
        order:{}
    }
       
   }
   
    
    componentWillMount(){
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`,{
            context:this,
            state:'fishes'
        });


        const localstorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if(localstorageRef){
            this.setState({
                order:JSON.parse(localstorageRef)
            });
        }
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps,nextState){
             localStorage.setItem(`order-${this.props.params.storeId}`,JSON.stringify(nextState.order))
    }

    addFish(fish){
        const fishes = {...this.state.fishes};
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;

        this.setState({fishes:fishes});
    }

    updateFish(key,updatedFish){
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({
            fishes:fishes
        });
    }

    removeFish(key){
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({
            fishes:fishes
        });
    }

    loadSamples(){
         this.setState({fishes:sampleFishes});
    }

    addToOrder(key){
       const order = {...this.state.order};
       order[key] = order[key] + 1 || 1;
       this.setState({order:order});
}
 
    removeFromOrder(key){
    const order = {...this.state.order};
    delete order[key];
    this.setState({order:order});
}

    render() {
        return (
            <div className="catch-of-the-day">
             <div className="menu">
            <Header tagline="Fresh SeaFood Market"/>
            <ul className="list-of-fishes">
              {
                  Object.keys(this.state.fishes).map(
                     key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={(k)=>{this.addToOrder(k)}}/> 
                  )
              }
            </ul>
            </div>
            <Order 
            fishes={this.state.fishes} 
            order={this.state.order}
            removeFromOrder={this.removeFromOrder}
            params={this.props.params}/>
            <Inventory 
            fishes={this.state.fishes} 
            addFish={(f)=>this.addFish(f)} 
            loadSamples={() =>this.loadSamples()}
            updateFish={this.updateFish}
            removeFish={this.removeFish}
            storeId={this.props.params.storeId}/>
           </div>
        );
    }
}

export default App;