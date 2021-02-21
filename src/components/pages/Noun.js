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
		'& .header': {
			marginBottom: '20px',
			'& .title': {
				fontSize: '2rem',
				fontWeight: 'bold'
			},
			'& .request': {
				fontFamily: 'courier, sans-serif'
			}
		},
		'& .description': {
			marginBottom: '10px'
		},
		'& .data': {
			'& .title': {
				fontSize: '1.25rem',
				fontWeight: 'bold',
				marginBottom: '15px'
			},
			'& .request': {
				'& .fields': {
					border: '1px solid black',
					borderRadius: '5px',
					overflow: 'hidden',
					'& .gridHeader': {
						backgroundColor: '#cecece',
						fontWeight: 'bold',
						paddingLeft: '10px'
					},
					'& .odd': {
						backgroundColor: '#fff',
						paddingLeft: '10px'
					},
					'& .even': {
						backgroundColor: '#eee',
						paddingLeft: '10px'
					}
				}
			},
			'& .responses': {
				'& .response': {
					backgroundColor: '#eee',
					border: '1px solid black',
					borderRadius: '5px',
					fontFamily: 'courier, sans-serif',
					marginBottom: '15px',
					overflow: 'hidden',
					padding: '15px'
				}
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
			<Box className="header">
				<Typography variant="h1">{noun.title}</Typography>
				<Typography className="request">{noun.method} /{noun.serviceName}/{noun.uri}</Typography>
			</Box>
			<Box className="description">
				<Typography>{noun.description}</Typography>
			</Box>
			<Grid container spacing={4} className="data">
				<Grid item xs={12} md={6} className="request">
					<Typography className="title">Request Data</Typography>
					<Grid container spacing={1} className="fields">
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
				</Grid>
				<Grid item xs={12} md={6} className="responses">
					<Typography className="title">Responses</Typography>
					{noun.response.map(s =>
						<Box className="response">{s}</Box>
					)}
				</Grid>
			</Grid>
		</Box>
	);
}
