/**
 * Errors
 *
 * Displays all error codes
 *
 * @author Chris Nasr <bast@maleexcel.com>
 * @copyright MaleExcelMedical
 * @created 2021-02-21
 */

// NPM modules
import React, { useEffect, useState } from 'react';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Date modules
import ErrorCodes from 'data/errorCodes';

// Shared generic modules
import { omap } from 'shared/generic/tools';

// Theme
const useStyles = makeStyles((theme) => ({
	errors: {}
}));

/**
 * Errors
 *
 * Handles homepage
 *
 * @name Errors
 * @access public
 * @param Object props Attributes sent to the component
 * @returns React.Component
 */
export default function Errors(props) {

	// Styles
	const classes = useStyles();

	// State
	let [codes, codesSet] = useState({});

	// Load effect
	useEffect(() => {
		codesSet(ErrorCodes.get());
	}, []);

	// Render
	return (
		<Box className={classes.errors}>
			<Box className="header">
				<Typography variant="h1">Error Codes</Typography>
			</Box>
			<Typography>
				This is a list of all Error codes that can be returned by the
				API
			</Typography>
			<Grid container spacing={1} className="gridTable">
				<Grid item xs={3} md={1} className="gridHeader">Code</Grid>
				<Grid item xs={9} md={7} className="gridHeader">Description</Grid>
				<Grid item xs={12} md={4} className="gridHeader">Examples</Grid>
				{omap(codes, (c,k,i) =>
					<React.Fragment>
						<Grid item xs={3} md={1} className={i%2===0 ?'odd':'even'}>{c.code}</Grid>
						<Grid item xs={9} md={7} className={i%2===0 ?'odd':'even'}>{c.description}</Grid>
						<Grid item xs={12} md={4} className={i%2===0 ?'odd':'even'}>{c.examples}</Grid>
					</React.Fragment>
				)}
			</Grid>
		</Box>
	);
}
