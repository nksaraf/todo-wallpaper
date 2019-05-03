import React, { Component } from 'react';
import classnames from 'classnames';
import { Grid, withStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { connect } from 'react-redux';

import { deleteProject } from '../redux/actions';
import PillButton from './PillButton';

const styles = theme => ({
	root: {
		fontSize: 18,
		padding: '12px 0px 4px 6px'
	},
	hidden: {
		display: 'none'
	},
	delete: {
		padding: 4
	},
});

const toProperCase = (text) => {
    return text.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

class ProjectTitle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: false
		};

		this.setHover = this.setHover.bind(this);
	}

	setHover(hover) {
		this.setState({ hover });
	}

	render() {
		const { classes, title } = this.props;
		return (
			<Grid container className={classes.root}
				alignItems='center' 
				onMouseEnter={() => this.setHover(true)}
				onMouseLeave={() => this.setHover(false)}
			>
				<Grid item xs>
					<h1 className={classes.root}>{toProperCase(title)}</h1>
				</Grid>
				<Grid item>
					<PillButton className={classnames(this.state.hover ? '' : classes.hidden, classes.delete)} 
						icon={Delete} fontSize='small' color='secondary'
						onClick={() => this.props.deleteProject(title)}
					/> 
				</Grid>
			</Grid>
		);
	}
}

export default connect(null, { deleteProject })(withStyles(styles)(ProjectTitle));