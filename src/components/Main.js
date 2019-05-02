import React, { Component } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Assignment, Refresh, Add } from '@material-ui/icons';
import { connect } from 'react-redux';

import { readTodotxt, addTodoToProject, addTodo, addProject } from '../redux/actions';
import TodoList from './TodoList';
import ProjectTitle from './ProjectTitle';
import PillButton from './PillButton';

const styles = theme => ({
	root: {
		padding: '16px 16px 16px 12px'
	},
	title: {
		fontSize: 24,
		padding: '0px 10px',
		margin: '8px 0px'
	},
	button: {
		fontFamily: 'CircularStd',
		fontWeight: 500,
		padding: '6px 12px 6px 8px',
	},
	project: {
		fontSize: 24
	}
});

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: ''
		}

		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(id) {
		console.log(id);
		this.setState({ selected: id });
	}

	render() {
		const { classes, todos } = this.props;
		return (
			<div className={classes.root}>
				<Grid container alignItems='center'>
					<Grid item xs><h4 className={classes.title}>Get Shit Done</h4></Grid>
					<Grid item>
						<PillButton 
							icon={Assignment} 
							fontSize='default' 
							className={classes.project}
							onClick={() => { this.props.addProject("another project"); }}
						/>
					</Grid>
					<Grid item>
						<PillButton 
							icon={Refresh} 
							fontSize='default' 
							className={classes.project}
							onClick={() => { this.props.readTodotxt(); }}
						/>
					</Grid>
				</Grid>
				<TodoList todos={todos.default} handleSelect={this.handleSelect} selected={this.state.selected} />
				<PillButton 
					className={classes.button} 
					icon={Add} 
					label={"General stuff to do"} 
					color='primary' 
					onClick={() => this.props.addTodo("Hell I got more work")}
				/>
				{Object.keys(todos).map((project) => {
					if (project !== 'default') {
						return (
							<div key={project}>
								<ProjectTitle title={project} />
								<TodoList todos={todos[project]} handleSelect={this.handleSelect} selected={this.state.selected} />
								<PillButton 
									className={classes.button} 
									icon={Add} 
									label={"Stuff to do for " + project} 
									color='primary'
									onClick={() => this.props.addTodoToProject("More " + project + " work", project)} />
							</div>
						);
					}
				})}
			</div>
		);
	}
}

export default connect(
	(state) => { return { todos: state.todos }; },
	{ addTodoToProject, addTodo, addProject, readTodotxt })
(withStyles(styles)(Main));