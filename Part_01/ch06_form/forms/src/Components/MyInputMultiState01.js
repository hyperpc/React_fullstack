import React from "react";

class MyInputMultiState01 extends React.Component{
    state = {
        fields:{
            name:'',
            email:''
        },
        peoples:[]
    };

    onFormSubmit = (evt) =>{
        if(this.state.fields.name !==undefined && this.state.fields.name !== ''){
            const peoples = [...this.state.peoples, this.state.fields];
            this.setState({peoples, fields:{name:'', email:''}});
        }
        evt.preventDefault();
    };

    onInputChange = (evt) => {
        const fields = Object.assign({}, this.state.fields);
        fields[evt.target.name] = evt.target.value;
        this.setState({fields});
    };

    render(){
        return (
            <div>
                <h1>Sign Up Sheet</h1>
                <form onSubmit={this.onFormSubmit}>
                    <input placeholder="Name" name="name" value={this.state.fields.name} onChange={this.onInputChange} />
                    <input placeholder="Email" name="email" value={this.state.fields.email} onChange={this.onInputChange} />
                    <input type="submit" />
                </form>
                <div>
                    <h3>Peoples</h3>
                    <ul>
                        { this.state.peoples.map(({name, email},i)=> <li key={i}>{name} ({email})</li>) }
                    </ul>
                </div>
            </div>
        );
    }
}

export default MyInputMultiState01;