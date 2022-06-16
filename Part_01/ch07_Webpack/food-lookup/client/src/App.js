import logo from './logo.svg';
import React from 'react';
import './App.css';
//import './semantic-ui-dist/semantic.min.css';
import SelectedFoods from './SelectedFoods';
import FoodSearch from './FoodSearch';

class App extends React.Component {
  state = {
    selectedFoods: [],
  };

  render() {
    return (
      <div className='App'>
        <img src={logo} className="App-logo" alt="logo" />
        <div className='ui text container'>
          <SelectedFoods
            foods={this.state.selectedFoods}
            onFoodClick={
              (idx) => (
                this.setState({
                  selectedFoods: [
                    ...this.state.selectedFoods.slice(0, idx),
                    ...this.state.selectedFoods.slice(
                      idx + 1, this.state.selectedFoods.length
                    ),
                  ],
                })
              )
            }
          />
          <FoodSearch
            onFoodClick={
              (food) => (
                this.setState({
                  selectedFoods: this.state.selectedFoods.concat(food),
                })
              )
            }
          />
        </div>
      </div>
    );
  }
}

export default App;
