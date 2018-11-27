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
  componentDidMount(){
    fetch(`${API_URL}/tasks.json`)
      .then(response => response.json())
      .then(data => {
        const array = Object.entries(data)
        const taskList = array.map(([id, values]) =>{
          values.id = id;
          return values;
        })
        
        this.setState({ task: taskList })
      })
  }
  handleClick = (event) => {
    if (this.state.taskName !== '') {
      let tasks = this.state.tasks;
      const newTask = { taskName: this.state.taskName, completed: false }
      fetch(`${API_URL}/tasks.json`, {
        method: 'POST',
        body: JSON.stringify(newTask)
      }).then(() => {
        tasks.push({ taskName: this.state.taskName, completed: false })
        this.setState({ tasks, taskName: '' })
      })
    }
  }
  render() {
    return (
      <div className="App">
        <div>
          <TextField
            hintText="Enter your task here"
            value={this.state.taskName}
            onChange={this.handleChange} />
          <FlatButton label="Add" primary={true} onClick={this.handleClick} />
        </div>
        <div>
          {this.state.tasks.map((task, index) => (
            <div>{task.taskName}</div>
          ))}
        </div>

      </div>
    )
  }
}

export default App