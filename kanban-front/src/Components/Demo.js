import React from 'react'

import {Link} from "react-router-dom";

import Board from './Board'

export default function Demo() {
    return (
        <div>
            <Link to='/'>Home</Link>
            <Board />
        </div>
    )
}
