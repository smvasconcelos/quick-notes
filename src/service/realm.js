import Realm from 'realm';

import Notas from '../schemas/Notas';

export default function getRealm() {
	// return Realm.open({
	// 	schema: [Notas],
	// 	schemaVersion: 9, //add a version number
	// 	migration: (oldRealm, newRealm) => {

	// 		if (oldRealm.schemaVersion < 1) {
	// 			const oldObjects = oldRealm.objects('schema');
	// 			const newObjects = newRealm.objects('schema');

	// 			// loop through all objects and set the name property in the new schema
	// 			for (let i = 0; i < oldObjects.length; i++) {
	// 				newObjects[i].otherName = 'otherName';
	// 			}
	// 		}

	// 	},
	// });

	return Realm.open({
		schema: [Notas],
		schemaVersion: 9,
	});
}
