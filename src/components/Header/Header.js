import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
    
    return(
        <header className="jumbotron">
            <h1>Weather App - Main Component</h1>
                <ul>
                    <li><Link to="/">Current Weather</Link></li>
                    <li><Link to="/week">Prognosis- week</Link></li>
                    <li><Link to="/today">Prognosis- today</Link></li>
                </ul>
        </header>
    )
}