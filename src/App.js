import React, { Component } from 'react'
import { TextField, FlatButton, IconButton, } from 'material-ui'
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import DeleteIcon from 'material-ui/svg-icons/action/delete';


const API_URL = 'https://poniedzialek-ab82f.firebaseio.com'

class App extends Component {

  state = {
    tasks: [],
    taskName: ''
  }
  handleChange = (event) => {
    this.setState({ taskName: event.target.value })
  }

  loadData = () => {
    fetch(`${API_URL}/tasks.json`)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          this.setState({ tasks: [] })
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

  componentWillMount = () => {
    this.loadData();
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
  handleDelete = (id) => {
    fetch(`${API_URL}/tasks/${id}.json`, {
      method: 'DELETE'
    })
      .then(() => {
        this.loadData()
      })
  }
  handleCheck = (task) => {
    fetch(`${API_URL}/tasks/${task.id}.json`, {
      method: 'PATH',
      body: JSON.stringify({completed: !task.completed})
    })
    .then(() => {
      this.loadData()
    })
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
      <List>
        {this.state.tasks.map((task, index) => (
          <ListItem
            key={task.id}
            primaryText={task.taskName}
            leftCheckbox={
            <Checkbox 
            defaultChecked={task.completed}
            onCheck={() => this.handleCheck(task)} />}
            rightIconButton={
              <IconButton>
                <DeleteIcon onClick={() => this.handleDelete(task.id)} />
              </IconButton>
            }
          />
        ))}
      </List>
    </div>
  )
}
}

export default App