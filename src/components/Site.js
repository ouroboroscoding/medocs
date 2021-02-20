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
import Services from 'data/services';

// Shared communication modules
import Rest from 'shared/communication/rest';

// Shared generic modules
import Events from 'shared/generic/events';

// Composite component modules
import Alerts from 'components/composites/Alerts';
import Header from 'components/composites/Header';
import Menu from 'components/composites/Menu';

// Pages
import Main from 'components/pages/Main';
import Noun from 'components/pages/Noun';

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
	override: {
		padding: '10px',
		'& .MuiFormControl-root, .MuiInputBase-root': {
			width: '100%'
		}
	},
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
		flexGrow: '1'
	},
	menu: {
		flexBasis: 'auto',
		flexShrink: '0',
		flexGrow: '0',
		padding: '5px',
		width: '250px'
	},
	page: {
		flexBasis: '0',
		flexShrink: '1',
		flexGrow: '1',
		padding: '10px',
		overflow: 'auto'
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
	let [loaded, loadedSet] = useState(false);

	// hooks
	let location = useLocation();

	// Load effect
	useEffect(() => {
		Services.init().then(res => {
			loadedSet(true);
		}, err => {
			console.log(err);
			Events.trigger('error', 'Failed to load services');
		});
	}, [])

	// Render
	return (
		<SnackbarProvider maxSnack={3}>
			<Alerts />
			<ThemeProvider theme={Theme}>
				<CssBaseline />
				<div className={classes.site}>
					<Header />
					{loaded ?
						<div className={classes.middle}>
							<div className={classes.menu}>
								<Menu />
							</div>
							<div className={classes.page}>
								<Switch>
									<Route
										exact
										path="/"
									>
										<Main />
									</Route>
									<Route path="*">
										<Noun
											key={location.pathname}
										/>
									</Route>
								</Switch>
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
