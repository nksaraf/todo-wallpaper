import React, { Component } from 'react';
import classnames from 'classnames';
import { InputBase, ClickAwayListener, Grid, Checkbox, withStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { connect } from 'react-redux';

import { editTodo, deleteTodo } from '../redux/actions';
import PillButton from './PillButton';

const styles = theme => ({
	root: {},
	checkbox: {
		padding: '4px 8px'
	},
	text: {
		fontSize: 14
	},
	hidden: {
		display: 'none'
	},
	delete: {
		padding: 4
	},
	input: {
		fontFamily: 'CircularStd',
		fontSize: 14
	}
});

class TodoItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: false,
			text: this.props.todo.text
		};

		this.setHover = this.setHover.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	setHover(hover) {
		this.setState({ hover });
	}

	handleChange(event) {
		this.setState({ text: event.target.value });
	}

	render() {
		const { classes, todo, deleteTodo } = this.props;
		const selected = this.props.selected === todo.id;

		let body = <div></div>;

		if (selected) {
			body = (
				<ClickAwayListener onClickAway={() => {
						this.props.editTodo(todo.id, this.state.text);
						this.props.handleSelect('');
					}}
				>
					<InputBase 
						autoFocus
						className={classes.input}
						fullWidth 
						value={this.state.text}
						onChange={this.handleChange} />
				</ClickAwayListener>
			);
		} else {
			body = <div>{todo.text}</div>;
		}

		return (
			<Grid container className={classes.root}
				onClick={() => this.props.handleSelect(todo.id)} 
				alignItems='center' 
				onMouseEnter={() => this.setHover(true)}
				onMouseLeave={() => this.setHover(false)}
			>
				<Grid item>
					<Checkbox className={classes.checkbox} disableRipple/>
				</Grid>
				<Grid item xs className={classes.text}>
					{body}
				</Grid>
				<Grid item>
					<PillButton className={classnames(this.state.hover ? '' : classes.hidden, classes.delete)} 
						icon={Delete} fontSize='small' color='secondary'
						onClick={() => deleteTodo(todo.id)}
					/> 
				</Grid>
			</Grid>
		);
	}
}

export default connect(null, { deleteTodo, editTodo })(withStyles(styles)(TodoItem));