import React from 'react';
import isEmail from 'validator/lib/isEmail';

class MyFormValidation extends React.Component{
    state = {
        fields:{
            name:'',
            email:''
        },
        fieldErrors: {},
        peoples:[]
    };

    onFormSubmit = (evt) =>{
        const peoples = [...this.state.peoples];
        const person = this.state.fields;
        const fieldErrors = this.validate(person);
        this.setState({fieldErrors});
        evt.preventDefault();
        
        if(Object.keys(fieldErrors).length) return;

        this.setState({
            peoples: peoples.concat(person),
            fields:{
                name:'',
                email:''
            }
        });
    };

    onInputChange = (evt) => {
        const fields = Object.assign({}, this.state.fields);
        fields[evt.target.name] = evt.target.value;
        this.setState({fields});
    };

    validate = (person) =>{
        const error = {};
        if(!person.name) error.name = 'Name Required';
        if(!person.email) error.email='Email Required';
        if(person.email && !isEmail(person.email)) error.email='Invalid Email';
        return error;
    };

    render(){
        return (
            <div>
                <h1>Sign Up Sheet</h1>
                <form onSubmit={this.onFormSubmit}>
                    <input placeholder="Name" name="name" 
                        value={this.state.fields.name} onChange={this.onInputChange} />
                    <span style={{color:'red'}}>{this.state.fieldErrors.name}</span><br />

                    <input placeholder="Email" name="email" 
                        value={this.state.fields.email} onChange={this.onInputChange} />
                    <span style={{color:'red'}}>{this.state.fieldErrors.email}</span><br />

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

export default MyFormValidation;