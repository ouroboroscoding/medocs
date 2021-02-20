/**
 * Header
 *
 * Handles app bar and drawer
 *
 * @author Chris Nasr <bast@maleexcel.com>
 * @copyright MaleExcelMedical
 * @created 2020-04-04
 */

// NPM modules
import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

// Local components
import Loader from './Loader';

// Theme
const useStyles = makeStyles((theme) => ({
	appbar: {
		flexGrow: 0,
		flexShrink: 0
	},
	toolbar: {
		display: 'flex',
		padding: '10px',
		'& .MuiIconButton-root': {
			color: 'rgba(255, 255, 255, 0.54)',
			padding: '5px',
			[theme.breakpoints.down('sm')]: {
				padding: 0
			}
		},
		'& .MuiSvgIcon-root': {
			fontSize: '2rem',
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.5rem'
			}
		}
	},
	tag: {
		flexGrow: 0,
		fontFamily: 'ITCAvantGardePro-Bk',
		fontSize: '16px',
		textAlign: 'right',
		[theme.breakpoints.down('sm')]: {
			fontSize: '10px'
		},
		'& a': {
			color: '#ffffff',
			textDecoration: 'none',
			'& img': {
				width: '240px',
				[theme.breakpoints.down('sm')]: {
					width: '180px'
				}
			}
		}
	},
	loader: {
		flexGrow: 1,
		textAlign: 'center'
	}
}));

// Header component
export default function Header(props) {

	// Styles
	const classes = useStyles();

	// Render the page
	return (
		<AppBar position="relative" className={classes.appbar}>
			<Toolbar className={classes.toolbar}>
				<Box className={classes.tag}>
					<Link to="/">
						<img src="/images/logo.png" alt="MaleExcel Logo" style={{}} />
						<Box>RESTful API Documentation</Box>
					</Link>
				</Box>
				<Box className={classes.loader}>
					<Loader />
				</Box>
			</Toolbar>
		</AppBar>
	);
}
