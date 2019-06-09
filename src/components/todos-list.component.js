import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const Todo = a => (
    <tr>
    <td className={a.todo.todo_completed ? 'completed' : ''}>{a.todo.todo_description}</td>
    <td className={a.todo.todo_completed ? 'completed' : ''}>{a.todo.todo_responsible}</td>
    <td className={a.todo.todo_completed ? 'completed' : ''}>{a.todo.todo_priority}</td>
    <td>
        <Link to={"/edit/"+a.todo._id}>Edit</Link>
    </td>
</tr>
)
    
export default class TodosList extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            description: '',
            responsible: '',
            priority: ''

        };
        this.onfilterDes = this.onfilterDes.bind(this);
        this.onfilterDesRes = this.onfilterDesRes.bind(this);
        this.onfilterPri = this.onfilterPri.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
       
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    onfilterDes(e) {
        this.setState({
            description: e.target.value
        })
        // this.state.todos = this.state.todos.filter((todo) =>{
        //     todo.todo_description.toLowerCase().indexOf(this.state.description.toLowerCase)
        //    })
    }
    onfilterDesRes(e) {
        this.setState({
            responsible: e.target.value
        })
    }
    onfilterPri(e) {
        this.setState({
            priority: e.target.value
        })
    }

    render() {

        // this.state.todos.filter((todo)=> {
        //     return todo.description.toLowerCase().indexOf(this.state.description) !== 1;
        // })

        const data = this.state.todos;

        const contents = data.filter(ele => !ele.todo_description.toLowerCase().indexOf(this.state.description))
        .map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        });

        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <th>
                                <input 
                                type="text" 
                                className="form-control"
                                name = "description"
                                value={this.state.description}
                                onChange={this.onfilterDes}
                                />
                            </th>
                            <th>
                            <input 
                                type="text" 
                                className="form-control"
                                name = "responsible"
                                value={this.state.responsible}
                                onChange={this.onfilterDesRes}
                                />
                            </th>
                            <th>
                            <input 
                                type="text" 
                                name = "priority"
                                className="form-control"
                                value={this.state.priority}
                                onChange={this.onfilterPri}
                                />
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contents}
                    </tbody>
                </table>
            </div>
        )
    }

    
}