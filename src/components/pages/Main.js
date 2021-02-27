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
import Link from '@material-ui/core/Link';
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
				Welcome to MaleExcel's RESTful micro services API documentation.
				This site will help you get started with how to connect and use
				the individual resources in each service available from <Link color="secondary" target="_blank" href="https://meutils.com">meutils.com</Link>
			</Typography>
			<Typography>
				If you are unfamiliar with REST, or <Link color="secondary" rel="noreferrer"  target="_blank" href="https://en.wikipedia.org/wiki/Representational_state_transfer">Representational State Transfer</Link>,
				or how to make https requests from your chosen platform, please
				be sure to do brush up on the concepts before going any further
				with this documentation.
			</Typography>
		</Box>
	);
}
