/**
 * Noun
 *
 * Displays a noun within a service
 *
 * @author Chris Nasr <bast@maleexcel.com>
 * @copyright MaleExcelMedical
 * @created 2021-02-20
 */

// NPM modules
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Composites components
import NotFound from 'components/composites/NotFound';

// Date modules
import Services from 'data/services';

// Shared Generic modules
import Events from 'shared/generic/events';

// URI regex
const _reURI = /^\/([^/]+)\/(.*)$/

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
export default function Noun(props) {

	// State
	let [noun, nounSet] = useState(null);

	// Hooks
	let location = useLocation();

	// Load effect
	useEffect(() => {

		// Get the service and noun uri
		let m = _reURI.exec(location.pathname);

		// If it failed
		if(!m) {
			nounSet(false);
		}

		// Else, fetch the data
		Services.noun(m[1], m[2]).then(res => {
			nounSet(res);
		}, err => {
			if(err === false) {
				nounSet(false);
			} else {
				console.error(err);
				Events.trigger('error', 'Error loading ' + location.pathname);
			}
		})

	}, [location.pathname])

	// If the noun wasn't found
	if(noun === false) {
		return <NotFound />
	}

	// If we're still loading
	if(noun === null) {
		return <Typography>Loading...</Typography>
	}

	// Render
	return (
		<Box>
			<Typography>{noun.title}</Typography>
			<pre>{JSON.stringify(noun, null, 4)}</pre>
		</Box>
	);
}
