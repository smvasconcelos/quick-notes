import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Realm from '../service/realm';


export const save_note = async (note) => {

	const realm = await Realm();
	try {

		realm.write(() => {
			realm.create(
				'Notas',
				{ title: String(note.title), content: String(note.content), tag: String(note.tag) },
				'modified'
			);
		});

	} catch (e) {

		console.log('Erro ao salvar notas.');

	}

}

export const get_data = async (data_name) => {

	const realm = await Realm();
	const data = realm.objects(data_name);

	return data;

}

export const delete_data = async (data_name, title) => {

	const realm = await Realm();
	realm.write(() => {

		const data = realm.objects(data_name).filtered(`title == "${title}"`);
		data.map(val => {

			console.debug(val.title);

		});
		realm.delete(data);

	});

}

export const delete_db_info = async () => {

	const realm = await Realm();

	realm.write(() => {

		realm.deleteAll();

	});

}

