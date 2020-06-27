import React, { useState, useEffect } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Form from 'react-bootstrap/Form';
import API from "../../utilities/API";
import Nav from '../../components/Nav';
import InputGroup from 'react-bootstrap/InputGroup'
import "../../App.css";
import './style.css';
function Upload() {
const Categories = [
 {key:1, value: "Furniture"},
 {key:2, value: "Electronics"},
 {key:3, value: "Apparral"},
 {key:4, value: "Toys/Games"},
 {key:5, value: "Books"}
]
 // Initialize books as an empty array
   const [listings, setListings] = useState([]);
   const [formObject, setFormObject] = useState({
       listing_title: "",
       listing_description:"",
       listing_condition: "",
       listing_location: "",
       listing_category:""

   });
   const onCategoriesSelectChange = (event) => {
     setCatergoriesValue(event.currentTarget.value)
   }
   const [CategoriesValue, setCatergoriesValue] = useState(1);
  
    useEffect(() => {
     loadListings();
   }, []);
 
   function loadListings() {
     API.getListings()
     .then(response => setListings(response.data))
     .catch(error => console.log(error));
   };
 
   function deleteListing(id){
     API.deleteListing(id)
       .then(res => loadListings())
       .catch(error => console.log(error));
   };
   function handleInputChange(event){
     const {name, value} = event.target;
     setFormObject({...formObject, [name]: value })
   };
   function handleFormSubmit(event){
     event.preventDefault();
     if(formObject.listing_title && formObject.listing_location){
       API.saveListing({
         listing_title: formObject.listing_title,
         listing_description:formObject.listing_description,
         listing_condition: formObject.listing_condition,
         listing_location: formObject.listing_location,
         listing_category: formObject.listing_category
       })
       .then(() => setFormObject({
           listing_title: "",
           listing_description:"",
           listing_condition: "",
           listing_location: "",
           listing_category: ""
       }))
       .then(() => loadListings())
       .catch(error =>console.log(error));
     }
   }
   return (
     <div className="App">
     <head>
     </head>
     <Nav />
     <Container fluid>
       <Row>
       <Col size="md-6 sm-12">
          
           {listings.length ? (
             <List>
               {listings.map(listing => {
                 return (
                 <ListItem key={listing._id}>
                   <a href={"/listings/" + listing._id}>
                     <strong>
                       {listing.listing_title} in {listing.listing_location}
                     </strong>
                   </a>
                   <DeleteBtn onClick={() => deleteListing(listing._id)}/>
                 </ListItem>
               )})}
             </List>
           ) : (
             <h3>No Results to Display</h3>
           )}
         </Col>
         <Col size="md-6 input">
           <form>
             <Input onChange={handleInputChange} name="listing_title" placeholder="listing title" value={formObject.listing_title}/>
             <Input onChange={handleInputChange} name="listing_description" placeholder="listing description" value={formObject.listing_description}/>
             <Input onChange={handleInputChange} name="listing_condition" placeholder="condition (used, new, etc.)" value={formObject.listing_condition}/>
             <Input onChange={handleInputChange} name="listing_location" placeholder="city, state" value={formObject.listing_location}/>
             <Form.Group controlId="exampleForm.ControlSelect1">
               <InputGroup.Prepend>
                 <InputGroup.Text>item type:</InputGroup.Text>
                   <Form.Control as="select" onChange={onCategoriesSelectChange}>
                     {Categories.map(item => (
                     <option key={item.key} value={formObject.CategoriesValue}>{item.value}</option>
                     ))}
                   </Form.Control>
                 </InputGroup.Prepend>
             </Form.Group>
             <FormBtn onClick={handleFormSubmit}> Submit Listing</FormBtn>
           </form>
         </Col>
 
       </Row>
     </Container>
     </div>
   );
 }
 
export default Upload;