import * as React from 'react';
import { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import logo from '../../resources/logo.PNG';
import { createTheme } from '@mui/system';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import axios from 'axios';
const theme = createTheme({
    palette: {
        paper: '#f4976c',
        paddingTop:10,  
    },
  });

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function NavBarTrainee() {
    const navigate = useNavigate();
    const handleLogOut = () => {navigate("/")};

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const [filter, setfilter] = React.useState(null);
    const isFilterMenuOpen = Boolean(filter);

    const [filterPriceMin, setFilterPriceMin] = React.useState(null);
    const [filterPriceMax, setFilterPriceMax] = React.useState(null);
    const [subject, setSubject] = React.useState(null);
    const [rating, setRating] = React.useState(null);


   

    const handleFilterPrice = () => {
      if(filterPriceMin&&filterPriceMax){
        console.log(filterPriceMin);
        console.log(filterPriceMax);
      axios.post('course/filterCoursePrice?priceFrom='+filterPriceMin+'&priceTo='+filterPriceMax).then(response => {
        sessionStorage.setItem("filterResult",response.data)
        console.log("el search raa7  "+response.data)
        navigate("/filterResultsPrice");
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
    }
    if(!filterPriceMin&&!filterPriceMax){
      axios.post('course/filterCoursePrice').then(response => {
        sessionStorage.setItem("filterResult",response.data)
        console.log("el search raa7  "+response.data)
        navigate("/filterResultsPrice");
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
    }
    if(filterPriceMin&&!filterPriceMax){
     
      axios.post('course/filterCoursePrice?priceFrom='+filterPriceMin).then(response => {
        sessionStorage.setItem("filterResult",response.data)
        console.log("el search raa7  "+response.data)
        navigate("/filterResultsPrice");
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
    }
    if(!filterPriceMin&&filterPriceMax){
      axios.post('course/filterCoursePrice?priceFrom='+filterPriceMin+'&priceTo='+filterPriceMax).then(response => {
        sessionStorage.setItem("filterResult",response.data)
        console.log("el search raa7  "+response.data)
        navigate("/filterResultsPrice");
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
    }

  }
    const handleFilterSubjectRating = () => {
      if(!subject&&!rating){
        axios.post('/course/filterCourseSubjectRating').then(response => {
          sessionStorage.setItem("filterResultsub",response.data)
          navigate("/filterResultssubrate");
        })
        .catch(error => {
          console.log(error.response.data);
        });
      }
      if(subject&&rating){
        axios.post('/course/filterCourseSubjectRating?courseSubject='+subject+'&rating='+rating).then(response => {
          sessionStorage.setItem("filterResultsub",response.data)
          navigate("/filterResultssubrate");
        })
        .catch(error => {
          console.log(error.response.data);
        });
      }
      if(!subject&&rating){
        axios.post('/course/filterCourseSubjectRating?rating='+rating).then(response => {
          sessionStorage.setItem("filterResultsub",response.data)
          navigate("/filterResultssubrate");
        })
        .catch(error => {
          console.log(error.response.data);
        });
      }
      if(subject&&!rating){
        axios.post('/course/filterCourseSubjectRating?courseSubject='+subject).then(response => {
          sessionStorage.setItem("filterResultsub",response.data)
          navigate("/filterResultssubrate");
        })
        .catch(error => {
          console.log(error.response.data);
        });
      }
    };
  

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      //setAnchorEl(null);
     navigate('/ItraineeProfile');
    };

    const handleFiltering = (event) => {
      setfilter(event.currentTarget);
    };
    const isFilterMenuClose = () => {
      setfilter(null);
    };


    const [search, setSearch] = useState('');

    const handleSearching = async (event) => {
      if(search){
        axios.post('/course/searchForCourse?instructorName='+search).then(response => {
          //console.log(response.data.length)
          if(response.data.length==0){
            axios.post('/course/searchForCourse?courseTitle='+search).then(response => {
          //    console.log(response.data.length)
              if(response.data.length==0){
              axios.post('/course/searchForCourse?courseSubject='+search).then(response => {
                if(response.data.length==0){axios.post('/course/searchForCourse')}
                else{
           
                  sessionStorage.setItem("searchrResult",response.data)
                  navigate("/searchResults");  
                 console.log(response.data.length)
                }
              })
              .catch(error => {
                console.log(error.response.data);
              });
            }
              sessionStorage.setItem("searchrResult2",response.data)
              navigate("/search2");
            })
            .catch(error => {
              console.log(error.response.data);
            });
          }
          else{
          sessionStorage.setItem("searchrResult3",response.data)
          navigate("/search3");
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });
      }
    };

   


  const menuId = 'primary-search-account-menu';
  const filterId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Edit My account</MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );
  const renderFilterr = (
    <Menu
      filter={filter}
      anchorOrigin={{
        vertical: 45,
       horizontal:680,
      }}
      id={filterId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
  
      open={isFilterMenuOpen}
      onClose={isFilterMenuClose}
    >
       <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filter By Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Stack direction="row">
        <TextField
        onChange={(change)=>{setFilterPriceMin(change.target.value)}}
          id="outlined-number"
          label="Minimum Price"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box sx={{ flexGrow: 0.07}} />
          <TextField onChange={(change)=>{setFilterPriceMax(change.target.value)}}id="outlined-number" label="Maximum Price" type="number" InputLabelProps={{shrink: true,}}/>
         <Box sx={{ flexGrow: 1}} />
         <Button onClick={handleFilterPrice} sx={{ bgcolor:theme.palette.paper }} variant="contained"  >Filter</Button>
          </Stack>
        </AccordionDetails>
      </Accordion>



      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filter By subject and/or rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Stack direction="row">
        <TextField onChange={(change)=>{setSubject(change.target.value)}} label="Subject"id="outlined-start-adornment"InputLabelProps={{shrink: true,}}/>
        <Box sx={{ flexGrow: 0.07}} />
          <TextField onChange={(change)=>{setRating(change.target.value)}} id="outlined-number" label="Rating" type="number" InputLabelProps={{shrink: true,}}/>
         <Box sx={{ flexGrow: 1}} />
         <Button onClick={handleFilterSubjectRating} sx={{ bgcolor:theme.palette.paper }} variant="contained"  >Filter</Button>
          </Stack>
        </AccordionDetails>
      </Accordion>


    </div>
    </Menu>
  );

  
  return (
   
   
    <Box>
      <AppBar>
        <Toolbar>
      

        <Typography variant="h6" noWrap component="div"sx={{ display: { xs: 'none', sm: 'block' } }}>
            <a href="https://i.imgur.com/fe0T4nw.png"><img src={logo} onClick="https://google.com" alt="JALP Logo"/></a>
            </Typography>

          

          <Stack spacing={8} direction="row">

          <Stack direction="row">

          <Search>
            <IconButton onClick={handleSearching} size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2,paddingTop:1, marginLeft:2  }} ><SearchIcon /></IconButton>
            <StyledInputBase onChange={(change)=>{setSearch(change.target.value)}} sx={{ width:500 }} placeholder="Search…" inputProps={{ 'aria-label': 'search' }}/>
          </Search>
            < IconButton onClick={handleFiltering} size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2,paddingTop:1  }}>
          <FilterListIcon /> 
          </IconButton>
         
          </Stack>
         <Button  sx={{ bgcolor:theme.palette.paper }} variant="contained"  >View My Courses</Button>
         
		 

    </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleProfileMenuOpen} size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <MenuIcon /> 
            </IconButton>
            <Box sx={{ flexGrow: 0.05 }} />
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderFilterr}
      <Stack direction="row" alignItems="center" spacing={2}>

      
    </Stack>
    </Box>
  );
}