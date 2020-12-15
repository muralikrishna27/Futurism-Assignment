import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      subjects: [],
      levels: [],
      filteredList: []
    };
  }

  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=30&type=multiple')
      .then((res) => res.json())
      .then(res => {
        const { results } = res;
        const levels = [];
        for (let dificultyCount = 0; dificultyCount < results.length; dificultyCount++) {
          const dificultyName = results[dificultyCount].difficulty;
          const isExists = levels.some((value) => value === dificultyName);
          if (!isExists) {
            levels.push(dificultyName);
          }
        }
        levels.unshift('All');
        this.setState({
          subjects: results,
          filteredList: results,
          levels: levels
        });
      });
  }

  change = (event) => {
    const selectedValue = event.target.value;
    const { subjects } = this.state;
    if (selectedValue === 'All') {
      this.setState({
        filteredList: subjects
      });
    } else {
      const filteredList = subjects.filter((value) => value.difficulty === selectedValue);
      this.setState({
        filteredList: filteredList
      });
    }
  }

  render() {
    const { filteredList, levels } = this.state;
    const list = filteredList.map((value, index) => {
      const ans = value.incorrect_answers.map((answers, ind) => {
        return <>
          <span>{ind + 1}{answers}</span><br />
        </>;
      });
      return (
        <>
          <h4>Category: {value.category}</h4>
          <h5>{index + 1}.{value.question}</h5>
          {ans}
          <hr></hr>
        </>
      );
    });

    const dropdown = levels.map((level) => {
      return (
        <option>{level}</option>
      )
    })
    return (
      <div>
        <h1>Questionaire</h1>
        <p>
          Filter by dificulty:
<select onChange={this.change}>
            {dropdown}
          </select>
        </p>
        <hr></hr>
        {list}
      </div>
    )
  }
}

export default App;