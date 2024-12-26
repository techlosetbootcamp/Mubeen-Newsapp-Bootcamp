import React from 'react'
import { useParams } from 'react-router-dom';


function RouteDetails() {
    const { id } = useParams();
    return (
        <div>
            <div>
                <h1>Details Page</h1>
                <p>Dynamic ID: {id}</p>
            </div>
        </div>
    )
}

export default RouteDetails