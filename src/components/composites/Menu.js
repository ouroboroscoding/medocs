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
import { Link } from 'react-router-dom';

// Material UI
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

// Material UI icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// Shared communication modules
import Rest from 'shared/communication/rest';

// Shared generic modules
import Events from 'shared/generic/events';
import { clone, safeLocalStorageJSON } from 'shared/generic/tools';

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

	// State
	let [menu, menuSet] = useState(safeLocalStorageJSON('menuState', {}))
	let [services, servicesSet] = useState([]);

	// Load effect
	useEffect(() => {
		servicesFetch();
	// es-lint
	},[]);

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

	// Fetch the list of services and their nouns
	function servicesFetch() {

		// Make the rest to the server ( we use the API to make the API )
		Rest.read('docs', 'services', {
			nouns: ['title', 'uri', 'method']
		}).done(res => {

			// If there's an error
			if(res.error && !res._handled) {
				console.log(res);
				Events.trigger('error', 'Failed to load services');
			}

			// If there's data
			if(res.data) {
				servicesSet(res.data);
			}
		});
	}

	// Render
	return (
		<Box>
			<List>
				{services.map(o =>
					<React.Fragment>
						<ListItem button key={o.title} onClick={ev => collapseClick(o._id)}>
							<ListItemText primary={o.title} />
							{menu[o._id] ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={menu[o._id] || false} timeout="auto" unmountOnExit>
							<List component="div" className="submenu">
								{o.nouns.map(n =>
									<Link to={'/' + o.name + '/' + n.uri + '/' + n.method.toLowerCase()}>
										<ListItem button>
											<ListItemText primary={n.title} />
										</ListItem>
									</Link>
								)}
							</List>
						</Collapse>
					</React.Fragment>
				)}
			</List>
		</Box>
	);
}
