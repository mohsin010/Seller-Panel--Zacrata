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
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import tileData from './tileData';

import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Button from '@material-ui/core/Button';
import { blue, green, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import axios from 'axios';

import styles1 from './myStyle.module.css';
import Cookies from 'js-cookie';
import { disable } from 'promise/lib/rejection-tracking';
import image from './Abbott.jpg'


const styles = theme => ({
    root: {
        background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
        color: theme.palette.primary.contrastText
    },

    highlight: {
        backgroundColor: 'red',
    },
    root1: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        width: '100%',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
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
class ProductsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStore: '',
            setRowsPerPage: 10,
            setPage: 0,
            page: 0,
            rowsPerPage: 10,
            // checkedA: true,
            sr: true,
            suggestions: [],
            text: '',
            open: false,
            setOpen: false,
            setAddProductOpen: false,
            setFilterOpen: false,
            categories: [],
            units: [],
            pictures: [],
            displayPictures: [],
            quantities: 1,
            hidden1: true,
            hidden2: true,
            respOpen: false,
            errOpen: false,
            edit: false,
            product_id: '',

            products: [],
            catProducts: [],
            name: '',
            picture: '',
            desc: '',
            price: '',
            category: 'Test Category',
            unit: '',

            coun: 0


        }
    }
    componentWillMount() {
        let token = Cookies.get('a#$s!');
        if (!token) {
            this.props.history.push('./login');
        }
        let count = window.sessionStorage.getItem('coun')
        // console.log(count)
        this.setState({
            coun: count
        })
        let headers = {
            'Authorization': `bearer ${token}`
        }
        axios.get('https://api.zacarta.com/api/seller/product/grouped', {
            headers: headers
        }).then(res => {
            debugger
            if (res.data.success == true) {
                this.setState({
                    products: res.data.data.sellerProducts,
                    catProducts: res.data.data.sellerProducts[0].products
                })

                // console.log(res.data.data.sellerProducts)
            }
        }).catch(e => {
            console.log(e)
        })
    }

    onTextChange = (e) => {
        let value = e.target.textContent;
        debugger;
        let suggestions = [];
        const regex = new RegExp(`^${value}`, 'i');
        if (value.length > 0) {
            console.log(this.state.catProducts)
            for (const item of this.state.catProducts) {
                console.log(item);

                if (item.product.title.includes(value)) {
                    suggestions.push(item)
                }
            }
        }
        this.setState(() => ({
            suggestions,
            text: value
        }))
    }
    handleSwitchChange = (index, product, event) => {
        // this.setState({ [event.target.name]: event.target.checked });
        let products = [...this.state.catProducts]

        products[index].active = event.target.checked

        let product1 = product._id
        let token = Cookies.get('a#$s!');
        if (!token) {
            this.props.history.push('./login');
        }
        let headers = {
            'Authorization': `bearer ${token}`
        }
        axios.put('https://api.zacarta.com/api/seller/product/toggle', { product: product1 }, {
            headers: headers
        }).then(res => {
            debugger
            if (res.data.success == true) {
                this.setState({
                    catProducts: products,
                })
            }
        }).catch(e => {
            debugger

            console.log(e)
        })
    };
    handleChangePage = (page) => {
        // setPage(newPage);
        console.log(page)
        this.setState({
            setPage: +0.01
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

    handleAddProductClose = () => {
        this.setState({
            setAddProductOpen: false,
            edit: false
        })
    };



    setProductDetails = (product, e) => {
        debugger;
        
        this.setState({
            product_id: product._id,
            name: product.product.title,
            picture: product.product.image,
            desc: product.product.description,
            price: product.price,
            setAddProductOpen: true
        })
        // console.log(product)
    }
    setdisable = ()=>{
        document.getElementById("pricefiled").setAttribute("disabled", "disabled")

    }
    editproduct = (e) => {
        debugger;
        this.setState({
            price: e.target.value,
            // edit: true
        })
    }
    handleEdit = () => {
        document.getElementById("pricefiled").removeAttribute("disabled")

        this.setState({ edit: true })
    }
    saveProduct = () => {
        let index = this.state.catProducts.indexOf(this.state.product_id)
        console.log(index, this.state.catProducts, this.state.product_id)
        let products = [...this.state.catProducts]
        products[index + 1].price = JSON.parse(this.state.price)

        // console.log(products)

        debugger
        let product = {
            price: this.state.price,
            product: this.state.product_id
        }
        let token = Cookies.get('a#$s!');

        let headers = {
            'Authorization': `bearer ${token}`
        }
        debugger
        axios.put('https://api.zacarta.com/api/seller/product/price', product, {
            headers: headers
        }).then(res => {
            debugger
            if (res.data.success == true) {
                this.setState({
                    setAddProductOpen: false,
                    respOpen: true,
                    respTitle: "Product is Updated",
                    respBody: "Product is Updated Successfully",
                    // catProducts: res.data.data.products,
                    edit: false
                    // products: res.data.data.sellerProducts,
                    // catProducts: res.data.data.sellerProducts[0].products
                })
                // console.log(this.state.catProducts, res.data.data)
            }
        }).catch(e => {
            debugger

            console.log(e)
        })
        // axios.get('https://api.zacarta.com/api/seller/product/grouped', {
        //     headers: headers
        // }).then(res => {
        //     debugger
        //     if (res.data.success == true) {
        //         this.setState({
        //             products: res.data.data.sellerProducts,
        //             catProducts: res.data.data.sellerProducts[0].products
        //         })
        //         // console.log(res.data.data.sellerProducts)
        //     }
        // }).catch(e => {
        //     console.log(e)
        // })

    }
    handleRespClose = () => {
        this.setState({
            respOpen: false
        })
    }
    showProducts = (product, e) => {
        console.log(product)
        this.setState({
            suggestions: [],
            catProducts: product.products
        })
    }
    classes = this.props

    render() {
        const { text, suggestions } = this.state;
        const { classes } = this.props


        return (
            <div className={classes.root}>

                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center  w-full" style={{ marginTop: "1vh" }}>
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col items-center" >
                                    <Dialog
                                        open={this.state.respOpen}
                                        onClose={this.handleRespClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{this.state.respTitle}</DialogTitle>
                                        <DialogContent>
                                            {this.state.respBody}
                                        </DialogContent>
                                        <DialogActions>
                                            <Button variant="contained" color="primary" onClick={this.handleRespClose}>
                                                Close
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <Dialog
                                        className={styles1.productdialog}
                                        open={this.state.setAddProductOpen}
                                        // onClose={this.handleerrClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Product Details"}</DialogTitle>
                                        <DialogContent>
                                            <Card className={styles1.abc}>
                                                <CardActionArea>
                                                    <CardContent >
                                                        <Typography gutterBottom variant="h5" component="h2" className={styles1.modaldes}>
                                                            {this.state.name}
                                                        </Typography>
                                                        <CardContent className={styles1.flextest}>
                                                            <CardMedia
                                                                className={this.classes.media, styles1.modalmedia}
                                                                image={'https://api.zacarta.com/' + this.state.picture}
                                                                title="Contemplative Reptile"
                                                            >
                                                                {/* <img src={picture} /> */}

                                                            </CardMedia>
                                                            <Typography variant="body2" color="textSecondary" component="p" className={styles1.modaldes}>
                                                                {this.state.desc}
                                                            </Typography>
                                                        </CardContent>
                                                        <Typography variant="body2" color="textSecondary" component="p" className={styles1.modaldes}>
                                                            {/* <b> {'Price: ' + this.state.price} </b> */}
                                                            <TextField disabled="disabled" onChange={this.editproduct} id='pricefiled' label="Price" value={this.state.price} margin="normal" variant="outlined" >

                                                            </TextField>

                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                            <DialogActions>
                                                <Button className={this.state.edit ? styles1.hidden : ''} onClick={this.handleEdit} variant="contained" color="primary">
                                                    Edit
                                              </Button>
                                                <Button className={this.state.edit ? '' : styles1.hidden} onClick={this.saveProduct} variant="contained" color="primary">
                                                    Save
                                              </Button>
                                                <Button onClick={this.handleAddProductClose} variant="contained" color="primary">
                                                    Close
                                              </Button>
                                            </DialogActions>
                                        </DialogContent>
                                    </Dialog>
                                    {/* add product dialog */}
                                    <div className={styles1.addsellerbtn}>
                                        <div className={styles1.heading}>
                                            <h1 >Products</h1>
                                        </div>
                                    </div>
                                    <div className={classes.root1}>
                                        <GridList className={classes.gridList} cols={6}>
                                            {this.state.products.map((tile) => (
                                                <GridListTile key={'https://api.zacarta.com/' + tile.category.icon} onClick={this.showProducts.bind(this, tile)} >
                                                    <img src={'https://api.zacarta.com/' + tile.category.icon} alt={tile.category.title} />
                                                    <GridListTileBar
                                                        title={tile.category.title}
                                                        classes={{
                                                            root: classes.titleBar,
                                                            title: classes.title,
                                                        }}
                                                        actionIcon={
                                                            <IconButton aria-label={`star ${tile.title}`}>
                                                                {/* <StarBorderIcon className={classes.title} /> */}
                                                            </IconButton>
                                                        }
                                                    />
                                                </GridListTile>
                                            ))}
                                        </GridList>
                                    </div>
                                    {/* Actual body */}

                                    <div className={styles1.search}>
                                        <Autocomplete
                                            id="search"
                                            freeSolo
                                            onChange={this.onTextChange}
                                            options={this.state.catProducts.map((option) => option.product.title)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Search" margin="normal" variant="outlined" />
                                            )}
                                        />
                                    </div>
                                    <div className={styles1.addsellerbtn}>
                                        <div className={styles1.heading}>
                                            <h1 >Products</h1>
                                        </div>
                                    </div>


                                    <TableContainer className={classes.container}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell >
                                                        Sr.#
                                                    </TableCell>
                                                    <TableCell >
                                                        Product
                                                    </TableCell>
                                                    <TableCell >
                                                        Weight
                                                    </TableCell>
                                                    <TableCell className={styles1.prostorename}>
                                                        Unit
                                                    </TableCell>
                                                    {/* <TableCell className={styles1.prostorename}>
                                                        Unit Type
                                                    </TableCell> */}
                                                    <TableCell> Price</TableCell>
                                                    <TableCell >
                                                        Enable
                                                    </TableCell>
                                                    {/* <TableCell >
                                                            Edit
                                                        </TableCell> */}
                                                    <TableCell >
                                                        View
                                                    </TableCell>
                                                    {/* {this.columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ minWidth: column.minWidth }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))} */}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.suggestions.length == 0 ? this.state.catProducts.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>

                                                            <TableCell>{index + 1}</TableCell>
                                                            {/* <TableCell>{product.name}</TableCell> */}

                                                            <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.product.image} /><div className={styles1.propicdiv}><div><div >{product.product.title}</div></div></div></TableCell>
                                                            <TableCell>{product.product.weight}</TableCell>

                                                            {/* <TableCell></TableCell> */}
                                                            <TableCell>{product.product.unit.title}</TableCell>
                                                            {/* <TableCell>{product.price}</TableCell> */}
                                                            <TableCell className={this.state.coun == 2 ? styles1.hidden : ''}>{"₹" + product.price.toFixed(2)}</TableCell>
                                                            <TableCell className={this.state.coun == 1 ? styles1.hidden : ''}>{"$" + product.price.toFixed(2)}</TableCell>


                                                            <TableCell>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={product.active}
                                                                            onChange={this.handleSwitchChange.bind(this, index, product)}
                                                                            name={product.product.title}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                />

                                                            </TableCell>

                                                            <TableCell>
                                                                {/* <Link to='seller-details' className={styles1.linkcls}> */}
                                                                <Button variant="contained" size="small" color="primary" onClick={this.setProductDetails.bind(this, product)}>
                                                                    <PageviewIcon /> View
                                                            </Button>
                                                                {/* </Link> */}
                                                            </TableCell>

                                                        </TableRow>
                                                    )
                                                }) : this.state.suggestions.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>
                                                            <TableCell>{index + 1}</TableCell>
                                                            {/* <TableCell>{product.name}</TableCell> */}

                                                            <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.product.image} /><div className={styles1.propicdiv}><div><div >{product.product.title}</div></div></div></TableCell>
                                                            <TableCell>{product.product.weight}</TableCell>

                                                            {/* <TableCell></TableCell> */}
                                                            <TableCell>{product.product.unit.title}</TableCell>
                                                            {/* <TableCell>{product.price}</TableCell> */}
                                                            <TableCell className={this.state.coun == 2 ? styles1.hidden : ''}>{"₹" + product.price.toFixed(2)}</TableCell>
                                                            <TableCell className={this.state.coun == 1 ? styles1.hidden : ''}>{"$" + product.price.toFixed(2)}</TableCell>


                                                            <TableCell>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={product.active}
                                                                            onChange={this.handleSwitchChange.bind(this, index, product)}
                                                                            name={product.product.title}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                />

                                                            </TableCell>

                                                            <TableCell>
                                                                {/* <Link to='seller-details' className={styles1.linkcls}> */}
                                                                <Button variant="contained" size="small" color="primary" onClick={this.setProductDetails.bind(this, product)}>
                                                                    <PageviewIcon /> View
                                                            </Button>
                                                                {/* </Link> */}
                                                            </TableCell>

                                                        </TableRow>
                                                    )
                                                })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={this.state.products.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={(e) => { this.handleChangePage(this.state.page) }}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            </div >
        );
    }
}
ProductsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductsPage);