//import { nanoid } from "nanoid";
import React from "react";
import EditableTimerList from "./EditableTimerList";
import ToggleableTimerForm from "./ToggleableTimerForm";
import helpers from '../helpers/helpers';
import client from '../helpers/client';

export default class TimersDashboard extends React.Component{
    state = {
        timers:[]
        /*
        timers:[{
            title:'Practice squat',
            project:'Gym Chores',
            id:nanoid(),
            elapsed:5456099,
            runningSince:Date.now()
        },{
            title:'Bake squash',
            project:'Kitchen Chores',
            id:nanoid(),
            elapsed:1273998,
            runningSince:null
        }]
        */
    };
    componentDidMount(){
        this.loadTimersFromServer();
        setInterval(() => {
            this.loadTimersFromServer();
        }, 5000);
    };
    loadTimersFromServer = () => {
        client.getTimers((serverTimers)=>(
            this.setState({timers:serverTimers})
        ));
    };
    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    };
    handleEditFormSubmit = (attrs) => {
        this.updateTimer(attrs);
    };
    handleTrashClick = (timerId) => {
        this.deleteTimer(timerId);
    };
    handleStartClick = (timerId) => {
        this.startTimer(timerId);
    };
    handleStopClick = (timerId) => {
        this.stopTimer(timerId);
    };
    createTimer = (timer) => {
        const t = helpers.newTimer(timer);
        this.setState({timers:this.state.timers.concat(t)});

        client.createTimer(t);
    };
    updateTimer = (attrs) => {
        this.setState({
            timers: this.state.timers.map((timer)=>{
                if(timer.id===attrs.id){
                    return Object.assign(
                        {}, 
                        timer,
                        {
                            title:attrs.title,
                            project:attrs.project
                        }
                    );
                } else {
                    return timer;
                }
            })
        });

        client.updateTimer(attrs);
    };
    deleteTimer = (timerId) => {
        this.setState({
            timers: this.state.timers.filter(t=> t.id!==timerId)
        });

        client.deleteTimer({id:timerId});
    };
    startTimer = (timerId) =>{
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map((timer)=>{
                if(timer.id===timerId){
                    return Object.assign(
                        {},
                        timer,
                        {
                            runningSince:now
                        }
                    );
                } else {
                    return timer;
                }
            })
        });

        client.startTimer({id:timerId, start:now});
    };
    stopTimer = (timerId) =>{
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map((timer)=>{
                if(timer.id===timerId){
                    const lastElapsed = now - timer.runningSince;
                    return Object.assign(
                        {},
                        timer,
                        {
                            elapsed:timer.elapsed + lastElapsed,
                            runningSince:null
                        }
                    );
                } else {
                    return timer;
                }
            })
        });

        client.stopTimer({id:timerId, stop:now});
    };
    render(){
        return(
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList timers={this.state.timers} 
                        onFormSubmit={this.handleEditFormSubmit} 
                        onTrashClick={this.handleTrashClick} 
                        onStartClick={this.handleStartClick} 
                        onStopClick={this.handleStopClick} />
                    <ToggleableTimerForm isOpen={false} onFormSubmit={this.handleCreateFormSubmit} />
                </div>
            </div>
        );
    }
}