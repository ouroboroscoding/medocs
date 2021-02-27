/**
 * ErrorCodes
 *
 * methods to fetch errors
 *
 * @author Chris Nasr <bast@maleexcel.com>
 * @copyright MaleExcelMedical
 * @created 2021-02-21
 */

// Shared communication modules
import Rest from 'shared/communication/rest';

// Module data
let _errors = null;

/**
 * Get
 *
 * Returns all the error codes
 *
 * @name get
 * @access public
 * @returns Object
 */
export function get() {

	// Make sure errors are loaded first
	if(_errors === null) {
		throw new Error('Must call ErrorCodes.init() first');
	}

	// Return errors
	return _errors;
}

/**
 * Initialise
 *
 * Fetches all errors and stores them in a tree
 *
 * @name init
 * @access public
 * @returns Promise
 */
export function init() {

	// Return promise
	return new Promise((resolve, reject) => {

		// Make the rest to the server ( we use the API to make the API )
		Rest.read('docs', 'errors', {}).done(res => {

			// If there's an error
			if(res.error && !res._handled) {
				return reject(res.error);
			}

			// If there's data
			if(res.data) {

				// Init the errors
				_errors = {};

				// Go through each record in the result
				for(let o of res.data) {

					// Add the service by name
					_errors[o.code] = o
				}

				// Return that we're done
				return resolve(true);
			}
		});
	});
}

/**
 * By Code
 *
 * Returns a single error's description by code
 *
 * @name byCode
 * @access public
 * @param Number code The code to fetch
 * @returns Object
 */
export function byCode(code) {

	// Make sure errors are loaded first
	if(_errors === null) {
		throw new Error('Must call ErrorCodes.init() first');
	}

	// If the code doesn't exist
	if(!(code in _errors)) {
		return {description: 'ERROR NOT FOUND', 'examples': ''}
	}

	// Return the error
	return _errors[code];
}

// Default export
const ErrorCodes = {
	get: get,
	init: init,
	byCode: byCode
}
export default ErrorCodes;
