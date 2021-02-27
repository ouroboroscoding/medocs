/**
 * Not Found
 *
 * 404 page
 *
 * @author Chris Nasr <bast@maleexcel.com>
 * @copyright MaleExcelMedical
 * @created 2021-02-10
 */

// NPM modules
import React from 'react';
import { useLocation } from 'react-router-dom';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

/**
 * NotFound
 *
 * Handles 404 Not Found page
 *
 * @name NotFound
 * @access public
 * @param Object props Attributes sent to the component
 * @returns React.Component
 */
export default function NotFound(props) {

	// Hooks
	let location = useLocation();

	// Render
	return (
		<Box>
			<Typography variant="h1">404 Not Found</Typography>
			<Typography>The page {location.pathname} could not be found</Typography>
		</Box>
	);
}
