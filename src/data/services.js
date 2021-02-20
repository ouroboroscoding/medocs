/**
 * Services
 *
 * methods to fetch services and nouns
 *
 * @author Chris Nasr <bast@maleexcel.com>
 * @copyright MaleExcelMedical
 * @created 2021-02-20
 */

// Shared communication modules
import Rest from 'shared/communication/rest';

// Module data
let _services = null;
let _nouns = {};

/**
 * Get
 *
 * Returns all the services
 *
 * @name get
 * @access public
 * @returns Object
 */
export function get() {

	// Make sure services are loaded first
	if(_services === null) {
		throw new Error('Must call Services.init() first');
	}

	// Return services
	return _services;
}

/**
 * Initialise
 *
 * Fetches all services and stores them in a tree
 *
 * @name init
 * @access public
 * @returns Promise
 */
export function init() {

	// Return promise
	return new Promise((resolve, reject) => {

		// Make the rest to the server ( we use the API to make the API )
		Rest.read('docs', 'services', {
			nouns: ['_id', 'uri', 'method', 'title']
		}).done(res => {

			// If there's an error
			if(res.error && !res._handled) {
				return reject(res.error);
			}

			// If there's data
			if(res.data) {

				// Init the services
				_services = {};

				// Go through each record in the result
				for(let o of res.data) {

					// Create a mapping for the nouns
					let oNouns = {};
					for(let n of o.nouns) {
						oNouns[n.uri + '/' + n.method.toLowerCase()] = n;
					}

					// Add the service by name
					_services[o.name] = {
						description: o.description,
						name: o.name,
						nouns: oNouns,
						title: o.title
					}
				}

				console.log(_services);

				// Return that we're done
				return resolve(true);
			}
		});
	});
}

/**
 * Noun
 *
 * Returns the noun data associated with the text representation of it
 *
 * @name noun
 * @access public
 * @param String service The name of the service
 * @param String uri The URI of the noun
 * @returns Promise
 */
export function noun(service, uri) {

	// Make sure services are loaded first
	if(_services === null) {
		throw new Error('Must call Services.init() first');
	}

	// Return promise
	return new Promise((resolve, reject) => {

		// If the service doesn't exist
		if(!(service in _services)) {
			return reject(false);
		}

		// If the noun doesn't exist
		if(!(uri in _services[service]['nouns'])) {
			return reject(false);
		}

		// Store the ID
		let sID = _services[service]['nouns'][uri]._id;

		// If we already have the data
		if(sID in _nouns) {
			return resolve(_nouns[sID]);
		}

		// Make the rest to the server
		Rest.read('docs', 'noun', {
			_id: sID
		}).done(res => {

			// If there's an error
			if(res.error && !res._handled) {
				return reject(res.error);
			}

			// If there's data
			if(res.data) {

				// Store it for follow up requests
				_nouns[sID] = res.data;

				// Return it
				return resolve(res.data);
			}
		});
	});
}

// Default export
const Services = {
	get: get,
	init: init,
	noun: noun
}
export default Services;
