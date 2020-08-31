import React from 'react';


function Popular(props) {
    return(
        <tr key={props.ind} className="">
            <td>{props.question}</td>
            <td>{props.num}</td>
        </tr>
    );
}

export default Popular;