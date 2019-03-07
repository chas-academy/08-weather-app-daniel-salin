import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
    return(
        <header className="jumbotron">
            <h1>Weather App - Main Component</h1>
            <navbar>
                <ul>
                    <li><Link to="/">Today's Weather</Link></li>
                    <li><Link to="/prognosis">Prognosis</Link></li>
                </ul>
            </navbar>
        </header>
    )
}