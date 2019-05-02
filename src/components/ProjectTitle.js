import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
	root: {
		fontSize: 18,
		padding: '8px 10px'
	}
});

const toProperCase = (text) => {
    return text.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

class ProjectTitle extends Component {
	render() {
		const { classes, title } = this.props;
		return (
			<h1 className={classes.root}>{toProperCase(title)}</h1>
		);
	}
}

export default withStyles(styles)(ProjectTitle);