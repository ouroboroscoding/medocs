/**
 * Menu
 *
 * Displays the list of services and their nouns
 *
 * @author Chris Nasr <bast@maleexcel.com>
 * @copyright MaleExcelMedical
 * @created 2021-02-20
 */

// NPM modules
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Material UI
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

// Material UI icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// Data modules
import Services from 'data/services';

// Shared generic modules
import { clone, omap, safeLocalStorageJSON } from 'shared/generic/tools';

// Theme
const useStyles = makeStyles((theme) => ({
	menu: {
		display: 'flex',
		flexDirection: 'column',
		flexBasis: 'auto',
		flexShrink: '0',
		flexGrow: '0',
		padding: '5px',
		width: '220px',
		'& .items': {
			flexBasis: '0',
			flexShrink: '1',
			flexGrow: '1',
			overflow: 'auto',
			'& a, a:active, a:hover, a:link, a:visited': {
				color: 'inherit',
				textDecoration: 'none'
			},
			'& .submenu': {
				paddingLeft: '15px'
			},
			'& .selected': {
				color: '#aa1f23'
			}
		}
	}
}));

/**
 * Menu
 *
 * Handles homepage
 *
 * @name Menu
 * @access public
 * @param Object props Attributes sent to the component
 * @returns React.Component
 */
export default function Menu(props) {

	// Styles
	const classes = useStyles();

	// State
	let [menu, menuSet] = useState(safeLocalStorageJSON('menuState', {}))
	let [services, servicesSet] = useState({});

	// Hooks
	let location = useLocation();

	// Load effect
	useEffect(() => {
		servicesSet(Services.get());
	}, []);

	// Open/close service submenus
	function collapseClick(service) {

		// Clone the current menu
		let oMenu = clone(menu);

		// If the menu is open, close it, else open it
		if(service in oMenu) {
			delete oMenu[service];
		} else {
			oMenu[service] = true;
		}

		// Store and set the new menu
		menuSet(oMenu);
		localStorage.setItem('menuState', JSON.stringify(oMenu));
	}

	// Render
	return (
		<Box className={classes.menu}>
			<List className="items">
				<Link to="/data">
					<ListItem button className={'/data' === location.pathname ? 'selected' : ''}>
						<ListItemText primary="Data" />
					</ListItem>
				</Link>
				<Link to="/authorization">
					<ListItem button className={'/authorization' === location.pathname ? 'selected' : ''}>
						<ListItemText primary="Authorization" />
					</ListItem>
				</Link>
				<Link to="/errors">
					<ListItem button className={'/errors' === location.pathname ? 'selected' : ''}>
						<ListItemText primary="Error Codes" />
					</ListItem>
				</Link>
				{omap(services, o =>
					<React.Fragment key={o.name}>
						<ListItem button onClick={ev => collapseClick(o.name)}>
							<ListItemText primary={o.title} />
							{menu[o.name] ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={menu[o.name] || false} timeout="auto" unmountOnExit>
							<List component="div" className="submenu">
								{omap(o.nouns, (n,k) => {
									let sPath = '/noun/' + o.name + '/' + k;
									return (
										<Link key={n._id} to={sPath}>
											<ListItem button className={sPath === location.pathname ? 'selected' : ''}>
												<ListItemText primary={n.title} />
											</ListItem>
										</Link>
									);
								})}
							</List>
						</Collapse>
					</React.Fragment>
				)}
			</List>
		</Box>
	);
}
