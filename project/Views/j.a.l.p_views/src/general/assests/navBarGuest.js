import * as React from 'react';
import { useState,useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Dialog,AppBar,Box,Toolbar,IconButton,Typography,InputBase,MenuItem,Menu,Stack,Button,Accordion,AccordionSummary,AccordionDetails,TextField} from '@mui/material';
import { useNavigate } from "react-router-dom";
import logo from '../../resources/logo.PNG';
import { createTheme } from '@mui/system';
import "../../styling/navBar.css"
import Login from '../login';
import SignUp from '../signup';
const theme = createTheme({
    palette: {
        paper: '#f4976c',
        paddingTop:10, 
        marginLeft:20, 
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

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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


export default function NavBarInstructor() {
    const navigate = useNavigate();
    const handleLogOut = () => {navigate("/")};
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [filter, setfilter] = useState(null);
    const isFilterMenuOpen = Boolean(filter);
    const [loginPrompt,setLoginPrompt] = useState(false);
    const [signUpPrompt,setSignUpPrompt] = useState(false);
   
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleFiltering = (event) => {
      setfilter(event.currentTarget);
    };
    const isFilterMenuClose = () => {
      setfilter(null);
    };

     
  const menuId = 'primary-search-account-menu';
  const filterId = 'primary-search-account-menu';
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>Edit My account</MenuItem>
  //     <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
  //   </Menu>
  // );
  const renderFilterr = (
    <Menu
      filter={filter}
      anchorOrigin={{
        vertical: 90,
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
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Filter By subject</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Stack direction="row">
        <TextField id="outlined-basic" label="Subject" variant="outlined" />
        <Box sx={{ flexGrow: 0.07}} />
        <Button  sx={{ bgcolor:theme.palette.paper }} variant="contained"  >Filter</Button>
        </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
    </Menu>
  );  
  return (
    <Box>
      <Dialog open={loginPrompt} onClose={()=>{setLoginPrompt(false);}}>
        <Login></Login>
      </Dialog>
      <Dialog open={signUpPrompt} onClose={()=>{setSignUpPrompt(false);}}>
        <SignUp></SignUp>
      </Dialog>
      <AppBar>
        <Toolbar>
        <Typography variant="h6" noWrap component="div"sx={{ display: { xs: 'none', sm: 'block' } }}>
            <a href="/login"><img src={logo}  alt="JALP Logo"/></a>
        </Typography>          
          <Stack spacing={14} direction="row">
          <Stack direction="row">
          <Search ><SearchIconWrapper ><SearchIcon  /></SearchIconWrapper>
            <StyledInputBase sx={{ width:500 }} placeholder="Search…" inputProps={{ 'aria-label': 'search' }}/>
          </Search>
          < IconButton onClick={handleFiltering} size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2,paddingTop:1  }}>
              <FilterListIcon  /> 
          </IconButton>
          </Stack>
          <Box sx={{ flexGrow: 0.1 }} />
         <Button  sx={{ bgcolor:theme.palette.paper }} variant="contained" onClick={()=>{/*setSignUpPrompt(true)*/navigate("/signup")}}> Join Us Now. </Button>
         <Button  sx={{ bgcolor:"#ffffff",color:"#303c6c" }} variant="contained" onClick={()=>{/*setLoginPrompt(true);*/navigate("/login")}}>Already one of us ?</Button>      
    </Stack>
        </Toolbar>
      </AppBar>
      {renderFilterr}
    </Box>
  );
}

