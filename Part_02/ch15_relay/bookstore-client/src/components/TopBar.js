import { NavLink } from 'react-router-dom';

import '../styles/TopBar.css';

function TopBar(){
    return(
        <div className="ui top attached fluid secondary mini menu">
          <div className="item" />
          <div className="item">
            <NavLink to="/books">
              <h3 className="ui green header" style={{marginTop: '10px'}}>
                Bookstore Demo
              </h3>
            </NavLink>
          </div>
          <div className="right menu" />
        </div>
    );
}

export default TopBar;