import * as React from 'react';
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

const theme = createTheme({
    palette: {
        paper: '#FF0000',
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleAddCorpMenuClose = () => {
      setAnchorEl(null);
      navigate("/addCorporateTrainee");
    };

    const handleAddInstMenuClose = () => {
        setAnchorEl(null);
        navigate("/addInstructor")
    };

    const handleAddAdminMenuClose = () => {
        setAnchorEl(null);
        navigate("/addAdmin")
    };

    const handleAddDiscountMenuClose = () => {
      setAnchorEl(null);
      navigate("/makeDiscounts")
  };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const destroy = () => {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    };

     
  const menuId = 'primary-search-account-menu';
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

      <MenuItem onClick={handleAddCorpMenuClose}>Add Corporate Trainee</MenuItem>
      <MenuItem onClick={handleAddInstMenuClose}>Add Instructor</MenuItem>
      <MenuItem onClick={handleAddAdminMenuClose}>Add Admin</MenuItem>
      <MenuItem onClick={handleAddDiscountMenuClose}>Add Discount</MenuItem>

      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );

  
  return (
    <Box>
      <AppBar>
        <Toolbar>
      

        <Typography variant="h6" noWrap component="div"sx={{ display: { xs: 'none', sm: 'block' } }}>
            <a href="https://i.imgur.com/fe0T4nw.png"><img src={logo} onClick="https://google.com" alt="JALP Logo"/></a>
            </Typography>

          <h1>Beware Admin</h1>

          <Stack spacing={50} direction="row">

          <Stack direction="row">
         
          </Stack>
          <Box sx={{ flexGrow: 0.1 }} />
         <Button  sx={{ bgcolor:theme.palette.paper }} variant="contained" onClick={destroy}>BIG RED BUTTON</Button>
         
		 

    </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleProfileMenuOpen} size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <MenuIcon /> 
            </IconButton>
            <Box sx={{ flexGrow: 0.05 }} />
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

