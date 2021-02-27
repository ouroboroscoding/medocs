/**
 * Authorization
 *
 * Displays the Authorization page
 *
 * @author Chris Nasr <bast@maleexcel.com>
 * @copyright MaleExcelMedical
 * @created 2021-02-26
 */

// NPM modules
import React from 'react';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Theme
const useStyles = makeStyles((theme) => ({
	authorization: {}
}));

/**
 * Authorization
 *
 * Handles homepage
 *
 * @name Authorization
 * @access public
 * @param Object props Attributes sent to the component
 * @returns React.Component
 */
export default function Authorization(props) {

	// Styles
	const classes = useStyles();

	// Render
	return (
		<Box className={classes.authorization}>
			<Box className="pageHeader">
				<Typography variant="h1">Authorization</Typography>
			</Box>
			<Typography>
				Though not all, most resource nouns in this API require
				authorization before data can be read, created, updated, or
				deleted. Authorization in MeMS is via the use of a session token
				which is returned from a sign in to the auth service.
			</Typography>
			<Box className="example">
				{`curl -X POST \\
-H "Content-Type: application/json; charset=utf8" \\
--data '{ \\
  "email": "address@domain.com",
  "passwd": "P4ssw0rd123"
}' \\
--url "https://meutils.com/auth/signin"`}
			</Box>
			<Typography>
				On succesful sign in the client will recieve a session value,
			</Typography>
			<Box className="example">
				{`{
  "data": {
    "session": "539726c4f1d249d3840aaab3314e356c",
    "user": {
      "id": "aee4fcc6-9c8a-11ea-94ce-0800275a8167"
    }
  }
}`}
			</Box>
			<Typography>
				This session key must then be passed to any resources that
				require it, included an attempt to sign out,
			</Typography>
			<Box className="example">
				{`curl -X POST \\
-H "Content-Type: application/json; charset=utf8" \\
-H "Authorization: 539726c4f1d249d3840aaab3314e356c" \\
--data '{}' \\
--url "https://meutils.com/auth/signout"`}
			</Box>
		</Box>
	);
}
