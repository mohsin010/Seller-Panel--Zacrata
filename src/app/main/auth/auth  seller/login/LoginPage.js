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
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

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

	const { form, handleChange, resetForm } = useForm({
		number: '',

	});


	function handleSubmit(ev) {
		ev.preventDefault();
		resetForm();
	}

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384">
						<CardContent className="flex flex-col items-center justify-center p-32">

							<Typography variant="h6" className="mt-16 mb-32">
								LOGIN TO YOUR ACCOUNT
							</Typography>

							<form
								name="loginForm"
								noValidate
								className="flex flex-col justify-center w-full"
								onSubmit={handleSubmit}
							>
								<TextField
									className="mb-16"
									label="Email"
									autoFocus
									type="text"
									name="email"
									value={form.number}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
								<TextField
									className="mb-16"
									label="Password"
									autoFocus
									type="numeric"
									name="password"
									value={form.number}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
								<Link to="/new-orders" style={mystyle}>
								<Button
									variant="contained"
									color="primary"
									className="w-224 mx-auto mt-16"
									aria-label="LOG IN"
									type="link"

								>
									LOGIN
								</Button>
								</Link>
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

						<div className="flex flex-col items-center justify-center pt-32 pb-24">
							<span className="font-medium">Don't have an account?</span>
							<Link className="font-medium" to="/register">
								Create an account
								</Link>
						</div>
						</CardContent>
					</Card>
				</FuseAnimate>
		</div>
		</div >
	);
}

export default LoginPage;
