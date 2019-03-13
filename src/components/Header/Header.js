import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header(props) {
    
    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item px-3 pt-2">
                            <NavLink to="/today" className="text-light" activeStyle={{ fontWeight: "bold", color: "red"}}>Prognosis- today</NavLink>
                        </li>
                        <li className="nav-item px-3 pt-2">
                            <NavLink to="/week" className="text-light" activeStyle={{ fontWeight: "bold", color: "red"}}>Prognosis- week</NavLink>
                        </li>
                        <li className="nav-item px-3">
                            <button className="btn btn-primary btn-small" onClick={props.convertUnits}>
                                {(props.unitType==="Metric") ? "Display American" : "Display Metric"}
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}


                    
                    
