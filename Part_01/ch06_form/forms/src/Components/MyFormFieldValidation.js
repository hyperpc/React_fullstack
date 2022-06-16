import React from 'react';
import isEmail from 'validator/lib/isEmail';
import MyFormField from './MyFormField';

class MyFormFieldValidation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields:{
                name:'',
                email:''
            },
            fieldErrors: {},
            peoples:[]
        };
    };

    onFormSubmit = (evt) =>{
        const peoples = this.state.peoples;
        const person = this.state.fields;
        evt.preventDefault();
        
        if(this.validate()) return;

        this.setState({
            peoples: peoples.concat(person),
            fields:{
                name:'',
                email:''
            }
        });
    };

    onInputChange = ({name, value, error}) => {
        const fields = Object.assign({}, this.state.fields);
        const fieldErrors = Object.assign({}, this.state.fieldErrors);

        fields[name]=value;
        fieldErrors[name]=error;
        this.setState({fields, fieldErrors});
    };

    validate = ()=>{
        const person = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMsges = Object.keys(fieldErrors).filter((k)=>fieldErrors[k]);

        if(!person.name) return true;
        if(!person.email) return true;
        if(errMsges.length) return true;
        return false;
    };

    render(){
        var isSubmitValid = this.validate();
        return (
            <div>
                <h1>Sign Up Sheet</h1>
                <form onSubmit={this.onFormSubmit}>
                    <MyFormField placeholder='Name'
                        name='name'
                        value={this.state.fields.name}
                        onChange={this.onInputChange}
                        validate={val => (val?false:'Name Required')}
                    />
                    <br/>
                    <MyFormField placeholder='Email'
                        name='email'
                        value={this.state.fields.email}
                        onChange={this.onInputChange}
                        validate={val => (isEmail(val)?false:'Invalid Email')}
                    />
                    <br/>

                    <input type="submit" disabled={isSubmitValid} />
                </form>
                <div>
                    <h3>Peoples</h3>
                    <ul>
                        { this.state.peoples.map(({name, email},i)=> 
                        <li key={i}>
                            {name} ({email})
                        </li>) }
                    </ul>
                </div>
            </div>
        );
    };
}

export default MyFormFieldValidation;