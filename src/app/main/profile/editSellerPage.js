import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
// import Autocomplete from 'react-google-autocomplete';

import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Modal from '@material-ui/core/Modal';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import MenuItem from '@material-ui/core/MenuItem';
// import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PageviewIcon from '@material-ui/icons/Pageview';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Button from '@material-ui/core/Button';
import { blue, green, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import axios from 'axios';
import Cookies from 'js-cookie';


import styles1 from './myStyle.module.css';

import picture from '../../fall-glow-small.jpg'
import { tr } from 'date-fns/locale';



const styles = theme => ({
    root: {
        background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
        color: theme.palette.primary.contrastText,
        width: "auto"
    },

    highlight: {
        backgroundColor: 'red',
    }
});


const overMap = {
    position: "relative",
    // top: "90%",
    // left: "1%",
    border: "0.1px solid black",
    borderRadius: "5px",
    width: "97%",
    height: "110px",
    backgroundColor: "rgb(216, 214, 214)"


}

const hidden = {
    display: 'hidden'
}



// const classes = useStyles();
// function HomePage() {
class EditSellerPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            image1: '',
            image2: '',
            hidden1: true,
            hidden2: true,
            success: false,
            open: false,
            errOpen: false,
            // checkedA: true,
            sr: true,
            storeType: '',

            images: [],
            name: '',
            sellerNumber: '',
            sellerEmail: '',
            sellerPicture: '',
            address: '',
            storeName: '',
            storeNumber: '',
            storeTypeId: '',
            storePicture: '',
            seller: '',


            position: {
                lat: '',
                lng: ''
            }



        }
    }
    onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.setState({
            // const markers = [...this.state.markers];
            // markers[index] = { ...markers[index], position: { lat, lng } };
            // return { markers };
            position: {
                lat: lat,
                lng: lng
            } 
        });
    };

    componentDidMount() {

        let seller = JSON.parse(localStorage.getItem('seller'));
        let token = Cookies.get('a#$s!');
        let _user_id = Cookies.get('_id');

        if (!token) {
            this.props.history.push('./login');
        }

        let _user_info = {
            _user_id: _user_id
        }
        let headers = {
            'Authorization': `bearer ${token} `,

        }
        debugger
        axios.get('https://api.zacarta.com/api/seller/user', {
            headers: headers
        }).then(res => {
            debugger
            if (res.data.success == true) {
                this.setState({
                    name: res.data.data.name,
                    sellerEmail: res.data.data.email,
                    sellerNumber: res.data.data.mobile,
                    storeName: res.data.data.store_name,
                    storeNumber: res.data.data.store_contact_number,
                    address: res.data.data.store_address.address,
                    // markers: seller.store_address.geolocation,
                    // [markers.position.lng]: seller.store_address.geolocation.longitude,
                    // storeTypeId: seller ,
                    position: {
                        lat: res.data.data.store_address.geolocation.latitude,
                        lng: res.data.data.store_address.geolocation.longitude
                    },
                    storeType: res.data.data.storeType,
                    sellerPicture: res.data.data.avatar,
                    storePicture: res.data.data.store_image,
                    hidden1: false,
                    hidden2: false
                })
            }
        }).catch(e => {

        })
    }

    render() {
        const { text, suggestions } = this.state;
        const { classes } = this.props


        return (
            <div className={classes.root}>

                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}  >
                    <div className="flex flex-col items-center  w-full" style={{ marginTop: "2vh" }}>
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-800" >
                                <CardContent className="flex flex-col items-center" style={{ minWidth: "591px", height: "1400px" }} >

                                    <div className={styles1.heading}>
                                        <h1 >Profile</h1>
                                    </div>
                                    <div className={styles1.formdivsec}>
                                        <div className={styles1.formdiv}>
                                            {/* <Grid xs={12}> */}
                                            < Grid xs={12} item className={styles1.uigrids}>
                                                <form noValidate autoComplete="off">


                                                    <div>
                                                        <TextField
                                                            className={styles1.inpts}
                                                            // onChange={this.handleForm}
                                                            name='name'
                                                            id="outlined-name"
                                                            label="Seller Name"
                                                            type="text"
                                                            variant="outlined"
                                                            value={this.state.name}
                                                        />
                                                        <TextField
                                                            className={styles1.inpts}
                                                            // onChange={this.handleForm}
                                                            name='storeName'
                                                            id="outlined-store"
                                                            label="Store Name"
                                                            type="text"
                                                            variant="outlined"
                                                            value={this.state.storeName}

                                                        />



                                                    </div>
                                                    <div>
                                                        <TextField
                                                            className={styles1.inpts}
                                                            // onChange={this.handleForm}
                                                            name='sellerNumber'
                                                            id="outlined-number"
                                                            label="Seller Contact Number"
                                                            type="numeric"
                                                            variant="outlined"
                                                            value={this.state.sellerNumber}

                                                        />
                                                        <TextField
                                                            className={styles1.inpts}
                                                            // onChange={this.handleForm}

                                                            name='storeNumber'
                                                            id="outlined-store-number"
                                                            label="Store Contact Number"
                                                            type="numeric"
                                                            variant="outlined"
                                                            value={this.state.storeNumber}

                                                        />


                                                    </div>
                                                    <div>
                                                        <TextField
                                                            className={styles1.inpts}
                                                            name='sellerEmail'
                                                            id="outlined-seller-email"
                                                            label="Seller Email"
                                                            type="text"
                                                            variant="outlined"
                                                            value={this.state.sellerEmail}

                                                        />
                                                        <TextField
                                                            className={styles1.inpts}
                                                            // onChange={this.handleForm}

                                                            name='address'
                                                            id="outlined-seller-address"
                                                            label="Address"
                                                            type="text"
                                                            variant="outlined"
                                                            value={this.state.address}

                                                        />

                                                    </div>

                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ marginLeft: '2.1%' }}>
                                                            <InputLabel id="demo-controlled-open-select-label"
                                                                name='sellerPicture'
                                                            // onChange={this.handleForm}

                                                            > Seller Picture</InputLabel>

                                                        </div>
                                                        <div style={{ marginLeft: '44%' }}>
                                                            <InputLabel id="demo-controlled-open-select-label"
                                                                name='storePicture'
                                                            > Store Picture</InputLabel>

                                                        </div>
                                                    </div>

                                                    <div className={styles1.umagescontiner}>

                                                        {/* <div> */}
                                                        <div className={styles1.images}>
                                                            <img id='img-1' src={'https://api.zacarta.com/' + this.state.sellerPicture} className={this.state.hidden1 ? styles1.hidden1 : styles1.imagetag} alt="image" />
                                                            {/* <input
                                                                // onChange={this.handleChanging}
                                                                hidden
                                                                name='sellerPicture'
                                                                accept="image/*"
                                                                // onChange={this.change2}
                                                                className={classes.input}
                                                                id="contained-button-file"
                                                                multiple
                                                                type="file"
                                                            /> */}
                                                            <label htmlFor="contained-button-file">
                                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                                    <span className={this.state.hidden1 ? '' : styles1.hidden1}></span>

                                                                </IconButton>
                                                            </label>
                                                            {/* </div> */}
                                                        </div>
                                                        <div className={ styles1.storeimg}>
                                                            <img id='img-2' src={'https://api.zacarta.com/' + this.state.storePicture} alt="image" className={this.state.hidden2 ? styles1.hidden2 : styles1.imagetag} />
                                                            {/* <input
                                                                // onChange={this.handleChange}
                                                                hidden
                                                                name='storePicture'
                                                                accept="image/*"
                                                                className={classes.input}
                                                                id="contained-button-s"
                                                                multiple
                                                                type="file"
                                                            /> */}
                                                            <label htmlFor="contained-button-s">
                                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                                    <span className={this.state.hidden2 ? '' : styles1.hidden2}> </span>

                                                                </IconButton>
                                                            </label>

                                                        </div>
                                                    </div>
                                                </form>
                                            </Grid>
                                        </div>
                                        <div className={styles1.mapcont}>
                                            <Grid xs={12} item className={styles1.uigrids}>
                                                {/* <Autocomplete
                                                    style={{
                                                        width: '100%',
                                                        height: '40px',
                                                        paddingLeft: '16px',
                                                        marginTop: '10px',
                                                        border: '1px solid #f26836',
                                                        borderRadius: '5px'
                                                        // marginBottom: '500px'
                                                    }}
                                                    onPlaceSelected={this.onPlaceSelected}
                                                    types={['(regions)']}
                                                /> */}
                                                <Map

                                                    google={this.props.google}
                                                    className={styles1.mapdiv}
                                                    center={{
                                                        lat: this.state.position.lat,
                                                        lng: this.state.position.lng
                                                    }}
                                                    // style={{
                                                    //     width: '19.7%',
                                                    //     height: '30.4vh ',
                                                    //     borderRadius: "5px"
                                                    // }}
                                                    zoom={14}
                                                >
                                                    {/* {this.state.markers.map((marker, index) => ( */}
                                                    <Marker

                                                        position={this.state.position}
                                                        draggable={true}
                                                    // onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                                                    />
                                                </Map>
                                            </Grid>
                                        </div>
                                        <Grid xs={6} item></Grid>
                                        <Grid xs={6} item className={styles1.btndiv}>
                                            {/* <Link to='/seller' className={styles1.linkcls}> */}
                                            {/* <Button className={styles1.submitbtn} onClick={this.submitDetails} variant="contained" color="primary" component="span">
                                                <SaveIcon /> Save
                                                           </Button> */}
                                            {/* </Link> */}
                                        </Grid>
                                        {/* </Grid> */}
                                    </div>
                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            </div >
        );
    }
}
EditSellerPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default compose(GoogleApiWrapper({
    // apiKey: 'AIzaSyAd4Ne-6KGiOXB6rnYY_lxEW0o8YUUmvjM'
    apiKey: "https://maps.googleapis.com/maps/api/js?v=weekly&key=AIzaSyDbtagfH98A-FpI31sAYzX0M2J1rei8Qt0&callback=initMap"
}), withStyles(styles)
)(EditSellerPage); 