import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

import TodoItem from './TodoItem';

const styles = theme => ({
	root: {}
});

class TodoList extends Component {
	render() {
		const { classes, todos, handleSelect, selected } = this.props;
		return (
			<div className={classes.root}>
				{todos.map(todo => {
					return <TodoItem key={todo.id} todo={todo} handleSelect={handleSelect} selected={selected} />
				})}
			</div>
		);
	}
}

export default withStyles(styles)(TodoList);