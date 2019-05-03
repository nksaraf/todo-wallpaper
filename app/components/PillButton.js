import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button, IconButton, withStyles } from '@material-ui/core';

const styles = theme => ({
	root: {},
	button: {
		borderRadius: 100,
    fontSize: '1.4rem',
    textTransform: 'none',
    lineHeight: '1.4rem',
    padding: '8px 18px 8px 16px',
    '& svg': {
    	marginRight: 6
    }
    //paddingRight: theme.spacing.unit * 1.5
	},
	buttonContained: {
		padding: '7px 16px'
	},
	buttonIcon: {
		fontSize: '1.8rem',
		marginRight: theme.spacing.unit
	},
	iconButton: {
		padding: theme.spacing.unit,
		margin: 'auto 0'
	},
	icon: {
		// fontSize: '1.6rem'
	}
});

/**
 * Pill shaped button with an icon (label is optional). Any other properties will be passed to `Button`.
 */
class PillButton extends Component {
	render() {
		const { classes, icon: Icon, label, fontSize, className, ...other } = this.props;

		if (label) {
			return (
				<Button {...other} classes={{ root: classnames(className, classes.button), contained: classes.buttonContained }} >
	      	<Icon className={classes.buttonIcon} />
	        {label}
	      </Button>
			);
		} else {
			return (
				<IconButton {...other} className={classnames(className, classes.iconButton)}>
					<Icon className={classes.icon} fontSize={fontSize} />
				</IconButton>
			);
		}

	}
}

PillButton.propTypes = {
	/** Icon to display in the button */
	icon: PropTypes.func.isRequired,
	/** Text for the button */
	label: PropTypes.string
}

export default withStyles(styles)(PillButton);