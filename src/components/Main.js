import React, { Component } from 'react';
import Options from './Options';
import Answers from './Answers';


class Main extends Component {
    state = {
        count: 3,
        question: "",
        questionCount: 0,
        allQuestions: [],
        popularityList: {},
        selectAnswer: true,
        toggleDisplay: false,
        placeHolder: ["D","E","F"],
        answers: [
            { value: "", name: "name1", placeHolder: "A"},
            { value: "", name: "name2", placeHolder: "B"},
            { value: "", name: "name3", placeHolder: "C"},
        ]
    };

    onEnterQuestion = (e) => {
        this.setState({
            question: e.target.value
            .split("")
            .filter((el) => el !== "?")
            .join("")
            .concat("?"),
        });
    };

    onEnterOptions = (e) => {
        let currentInput = this.state.answers.find(
            (answer) => answer.name === e.target.name
        );
        currentInput.value = e.target.value;
        let newValue = {
            value: currentInput.value.concat("*"),
            name: currentInput.name,
            placeHolder: currentInput.placeHolder,
        };
        this.setState((prevState) => ({
            ...prevState,
            answers: prevState.answers.map((answer) => 
            answer.name === currentInput.name ? newValue : answer),
        }));
    };

    onAddChoice = () => {
        let newAnswers = [...this.state.answers];
        this.setState((prevState) => ({
            count: prevState.count + 1,
            answers: newAnswers.concat({
                value: "",
                name: "name" + (prevState.count + 1),
                placeHolder: this.state.placeHolder[this.state.count - 3].concat(":"),
            }),
        }));
    };

    onToggleAnswer = () => {
        this.setState({ selectAnswer: !this.state.selectAnswer});
    };

    onCopyQuestion = () => {
        let currentQuestion = this.state.question.toLowerCase();
        let similarQuestions = this.state.allQuestions.filter(
            (question) => question === currentQuestion
        );
        let obj = {};
        this.state.question.split("*").map((el) => {
            if(this.state.question !== ""){
                obj[el.toLowerCase()] 
                ? obj[el.toLowerCase()]++ 
                : (obj[el.toLowerCase()] = 1);
            }
        });
        this.state.allQuestions.map((el) => {
            if(this.state.question !== "") {
                obj[el.toLowerCase()] 
                ? obj[el.toLowerCase()]++ 
                : (obj[el.toLowerCase()] = 1);
            }
        });
        this.setState({
            toggleDisplay: true,
            popularityList: obj,
            questionCount: similarQuestions.length,
            allQuestions: this.state.allQuestions.concat(this.state.question.toLowerCase()),
        });
    };

    onToggleDisplay = () => {
        this.setState({
            toggleDisplay: false,
            question: "",
            count: 3,
            answers: [
                { value: "", name: "name1", placeHolder: "A"},
                { value: "", name: "name2", placeHolder: "B"},
                { value: "", name: "name3", placeHolder: "C"}
            ],
        });
    };

    render(){
        let addOptionsBtn = (
            <button className="btn"
                onClick={this.onAddChoice}
            ><strong>+</strong>Option</button>
        );
        if(this.state.count === 6) {
            addOptionsBtn = (
                <button className="btn" disabled>
                    <strong>+</strong>Option
                </button>
            );
        }
        let choices;
        this.state.toggleDisplay 
        ? (choices = null)
        : (choices = (
            <Options 
                names={this.state.names}
                options={this.state.answers}
                changed={this.onEnterOptions}
                addQuestion={this.onEnterQuestion}
                addChoice={this.onAddChoice}
            />
        ));
        let btns;
        this.state.toggleDisplay 
        ? (btns = null) 
        : (btns = (
            <div>{addOptionsBtn}
                <button 
                    onClick={this.onCopyQuestion}
                    className="btn">
                    Answer
                </button>
            </div>
        ));
        let answers;
        this.state.toggleDisplay 
        ? (answers = (
            <Answers 
                quest={this.state.question}
                options={this.state.answers}
                count={this.state.count}
                popularityList={this.state.popularityList}
                popularity={this.state.questionCount}
                answerToggled={this.onToggleAnswer}
                toggler={this.onToggleDisplay}
            />
        ))
        : (answers = null);
        return (
            <div>
                <header className="header">
                <h1>Choice Maker</h1>
                <p>Use Choice Maker for easy decision making!</p>
                </header>
                {choices}
                {btns}
                {answers}
            </div>
        )
    }
}

export default Main;