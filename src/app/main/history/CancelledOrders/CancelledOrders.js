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
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Modal from '@material-ui/core/Modal';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PageviewIcon from '@material-ui/icons/Pageview';


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

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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



const styles = theme => ({
    root: {
        background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
        color: theme.palette.primary.contrastText
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



// const classes = useStyles();
// function HomePage() {
class CancelledOrdersPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStore: '',
            quantity: '',
            cart: [],
            quantities: 1,
            setRowsPerPage: 10,
            setPage: 0,
            page: 0,
            rowsPerPage: 10,

            orders: [],
            coun:0
        } 
    }
    componentWillMount() {
        let token = Cookies.get('a#$s!');
        let seller_id = Cookies.get('_id');
        if (!token) {
            this.props.history.push('./login');
        }
        let count = window.sessionStorage.getItem('coun')
        this.setState({
            coun: count
        })
        let headers = {
            'Authorization': `bearer ${token}`
        }
        axios.get('https://api.zacarta.com/api/seller/order/getOrders?type=4', {
            headers: headers
        }).then(res => {
            if (res.data.success == true) {
                this.setState({
                    orders: res.data.data
                })
            }
        }).catch(e => {

        })
    }
    handleSwitchChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };
    handleChangePage = (e, page) => {
        // setPage(newPage);
        console.log(page)
        this.setState({
            page: page
        })
    };

    handleChangeRowsPerPage = (event) => {
        console.log(event.target.value)
        this.setState({
            setPage: 0,
            setRowsPerPage: +event.target.value,
            rowsPerPage: +event.target.value
        })
        // setRowsPerPage(+event.target.value);
        // setPage(0);
    };

    viewOrder = (order, e) => {
        if (order) {
            Cookies.remove('flag')
            Cookies.set('order_id', order) 
            this.props.history.push('/view-order')
        }

    }

    render() {
        const { text, suggestions } = this.state;
        const { classes } = this.props


        return (
            <div className={classes.root}>

                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center justify-center w-full" >
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col items-center" style={{ height: "100%" }}>


                                    <div className={styles1.heading}>
                                        <h1 >Cancelled Orders</h1>
                                    </div>
                                    <TableContainer className={classes.container}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell >
                                                        OrderId
                                                    </TableCell>
                                                    <TableCell className={styles1.proname}>
                                                        Customer
                                                    </TableCell>

                                                    <TableCell >
                                                        Price
                                                    </TableCell>
                                                    <TableCell >
                                                        Quantity
                                                    </TableCell>
                                                    <TableCell >
                                                        Phone No
                                                    </TableCell>
                                                    <TableCell >
                                                        Date
                                                    </TableCell>
                                                    {/* <TableCell >
                                                        Action
                                                    </TableCell> */}
                                                    <TableCell >
                                                        View
                                                    </TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.orders.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((order, index) => {
                                                    return (
                                                        <TableRow hover>
                                                            <TableCell>{order.order_id}</TableCell>
                                                            <TableCell className={styles1.propic} ><div className={styles1.propicdiv}><div><div >{order.buyer.name}</div></div></div></TableCell>
                                                            {/* <TableCell>{order.order_total.toFixed(2)}</TableCell> */}
                                                            <TableCell className={this.state.coun == 2 ? styles1.hidden : ''}>{"₹" + order.order_total.toFixed(2)}</TableCell>
                                                                <TableCell className={this.state.coun == 1 ? styles1.hidden : ''}>{"$" + order.order_total.toFixed(2)}</TableCell>

                                                            <TableCell>
                                                                {order.totalProducts}
                                                            </TableCell>
                                                            <TableCell>
                                                                {order.buyer.mobile}
                                                            </TableCell>
                                                            <TableCell>
                                                                {(new Date(order.createdAt)).toLocaleDateString()}
                                                            </TableCell>
                                                            {/* <TableCell>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={this.state.checkedB}
                                                                                onChange={this.handleSwitchChange}
                                                                                // name={product.sr}
                                                                                color="primary"
                                                                            />
                                                                        }
                                                                    />

                                                                </TableCell> */}
                                                            <TableCell  >
                                                                <Button variant="contained" size="small" color="primary" onClick={this.viewOrder.bind(this, order.order_id)}>
                                                                    <PageviewIcon />  View Order
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={this.state.orders.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />

                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            </div>
        );
    }
}
CancelledOrdersPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CancelledOrdersPage);