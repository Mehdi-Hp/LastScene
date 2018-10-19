import objectRenameKeys from 'object-rename-keys';

export default (arrayOfObjects, changes) => {
	return arrayOfObjects.map((object, index) => {
		return objectRenameKeys(object, changes);
	});
};
