/**
 * Data
 *
 * Displays the Data page
 *
 * @author Chris Nasr <bast@maleexcel.com>
 * @copyright MaleExcelMedical
 * @created 2021-02-21
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
	data: {}
}));

/**
 * Data
 *
 * Handles homepage
 *
 * @name Data
 * @access public
 * @param Object props Attributes sent to the component
 * @returns React.Component
 */
export default function Data(props) {

	// Styles
	const classes = useStyles();

	// Render
	return (
		<Box className={classes.data}>
			<Box className="pageHeader">
				<Typography variant="h1">Data</Typography>
			</Box>
			<Typography>
				This API uses <Link color="secondary" rel="noreferrer" href="https://en.wikipedia.org/wiki/JSON" target="_blank">JSON</Link> to
				communicate data to and from the server. Regardless of input, the Content-Type must be <b>application/json; charset=utf8</b>, and content be an Object with the necessary fields
				like the following example:
			</Typography>
			<Box className="example">
				{`{
  "crm_type": "knk",
  "crm_id": "1",
  "crm_order": "43EDE98399",
}`}
			</Box>
			<Typography>
				And recieves an object with at least one of "data" or "error", like these examples:
			</Typography>
			<Box className="example">
				{`{
  "data": "f35c0803"
}`}
			</Box>
			<Box className="example">
				{`{
  "data": [
    {"_id": "486990d4", "code": 100, "description": "Request data missing or invalid"},
    {"_id": "56fd3f8f", "code": 101, "description": "Content-Type invalid"},
    {"_id": "73e9cc35", "code": 102, "description": "Failed authorization"},
    {"_id": "8e4a415e", "code": 200, "description": "Invalid action"}
  ]
}`}
			</Box>
			<Box className="example">
				{`{
  "error": {
    "code": 1001,
    "msg": [["type", "invalid"], ["key", "invalid"]]
  }
}`}
			</Box>
			<Typography>
				Some nouns require no session in order to be fetched, like the nouns in the docs service which returns the service and noun
				data used on this site, but the majority will require authorization in order to verify who is requesting the data and whether
				they have the correct rights on the type and ID of the object requested.
			</Typography>
		</Box>
	);
}
