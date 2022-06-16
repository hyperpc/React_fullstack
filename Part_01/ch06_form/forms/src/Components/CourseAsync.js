import React from "react";
import isEmail from 'validator/lib/isEmail';
import CourseSelection from "./CourseSelection";
import MyFormField from './MyFormField';

class CourseAsync extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fields:{
                name:'',
                email:'',
                department:null,
                course:null
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
                email:'',
                department:'',
                course:''
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
        console.log("person.department: " + person.department);
        if(!person.department) return true;
        console.log("person.course: " + person.course);
        if(!person.course) return true;
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
                    <CourseSelection department={this.state.fields.department}
                        course={this.state.fields.course}
                        onChange={this.onInputChange}
                    />
                    <br/>

                    <input type="submit" disabled={isSubmitValid} />
                </form>
                <div>
                    <h3>Peoples</h3>
                    <ul>
                        { this.state.peoples.map(({name, email, department, course},i)=> 
                        <li key={i}>
                            {[name, email, department, course].join(' - ')}
                        </li>) }
                    </ul>
                </div>
            </div>
        );
    };
}

export default CourseAsync;