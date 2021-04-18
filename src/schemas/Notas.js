export default class Notas {
	static schema = {
		name: 'Notas',
		primaryKey: 'title',
		properties: {
			title: 'string',
			content: 'string',
			tag: 'string',
		},
	};
}
