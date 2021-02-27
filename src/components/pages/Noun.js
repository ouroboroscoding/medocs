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
import { Link, useLocation } from 'react-router-dom';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Composites components
import NotFound from 'components/composites/NotFound';

// Date modules
import Services from 'data/services';

// Shared Generic modules
import Events from 'shared/generic/events';

// URI regex
const _reURI = /^\/noun\/([^/]+)\/(.*)$/

// Theme
const useStyles = makeStyles((theme) => ({
	noun: {
		'& .request': {
			fontFamily: 'courier, sans-serif',
			margin: '-15px 0 15px 0'
		},
		'& .data': {
			'& .title': {
				fontSize: '1.25rem',
				fontWeight: 'bold',
				marginBottom: '15px'
			}
		}
	}
}));

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

	// Styles
	const classes = useStyles();

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
		<Box className={classes.noun}>
			<Typography variant="h1">{noun.title}</Typography>
			<Typography className="request">{noun.method} /{noun.serviceName}/{noun.uri}</Typography>
			{noun.session === 1 &&
				<Typography>Requires <Link to="/authorization">Authorization</Link></Typography>
			}
			<Typography>{noun.description}</Typography>
			<Grid container spacing={4} className="data">
				<Grid item xs={12} md={6}>
					<Typography variant="h3">Request Data</Typography>
					{noun.data.length === 0 ?
						<Typography>This Noun has no data points</Typography>
					:
						<Grid container spacing={1} className="gridTable">
							<Grid item xs={6} md={2} className="gridHeader">Field</Grid>
							<Grid item xs={6} md={2} className="gridHeader">Type</Grid>
							<Grid item xs={12} md={8} className="gridHeader">Description</Grid>
							{noun.data.map((d,i) =>
								<React.Fragment>
									<Grid item xs={6} md={2} className={i%2===0?'odd':'even'}>{d.field}</Grid>
									<Grid item xs={6} md={2} className={i%2===0?'odd':'even'}>{d.type}</Grid>
									<Grid item xs={12} md={8} className={i%2===0?'odd':'even'}>{d.description}</Grid>
								</React.Fragment>
							)}
						</Grid>
					}
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant="h3">Responses</Typography>
					{noun.response.map(s =>
						<Box className="example">{s}</Box>
					)}
				</Grid>
			</Grid>
		</Box>
	);
}
