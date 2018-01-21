module.exports = (imdbID) => {
	return imdbID.match(/ch|co|ev|nm|tt\d{7}/);
};
