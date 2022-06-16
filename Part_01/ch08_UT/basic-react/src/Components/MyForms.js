import React from "react";

class MyForm extends React.Component{
    state={
        items:[],
        item:''
    };

    onItemChange = (e) => {
        this.setState({
            item:e.target.value
        });
    };

    addItem = (e) => {
        e.preventDefault();
        this.setState({
            items:this.state.items.concat(
                this.state.item
            ),
            item:''
        });
    };

    render(){
        const submitDisabled = !this.state.item?true:false;
        return (
            <div id="app" className="ui text container">
                <table className="ui selectable structured large table">
                    <thead>
                        <tr>
                            <th data-testid='items'>Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.items.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>
                                <form className="ui form" onSubmit={this.addItem}>
                                    <div className="field">
                                        <input className="prompt" type="text" 
                                            placeholder="Add item..."
                                            value={this.state.item}
                                            onChange={this.onItemChange} />
                                        <button className="ui button" type="submit"
                                            disabled={submitDisabled}>Add item</button>
                                    </div>
                                </form>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default MyForm;