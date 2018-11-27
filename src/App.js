import React, { Component } from 'react'
import { TextField, FlatButton } from 'material-ui';


class App extends Component {

  state = {
    task: [
      {taskName: 'Odkurzanie', completed: false},
      {taskName: 'Nakarmic kota', completed: false}
    ],
    taskName: ''
  }

  render() {
    return (
      <div className="App">
        <div>
            <TextField hintText="Enter your task here" />
            <FlatButton label="Add" primary={true} />
        </div>
        <div>
          {this.state.task.map((task, index) => (
            <div>{task.taskName}</div>
          ))}
        </div>

      </div>
    )
  }
}

export default App