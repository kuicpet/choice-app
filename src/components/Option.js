import React from 'react';


function Option(props) {
    return(
        <div className="form">
            <input 
                type="text"
                className="input"
                onChange={props.chhange}
                name={props.answerName.name}
                placeholder={props.answerName.placeholder}
            />
        </div>
    )
}

export default Option;