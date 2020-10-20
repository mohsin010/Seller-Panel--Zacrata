import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiPhoneNumber from 'material-ui-phone-number';

import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import style1 from './mystyle.module.css';
import { number } from 'prop-types';
import firebase from './firebase-config';
import Cookies from 'js-cookie';

var CryptoJS = require("crypto-js");


const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));
const mystyle = {
	marginLeft: "15%",
	textDecoration: 'none'

}

function LoginPage() {
	const classes = useStyles();
	const [errMessage, setErrMessage] = useState(false);
	const [setOpen, setsetOpen] = useState(false);
	const [code, setCode] = useState();
	const [numbers, setNumber] = useState("");





	// const { form, handleChange, resetForm } = useForm({
	// 	number: '',
	// 	otp: '',

	// });

	let history = useHistory();

	function handleSubmit(ev) {
		ev.preventDefault();
		debugger
		var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
		var number = numbers;
		firebase.auth().signInWithPhoneNumber(number, recaptcha).then((e) => {
			// setsetOpen(true)
			var code = prompt('Please Enter OTP', '')

			if (code === null) {
				setErrMessage(!errMessage)
			}


			e.confirm(code).then((result) => {
				console.log(result.user);
				debugger;
				// this.setState({
				// 	number: ''
				// })
				const headers = {
					'Content-Type': 'application/x-www-form-urlencoded',
				}

				let mobile = numbers
				debugger
				axios.post('https://api.zacarta.com/api/seller/auth/login', { mobile: mobile }).then(res => {
					debugger
					if (res.data.success == true) {
						if (res.data.data.token) {
							let token = res.data.data.token
							console.log(token)
							// debugger;
							// var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(token), 'my-secret-key008899').toString();
							// window.sessionStorage.setItem('a#$s!', ciphertext)
							// window.sessionStorage.setItem('_id', res.data.data._id)
							Cookies.set('a#$s!', token);
							Cookies.set('_id', res.data.data.seller._id);

							if (res.data.data.seller.country.code == "us") {
								window.sessionStorage.setItem('coun', '2')

							} else {
								window.sessionStorage.setItem('coun', '1')

							}
							history.push('/new-orders')
						}
					} else {
						setErrMessage(!errMessage)
						history.push('/login')
					}
				}).catch(e => {
					debugger;
					setErrMessage(!errMessage)

				})


			}).catch(function (error) {
				console.log(error)


			});

		})
			.catch(function (error) {

				console.log(error)


			});



	}
	// function handleOtp(e) {
	// 	setCode(form.otp)
	// }
	function handleNumberChange(e) {

		let num = e.replace(/(?!\w|\s)./g, '')
			.replace(/\s+/g, ' ')
			.replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
		let num2 = num.replace(/\s/g, "");
		num2 = "+" + num2
		setNumber(num2);
		// console.log(num2)

	}

	function handleClose() {
		setsetOpen(false)
	};
	useEffect(() => {
		let token = Cookies.get('a#$s!');

		if (token) {
			// debugger;
			// console.log(decryptedData)
			history.push('/new-orders');
		}


	});
	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384">
						<CardContent className="flex flex-col items-center justify-center p-32">
							{/* <Dialog
								open={setOpen}
								onClose={handleClose}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle id="alert-dialog-title">Enter Otp</DialogTitle>
								<DialogContent>
									<TextField
										className="mb-16"
										label="OTP"
										autoFocus
										type="numeric"
										name="otp"
										value={form.otp}
										onChange={handleChange}
										variant="outlined"
										required
										fullWidth
									/>
								</DialogContent>
								<DialogActions>
									// {/* <Link to='/seller-detail'> */}
							{/* <Button onClick={handleOtp} color="primary">
										Done
                                              </Button>
									</Link>
								</DialogActions>
							</Dialog> */}
							<Typography variant="h6" className="mt-16 mb-16">
								LOGIN TO YOUR ACCOUNT
							</Typography>
							<Alert className={!errMessage ? style1.hide : style1.view} severity="error">Please Enter Correct Info..!</Alert>

							<form
								name="loginForm"
								noValidate
								className="flex flex-col justify-center w-full"
								onSubmit={handleSubmit}
							>

								<MuiPhoneNumber defaultCountry={'us'}
									onChange={handleNumberChange}
									value={numbers}
									variant="outlined"
									required
									fullWidth
									className="mb-16"
									label="Mobile Number"
									name="number"

								/>
								<div id="recaptcha" className={style1.recp}></div>

								{/* <Link to="/home" style={mystyle}> */}
								<Button
									variant="contained"
									color="primary"
									className="w-224 mx-auto mt-16"
									aria-label="LOG IN"
									type="submit"
								// onClick={handleSubmit}

								>
									LOGIN
								</Button>
								{/* </Link> */}
							</form>

							{/* <div className="my-24 flex items-center justify-center">
								<Divider className="w-32" />
								<span className="mx-8 font-bold">OR</span>
								<Divider className="w-32" />
							</div> */}

							{/* <Button
								variant="contained"
								color="secondary"
								size="small"
								className="normal-case w-192 mb-8"
							>
								Log in with Google
							</Button> */}

							{/* <Button variant="contained" color="primary" size="small" className="normal-case w-192">
								Log in with Facebook
							</Button> */}

							{/* <div className="flex flex-col items-center justify-center pt-32 pb-24">
								<span className="font-medium">Don't have an account?</span>
								<Link className="font-medium" to="/register">
									Create an account
								</Link>
							</div> */}
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div >
	);
}

export default LoginPage;
