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

	// Render
	return (
		<Box>
			<Typography variant="h2">RESTful API Documentation</Typography>
		</Box>
	);
}
