import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component{
    
    goToStore = (event) => {
	event.preventDefault();
	console.log('You change the url');
	
	const storeId = this.storeInput.value;

	this.context.router.transitionTo(`/store/${storeId}`);
	}

	render(){
		return (
        <form className="store-selector" onSubmit={this.goToStore}>
		<h2>Please Select A Store</h2>
		<input type="text" required placeholder="Store Name" 
		defaultValue={getFunName()} ref={(input)=>{this.storeInput=input}}/>
		<button type="submit" >Visit Store -></button>
		</form>
		)
	}  
}

StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;