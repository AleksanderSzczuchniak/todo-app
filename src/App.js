import React, { Component } from 'react'
import { TextField, FlatButton } from 'material-ui'

const API_URL = 'https://poniedzialek-ab82f.firebaseio.com'

class App extends Component {

  state = {
    tasks: [],
    taskName: ''
  }
  handleChange = (event) => {
    this.setState({ taskName: event.target.value })
  }
  componentDidMount() {
    fetch(`${API_URL}/tasks.json`)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          return;
        }
        const array = Object.entries(data)
        const taskList = array.map(([id, values]) => {
          values.id = id;
          return values;
        })

        this.setState({ tasks: taskList })
      })
  }
  addTask = () => {
    if (this.state.taskName !== '') {
      let tasks = this.state.tasks;
      let newTask = { taskName: this.state.taskName, completed: false }
      fetch(`${API_URL}/tasks.json`, {
        method: 'POST',
        body: JSON.stringify(newTask)
      })
        .then(response => response.json())
        .then((data) => {
          newTask.id = data.name
          tasks.push(newTask)
          this.setState({ tasks, taskName: '' })
        })
    }
  }
  handleClick = () => {
    this.addTask()
  }
  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.addTask()
    }
  }
  render() {
    return (
      <div className="App">
        <div>
          <TextField
            hintText="Enter your task here"
            value={this.state.taskName}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange} />
          <FlatButton label="Add" primary={true} onClick={this.handleClick} />
        </div>
        <div>
          {this.state.tasks.map((task, index) => (
            <div
              key={task.id}>
              {task.taskName}
            </div>
          ))}
        </div>

      </div>
    )
  }
}

export default App