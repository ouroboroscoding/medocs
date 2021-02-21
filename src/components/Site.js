/**
 * Site
 *
 * Primary entry into React app
 *
 * @author Chris Nasr <bast@maleexcel.com>
 * @copyright MaleExcelMedical
 * @created 2020-04-04
 */

// NPM modules
import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

// Data modules
import ErrorCodes from 'data/errorCodes';
import Services from 'data/services';

// Shared communication modules
import Rest from 'shared/communication/rest';

// Shared generic modules
import Events from 'shared/generic/events';

// Composite component modules
import Alerts from 'components/composites/Alerts';
import Header from 'components/composites/Header';
import Menu from 'components/composites/Menu';
import NotFound from 'components/composites/NotFound';

// Pages
import Errors from 'components/pages/Errors';
import Main from 'components/pages/Main';
import Noun from 'components/pages/Noun';
import Start from 'components/pages/Start';

// CSS Theme
import Theme from 'components/Theme'

// Local modules
import { LoaderHide, LoaderShow } from './composites/Loader';

// Init the rest services
Rest.init(process.env.REACT_APP_MEMS_DOMAIN, process.env.REACT_APP_MEMS_DOMAIN, {
	error: xhr => {
		console.error('Rest call failed: ', xhr);
		Events.trigger('error',
			'Unable to connect to ' + process.env.REACT_APP_MEMS_DOMAIN +
			': ' + xhr.statusText +
			' (' + xhr.status + ')'
		);
	},
	before: (method, url, data) => {
		LoaderShow();
	},
	after: (method, url, data) => {
		LoaderHide();
	},
	use_session: false
});

// Theme
const useStyles = makeStyles((theme) => ({
	site: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	loading: {
		padding: '10px'
	},
	middle: {
		display: 'flex',
		flexBasis: '0',
		flexShrink: '1',
		flexGrow: '1',
		'& .menu': {
			flexBasis: 'auto',
			flexShrink: '0',
			flexGrow: '0',
			padding: '5px',
			width: '220px'
		},
		'& .page': {
			display: 'flex',
			flexDirection: 'column',
			flexBasis: '0',
			flexShrink: '1',
			flexGrow: '1',
			'& .content': {
				flexBasis: '0',
				flexShrink: '1',
				flexGrow: '1',
				padding: '15px 10px',
				overflow: 'auto',
				'& h1': {
					fontSize: '2rem',
					fontWeight: 'bold',
					margin: '0 0 15px 0'
				},
				'& h2': {
					fontSize: '1.5rem',
					fontWeight: 'bold',
					margin: '0 0 15px 0'
				},
				'& h3': {
					fontSize: '1.25rem',
					fontWeight: 'bold',
					margin: '5px 0 10px 0'
				},
				'& p': {
					marginBottom: '10px'
				},
				'& .gridTable': {
					border: '1px solid black',
					borderRadius: '5px',
					overflow: 'hidden',
					marginTop: 0,
					'& .gridHeader': {
						backgroundColor: '#cecece',
						borderBottom: '1px solid black',
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
				},
				'& .example': {
					backgroundColor: '#eee',
					border: '1px solid black',
					borderRadius: '5px',
					fontFamily: 'courier, sans-serif',
					marginBottom: '15px',
					overflow: 'auto',
					padding: '15px',
					whiteSpace: 'pre',
					width: '100%'
				}
			}
		}
	}
}));

/**
 * Site
 *
 * Primary component of the site
 *
 * @name Site
 * @param Object props Properties passed to the component
 * @return React.Component
 */
export default function Site(props) {

	// Styles
	const classes = useStyles();

	// State
	let [services, servicesSet] = useState(false);
	let [errors, errorsSet] = useState(false);

	// hooks
	let location = useLocation();

	// Load effect
	useEffect(() => {

		// Load the services
		Services.init().then(res => {
			servicesSet(true);
		}, err => {
			console.log(err);
			Events.trigger('error', 'Failed to load services');
		});

		// Load the error codes
		ErrorCodes.init().then(res => {
			errorsSet(true);
		}, err => {
			console.log(err);
			Events.trigger('error', 'Failed to load error codes');
		});

	}, []);

	// Render
	return (
		<SnackbarProvider maxSnack={3}>
			<Alerts />
			<ThemeProvider theme={Theme}>
				<CssBaseline />
				<div className={classes.site}>
					<Header />
					{services ?
						<div className={classes.middle}>
							<div className="menu">
								<Menu />
							</div>
							<div className="page">
								<div className="content">
									<Switch>
										<Route
											exact
											path="/"
										>
											<Main />
										</Route>
										<Route
											exact
											path="/start"
										>
											<Start />
										</Route>
										<Route
											exact
											path="/errors"
										>
											{errors &&
												<Errors />
											}
										</Route>
										<Route path="/noun/">
											<Noun
												key={location.pathname}
											/>
										</Route>
										<Route path="*">
											<NotFound
												key={location.pathname}
											/>
										</Route>
									</Switch>
								</div>
							</div>
						</div>
					:
						<div className={classes.loading}>
							Loading...
						</div>
					}
				</div>
			</ThemeProvider>
		</SnackbarProvider>
	);
}
