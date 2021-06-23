import React from 'react'
import './Landing.css'

import {Link} from "react-router-dom";

export default function Landing() {
    return (
        <div id="main">
            <div id="selections">
                <form>
                    <input type="text" placeholder="Enter Room #"></input>
                    <button type="submit">Enter</button>
                </form>
                <button>Create New Room</button>
                <Link to="/demo">
                    <button>Demo</button>
                </Link>
            </div>
        </div>
    )
}
