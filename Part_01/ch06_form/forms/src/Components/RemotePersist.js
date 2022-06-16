import React from "react";
import isEmail from 'validator/lib/isEmail';
import CourseSelection from "./CourseSelection";
import MyFormField from './MyFormField';

let apiClient = {
  loadPeople: function() {
    return {
      then: function(cb) {
        setTimeout(() => {
          cb(JSON.parse(localStorage.people || '[]'));
        }, 1000);
      }
    };
  },

  savePeople: function(people) {
    const success = !!(this.count++ % 2);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!success) return reject({success});

        localStorage.people = JSON.stringify(people);
        return resolve({success});
      }, 1000);
    });
  },

  count: 1
};

class RemotePersist extends React.Component{
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
            peoples:[],
            _loading: false,
            _saveState: 'READY' /* READY, SAVING, SUCCESS, ERROR */
        };
    };

    componentDidMount = () =>{
        this.setState({_loading:true});
        apiClient.loadPeople().then(p => {
            this.setState({_loading:false, people:p});
        });
    };

    onFormSubmit = (evt) =>{
        const person = this.state.fields;
        evt.preventDefault();
        
        if(this.validate()) return;

        const peoples = [...this.state.peoples, person];
        this.setState({_saveState:'SAVING'});
        apiClient.savePeople(peoples).then(()=>{
            this.setState({
                peoples: peoples,
                fields:{
                    name:'',
                    email:'',
                    course:null,
                    department:null
                },
                _saveState:'SUCCESS'
            });
        }).catch(err=>{
            console.error(err);
            this.setState({_saveState:'ERROR'});
        });
    };

    onInputChange = ({name, value, error}) => {
        const fields = Object.assign({}, this.state.fields);
        const fieldErrors = Object.assign({}, this.state.fieldErrors);

        fields[name]=value;
        fieldErrors[name]=error;
        this.setState({fields, fieldErrors, _saveState:'READY'});
    };

    validate = ()=>{
        const person = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMsges = Object.keys(fieldErrors).filter((k)=>fieldErrors[k]);

        if(!person.name) return true;
        if(!person.email) return true;
        if(!person.department) return true;
        if(!person.course) return true;
        if(errMsges.length) return true;
        return false;
    };

    render(){
        if(this.state._loading){
            return <img alt="loading" src="/img/loading.gif" />
        }

        //var isSubmitValid = this.validate();

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
                    {
                        {
                            SAVING: <input value="Saving..." type="submit" disabled />,
                            SUCCESS: <input value="Saved!" type="submit" disabled />,
                            ERROR: (<input value="Save Failed - Retry?" type="submit" disabled={this.validate()} />),
                            READY: (<input value="Submit" type="submit" disabled={this.validate()} />)
                        }[this.state._saveState]
                    }
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

export default RemotePersist;