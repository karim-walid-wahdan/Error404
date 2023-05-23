import { Fragment, useEffect, useState } from "react";
import "../styling/loginPage.css";
import "../styling/makeDiscounts.css";
import { Button, TextField,MenuItem,InputAdornment,IconButton, Divider, List, ListItem} from "@mui/material";
import axios from "axios";
import NavBarAdmin from "../general/assests/navBarAdmin"
import Footer from "../general/assests/footer";


function MakeDiscounts() {

    const [courses , setCourses] = useState(null);
    const [isItFree , setIsItFree] = useState(null);
    const [dataChanged , setDataChanged] = useState(false);
    let theDigits = [];
    useEffect(() => {
        axios.get("/course/getCourseWithAllItsData")
        .then((res)=>
        { 
          setCourses(res.data);
          console.log(res.data);
        });

      } , [dataChanged]);


      const handleDiscount = (courseToEdit , number) =>{

        //axios.put("/course/changeDiscountOfACourse/"+courseToEdit, {discountValue:isItFree})
console.log(courseToEdit);
console.log('test');
console.log(number);
console.log('test');

       // setDataChanged(!dataChanged);

      }


    return (
        <Fragment>
            <NavBarAdmin className="navBar"></NavBarAdmin>
            <Button>Test</Button>
            <div className="content">

            <div className="itemTitle" >
                    <h1>Which Courses do you want to discount?</h1>
                    <Fragment>

                      <Divider />
                        <List>
                      { courses && courses.map((items) => {
                            return(
                                <div className="coursesForDiscount">
                                <ListItem  key={items._id}> <div className="box"><p>Course Title:</p> {items.courseTitle}</div>
                                    <div className="box">
                                    <p>Price:</p> {items.price} <p/>and has a discount of: {items.discount.percentage*100}%
                                      </div>
                                    <div className="box">
                                    <TextField id="outlined-basic" label="Discount Percentage Here" variant="outlined"sx={{ m: 1, width: '25ch' }} onClick={(change) => {theDigits.push(change.target.value)}}></TextField>
                                    <TextField id="outlined-basic" label="expiry date" variant="outlined"sx={{ m: 1, width: '12ch' }}></TextField>
                                    <Button sx={{bgcolor:'#696969' ,color:'#420420', height:'5ch' , margin: '20px'}} onClick={() =>{handleDiscount(items._id , theDigits[0])}}>Apply Discount</Button>
                                    </div>
                                </ListItem>
                                </div>
                          );
                        })}
                        </List>
                    </Fragment>
                    </div> 
            <Footer/>
            </div>
        </Fragment>
    );
    } 
  export default MakeDiscounts;