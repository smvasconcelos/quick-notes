import { StyleSheet, Dimensions, Platform } from 'react-native';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
	listenOrientationChange as loc,
	removeOrientationListener as rol,
} from 'react-native-responsive-screen';

const width_x = Dimensions.get('window').width;


// background #311557
// light bcakground #8F78AD
// darker background #1C053A

const app = StyleSheet.create({

	background: {
		backgroundColor: '#311557',
	},
	darker_background: {
		backgroundColor: '#1C053A',
	},
	container: {
		alignItems: 'center',
		flex: 1,
	},

	text_wrapper: {
		width: wp('100%'),
		alignItems: 'center',
		alignContent: 'center',
		textAlign: 'center',
	},

	picker_wrapper: {
		padding: wp('1%'),
		margin: hp('2%'),
		borderRadius: 5,
		backgroundColor: '#8F78AD',
		elevation: 1,
		width: '85%',
	},
	picker: {
		height: hp('5%'),
		width: wp('85%'),
		fontSize: wp('5%'),
		color: '#000',
	},
	//   INPUT
	text_input: {
		height: 50,
		padding: wp('3%'),
		// borderColor: '#fff',
		// borderWidth: 2,
		marginBottom: 10,
		marginTop: 10,
		fontFamily: 'times',
		color: '#000',
		width: wp('85%'),
		borderRadius: 5,
		backgroundColor: '#8F78AD',
	},
	button_list: {
		width: wp("85%"),
		margin: 10,
		padding: 15,
		borderRadius: 5,
		backgroundColor: '#1C053A',
	},
	icon_wrap: {
		width: wp('100%'),
		alignContent: 'space-between',
		flexDirection: 'row',
	},
	overlay: {
		backgroundColor: 'rgba(0,0,0,0.1)',
		flex: 1,
		justifyContent: 'flex-end',
	},
	modal_wraper: {

		backgroundColor: "#1C053A",
		height: hp("35%"),
		padding: 10,
		paddingTop: 15,

	},
	modal_title: {

		padding: 10,
		margin: 10,
		backgroundColor: "#8F78AD",
		borderRadius: 5,

	},
	modal_content: {

		padding: 10,
		margin: 10,
		backgroundColor: "#8F78AD",
		maxHeight: hp("15%"),
		borderRadius: 5,

	},
	modal_dismiss: {

		backgroundColor: "#8F78AD",
		padding: 10,
		marginRight: 10,
		borderRadius: 5,

	},
});



export default app;
