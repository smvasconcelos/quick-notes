import React, { Component } from 'react';
import { FlatList, Modal, View, Text, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import app from '../styles';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { get_data, save_note, delete_data } from './realm';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

import {
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';


export default Login = (props) => {

	const [username, onChangeText] = React.useState(username);
	const [input_title, setTitle] = React.useState(input_title);
	const [input_content, setContent] = React.useState(input_content);
	const [tag_selected, onChangeTag] = React.useState("ALL");
	const [sync_notes, setNotes] = React.useState(sync_notes);
	const [backup_notes, setBackup] = React.useState(backup_notes);
	const [visible, setModal] = React.useState(false);
	const [visible_reg, setModalReg] = React.useState(false);
	const [modal_info, setInfo] = React.useState(modal_info);

	let tags = ["Manhã", "Tarde", "Faculdade", "Dieta"]

	/*
		For later version
	*/

	const list_pickers = () => {

		for (key in tags) {

			return <Picker.Item key={tags[key]} label={tags[key]} value={tags[key]} />;

		}

	}

	const change_state = (info) => {

		setModal(true);
		setInfo(info);

	}

	const list_notes = (note) => {

		const item = note.item;
		const title = modal_info != undefined ? modal_info.title : "";
		const background = title == item.title ? { backgroundColor: "#5D22AB" } : { color: "#000" };

		return (

			<View key={item.title}>
				<TouchableOpacity
					style={app.button_list}
					onPress={() => change_state(item)}>
					<View style={app.icon_wrap}>
						<Icon
							color={'#98929F'}
							style={{ textAlign: 'center' }}
							name={"sticky-note"}
							size={35}
						/>
						<Text numberOfLines={1} ellipsizeMode="tail" style={{ color: "#98929F", margin: 10, width: "55%" }}>{item.title}</Text>
					</View>
					<TouchableOpacity
						style={{ position: 'absolute', right: 15, top: "50%" }}
						onPress={() => delete_note(item.title)}>
						<Icon
							color={'#98929F'}
							style={{ textAlign: 'center' }}
							name={"minus"}
							size={35}
						/>
					</TouchableOpacity>
				</TouchableOpacity>
			</View>

		);


	}

	const search_input = (e) => {

		onChangeText(e);
		if (e === '') {

			setNotes(backup_notes);
			return;

		}

		let text = e.toLowerCase();
		let filtered_notes = backup_notes.filter((item) => {
			if (tag_selected == "ALL")
				return item.title.toLowerCase().match(text);
			else
				if (tag_selected == item.tag)
					return item.title.toLowerCase().match(text);
		});


		setNotes(filtered_notes);

	}

	const search_tag = (tag) => {

		onChangeTag(tag);
		let filtered_notes = backup_notes.filter((item) => {

			if (tag == "ALL")
				return item
			else if (tag == item.tag)
				return item;
		});


		setNotes(filtered_notes);


	}

	const component_built = async () => {

		if (sync_notes == undefined) {

			let async_notes = await get_data("Notas");
			// tira os unicos e coloca na tag
			setNotes(async_notes);
			setBackup(async_notes);

		}

	}

	const save_note_form = async () => {

		const title = input_title;
		const content = input_content;
		const note = { title: title, content: content, tag: "ALL" };
		let save = false;

		if (title !== "" && title !== undefined) {

			if (content !== "" && content !== undefined) {

				save = true;

			} else {

				save = false;

			}

		} else {

			save = false;

		}


		if (save == true) {

			// console.log("save shimashita");
			await save_note(note);
			let data = await get_data("Notas");
			setNotes(data);
			setBackup(data);
			setModalReg(false);
			setTitle("");
			setContent("");

		}

	}

	const delete_update = async (title) => {

		// let data = await get_data("Notas");
		let data = sync_notes.filter((item) => {
			if (item.title != title)
				return item;
		});

		setNotes(data);
		setBackup(data);

		await delete_data("Notas", title);

	}

	const delete_note = (title) =>
		Alert.alert(
			"Deletando ...",
			"Realmente deseja deletar esta nota ?",
			[
				{
					text: "DELETAR",
					onPress: () => delete_update(title),
					style: "ok",
				},
				{
					text: "Cancelar",
					onPress: () => console.log("Cancelado"),
					style: "cancel",
				},
			],
			{
				cancelable: true,
				onDismiss: () =>
					console.log(
						"Fechou por fora."
					),
			}
		);

	const note_screen = () => {

		return (
			<SafeAreaView style={{ ...app.background, flex: 1 }}>
				<View style={{ ...app.container, marginTop: heightPercentageToDP('5%') }}>
					<View style={app.text_wrapper}>
						<TextInput
							secureTextEntry={false}
							style={app.text_input}
							placeholderTextColor={'#000'}
							onChangeText={(text) => search_input(text)}
							value={username}
							placeholder={'Titulo da nota ...'}
						/>
						{/* <View style={app.picker_wrapper}>
							<Picker
								selectedValue={tag_selected}
								style={app.picker}
								onValueChange={(value) => search_tag(value)}>
								<Picker.Item key={'ALL'} label={'Todos'} value={'ALL'} />
								{tags.map((val) => {
									return <Picker.Item key={val} label={val} value={val} />;
								})}
							</Picker>
						</View> */}
						{/* <TouchableOpacity
							style={{...app.button, ...app.white_color}}
							onPress={() => console.log("entrar")}>
							<Text style={app.button_menu}>Entrar</Text>
						</TouchableOpacity> */}
					</View>
					<FlatList
						data={sync_notes}
						renderItem={list_notes}
						keyExtractor={(item, index) =>
							// item.title + (index * 100).toString()
							uuid()
						}
						ListEmptyComponent={() => (
							<View style={app.button_list}>
								<View style={app.icon_wrap}>
									<Icon
										color={'#98929F'}
										style={{ textAlign: 'center' }}
										name={"sticky-note"}
										size={35}
									/>
									<Text style={{ color: "#98929F", margin: 10 }}>Adicione uma nova nota ...</Text>
								</View>
							</View>
						)}
					/>
					<TouchableOpacity
						style={app.button_list}
						onPress={() => setModalReg(true)}>
						<View style={app.icon_wrap, { textAlign: "center" }}>
							<Icon
								color={'#98929F'}
								style={{ textAlign: 'center' }}
								name={"plus"}
								size={40}
							/>
						</View>
					</TouchableOpacity>
				</View>
				{/* SHOW INFO FROM NOTE */}
				<Modal
					animated
					animationType="slide"
					visible={visible}
					transparent
					onRequestClose={() => setModal(false)}>
					<View style={app.overlay}>
						<TouchableWithoutFeedback onPress={() => setModal(false)}>
							<View style={app.overlay} />
						</TouchableWithoutFeedback>
						<View style={app.modal_wraper}>
							<View style={app.modal_title}>
								<Text style={{ textAlign: 'center', color: "#000" }}>{modal_info != undefined ? modal_info.title : " Nothing to see here "}</Text>
							</View>
							<View style={app.modal_content}>
								<ScrollView>
									<Text style={{ textAlign: 'justify', color: "#000" }}>{modal_info != undefined ? modal_info.content : " Nothing to see here "}</Text>
								</ScrollView>
							</View>
							<View style={{ alignSelf: 'flex-end' }}>
								<TouchableOpacity
									style={app.modal_dismiss}
									onPress={() => setModal(false)}>
									<Text style={{ color: "#000" }}>FECHAR</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
				{/* SHOW INFO - ADD NOTE */}
				<Modal
					animated
					animationType="slide"
					visible={visible_reg}
					transparent
					onRequestClose={() => setModalReg(false)}>
					<View style={app.overlay}>
						<TouchableWithoutFeedback onPress={() => setModalReg(false)}>
							<View style={app.overlay} />
						</TouchableWithoutFeedback>
						<View style={app.modal_wraper}>
							<TouchableWithoutFeedback onPress={() => setModalReg(false)}>
								<View style={app.overlay} />
							</TouchableWithoutFeedback>
							<View style={app.modal_title}>
								<Text style={{ textAlign: 'center', color: "#000" }}>Crie Sua Nota Adesiva</Text>
							</View>
							<TextInput
								secureTextEntry={false}
								style={{ ...app.text_input, marginLeft: 10, width: '95%' }}
								placeholderTextColor={'#000'}
								onChangeText={(text) => setTitle(text)}
								value={input_title}
								placeholder={'Titulo da nota ...'}
							/>
							<TextInput
								secureTextEntry={false}
								style={{ ...app.text_input, marginLeft: 10, width: '95%' }}
								placeholderTextColor={'#000'}
								onChangeText={(text) => setContent(text)}
								value={input_content}
								placeholder={'Descrição da nota ...'}
							/>
							<View style={{
								alignSelf: 'flex-end', alignContent: 'space-between', flexDirection: 'row',
							}}>
								<TouchableOpacity
									style={app.modal_dismiss}
									onPress={save_note_form}>
									<Text style={{ color: "#000" }}>SALVAR</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={app.modal_dismiss}
									onPress={() => setModalReg(false)}>
									<Text style={{ color: "#000" }}>FECHAR</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</SafeAreaView >
		);

	}

	component_built();
	return note_screen();

}
