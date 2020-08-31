import React, { Component } from 'react';
import Popular from './Popular';


class Answers extends Component {
    state = {
        customAnswer: [
            { value: "Yes", name: "name1"},
            { value: "No", name: "name2"}
        ]
    };

    render() {
        let num = Math.floor(
            Math.random() * this.props.options.filter((answer) => answer.value !== "").length + 1
        );
        let custonNum = Math.floor(Math.random() * 2);
        let check = this.props.options.every((answer) => answer.value === "");
        let result = this.props.options.map((answer, index) => {
            if(answer.value !== ""){
                if(index + 1 === num){
                    return (
                        <li key={answer.name} className="">
                            {answer.value.split("").filter((x) => x !== "*").join("")}
                        </li>
                    );
                } else {
                    return (
                        <li key={answer.name}>
                            {answer.value.split("").filter((x) => x !== "*").join("")}
                        </li>
                    );
                }
            } 
        });
        if(check){
            result = this.state.customAnswer.map((answer, index) => {
                if(check) {
                    if(index === custonNum) {
                        return(
                          <li key={answer.name} className="">
                              {answer.value}
                          </li>
                        );
                    } else {
                        return (
                          <li key={answer.name} className="">
                              {answer.value}
                          </li>
                        );
                    }
                } 
            });
        }
        let arrayObj = [];
        Object.entries(this.props.popList).map((el) => {
            if(el[0] !== ""){
                arrayObj.push({ name: el[0], num: el[1]});
            }
        });

        let info = null;
        if(this.props.quest === "") {
            info = (
                <div className="row">
                    <p>
                        This is just some random question.Click on{" "}
                        <span>"Ask a new question"</span>{" "}
                        below to ask a new Question.
                    </p>
                </div>
            );
        }

        let table = null;
        if(this.props.quest !== ""){
            table = (
                <div className="row">
                    <p>
                        List of all asked questions in order of popularity
                    </p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Questions</th>
                                <th>Popularity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrayObj.sort((a,b) => parseFloat(b.num) - parseFloat(a.num))
                            .map((el,index) => {
                                return <Popular question={el["name"]} num={el["num"]} ind={index} />
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }

        return(
            <div className="container">
                {info}
                <div className="row">
                    <h3>{this.props.quest === "" || this.props.quest === "?" ? "Some Random Question?": this.props.quest}</h3>
                    <ol>{result}</ol>
                </div>
                <div>
                    <button className="btn"
                    onClick={this.props.answerToggled}>
                        Toggle Options
                    </button>
                    <button className="btn"
                    onClick={this.props.toggler}>
                        Ask new Question
                    </button>
                </div>
                {table}
            </div>
        );
    }
}

export default Answers;
