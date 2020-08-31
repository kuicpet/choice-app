import React from 'react';
import Option from './Option';


function Options(props) {
    return(
        <div>
            <form>
                <h2>Question</h2>
                <div>
                    <input 
                        type="text"
                        name="question"
                        placeholder="Q: Enter a Question here"
                        className="input"
                        onChange={props.addQuestion}
                    />
                </div>
                <h2>Options</h2>
                {props.options.map((answer) => {
                    return(
                        <Option 
                            key={answer.name}
                            change={props.changed}
                            answerName={answer}
                        />
                    );
                })}
            </form>
        </div>
    )
}

export default Options;