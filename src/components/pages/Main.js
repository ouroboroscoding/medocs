/**
 * Main
 *
 * Displays the homepage
 *
 * @author Chris Nasr <bast@maleexcel.com>
 * @copyright MaleExcelMedical
 * @created 2021-02-20
 */

// NPM modules
import React from 'react';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Theme
const useStyles = makeStyles((theme) => ({
	main: {}
}));

/**
 * Main
 *
 * Handles homepage
 *
 * @name Main
 * @access public
 * @param Object props Attributes sent to the component
 * @returns React.Component
 */
export default function Main(props) {

	// Styles
	const classes = useStyles();

	// Render
	return (
		<Box className={classes.main}>
			<Box className="pageHeader">
				<Typography variant="h1">RESTful API Documentation</Typography>
			</Box>
			<Typography>
				Welcome to Male Excel's RESTful micro services API documentation.
				This site will help you get started with how to connect and use
				the individual nouns in each service.
			</Typography>
		</Box>
	);
}
