
import { Link } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct,updateProduct } from '../actions/productActions';
import {LoadingBox, MessageBox} from '../components';
import { PRODUCT_UPDATE_RESET } from '../constant/productConstants';
import Axios from 'axios';


export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const [categories, setCategories] = useState(['New']);
    const productDetails = useSelector((state) => state.productDetail);
    const { loading, error, product } = productDetails;
    const productUpdate = useSelector((state) => state.productUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = productUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
  
     if (successUpdate) {
        props.history.push('/productlist');
      }
      if (!product || product._id !== productId || successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        dispatch(detailsProduct(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategories(product.category);
        setCountInStock(product.countInStock);
        setBrand(product.brand);
        setDescription(product.description);
      }
    }, [product, dispatch, productId, successUpdate, props.history]);
    const submitHandler = (e) => {
      e.preventDefault();
      // TODO: dispatch update product
      dispatch(
          updateProduct({
            _id: productId,
            name,
            price,
            img: image,
            category: categories,
            brand,
            countInStock,
            description,
          })
        );
    };


    
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
          const { data } = await Axios.post('/api/uploads', bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
          setImage(data);
          setLoadingUpload(false);
        } catch (error) {
          setErrorUpload(error.message);
          setLoadingUpload(false);
        }
      };


    return loading ? <LoadingBox/> : error? <MessageBox>{error}</MessageBox> :(
        <div style={styles.container}>
            <FixedTop/>
            <div style={{height: '100%',paddingTop:120, display:'flex', justifyContent:'center'}}>
                <div className='dashed_url signin_border'>
                    <FormShipping name={name} price={price}
                    brand={brand} image={image} countInStock={countInStock}
                    categories={categories} setCategories={setCategories}
                    setName={setName}
                    setPrice={setPrice}
                    setImage={setImage}
                    setCountInStock={setCountInStock}
                    setBrand={setBrand}
                    setDescription={setDescription}
                    description={description}
                    submitHandler={submitHandler}
                    uploadFileHandler={uploadFileHandler}/>
                </div>
            </div>
        </div>
    )
}


function FixedTop(){
    return(
        <div style={{backgroundColor:'white',position: 'fixed', width:'100%', height: '15%', zIndex: 3}}>
             <div  style={styles.topStyle}>
                <h1 style={{backgroundColor:'white', height:40, whiteSpace:'pre',
                            fontFamily:'Inter-Semi',
                            fontSize:30, }}>  Edit Product  </h1>
                    
                <h1 style={{
                    fontFamily:'Inter',
                    fontSize: '110%',
                }}>Wow, we hope this product will be selled!</h1>
            </div>
        </div>
    )
}

function FormShipping({ name, price, image, brand, countInStock, description,categories, setCategories, submitHandler,
    setName,
    setPrice,
    setImage,
    setCountInStock,
    setBrand,
    setDescription,
    uploadFileHandler

}){
    return(
        <Form style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection: 'column',height:'100%', paddingTop: 20, paddingBottom:20}}>
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Product Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name} 
                onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Price</Form.Label>
                <Form.Control type="text" placeholder="Enter Price" value={price}
                onChange={(e) => setPrice(e.target.value)}/>
            </Form.Group> 
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Image</Form.Label>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Example file input"
                        onChange={uploadFileHandler} />
                </Form.Group>
                {/* <Form.Control type="text" placeholder="Enter Image" value={image}
                onChange={(e) => setImage(e.target.value)}/> */}
            </Form.Group>
            <Form.Group style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                <Form.Label style={{textAlign:'center', fontSize:'1.2rem', fontFamily:'Inter'}}>Categories</Form.Label>
                <Form.Control type="text" placeholder="Enter Categories"
                style={{width:230}}
                onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                            if(e.target.value != null){
                                const add = [...categories, e.target.value]
                                e.target.value = ''
                                setCategories(add)
                            }
                        }
                }}
                />
                <div style={{marginTop:10}}>
                    {categories.map((item,index)=>
                            <span style={{backgroundColor:'#0a043c', width:'fit-content',paddingLeft: 10, paddingRight: 5, paddingTop: 3, paddingBottom: 4,marginRight: 5 ,textAlign:'center',borderRadius: 10,color:'white', fontFamily:'Inter'}}>
                                {item}
                                <span style={{whiteSpace:'pre', fontFamily:'Inter-Semi', cursor:'pointer'}}
                                    onClick={()=>{
                                        const remove = categories.filter(i => i !== item)
                                        setCategories(remove)
                                    }}
                                >  x </span>
                            </span>
                        )}
                </div>
            </Form.Group>
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Brand</Form.Label>
                <Form.Control type="text" placeholder="Enter Brand" value={brand} 
                onChange={(e) => setBrand(e.target.value)}/>
            </Form.Group>
            
            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Count in Stock</Form.Label>
                <Form.Control type="text" placeholder="Enter Count In Stock" value={countInStock}
                
                onChange={(e) => setCountInStock(e.target.value)}/>
            </Form.Group>

            <Form.Group >
                <Form.Label style={{textAlign:'center', width:'100%', fontSize:'1.2rem', fontFamily:'Inter'}}>Description</Form.Label>
                <Form.Control as="textarea" placeholder="Enter Description" value={description} style={{height:100, width: '100%'}}
                
                onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            
            <Button variant="primary" onClick={submitHandler}>
                Update
            </Button>
        </Form>
    )
}

const styles={
    container: {
        height:'fit-content',
        padding:0,
        margin:0,
    },
    topStyle:{
        display:'flex',
        flexDirection:'column',
        height:20,
        width:'100%',
        alignItems:'center',
        borderBottom: '1px solid #D1CDCD',
    },
    dashesLine:{
        height: '100%',
        padding:10,
        width:213,
    },
    dashesPrice:{
        height: '100%',
        marginBottom: 10,
        padding:10,
        width:213,
    },
    item_title:{
        height:40,
        fontFamily:'Roboto-Med',
        fontSize: 16,
    },
    item_price:{
        fontFamily:'Roboto-Med',
        fontSize: 25,
        textAlign:'end',
        marginTop: 15,
    },
    item:{
        height:'100%',
        marginRight:15,
        marginBottom:20
    }
}

