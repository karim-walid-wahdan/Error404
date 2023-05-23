import { useState,useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import logo from '../../resources/logo.PNG';
import { createTheme } from '@mui/system';
import Stack from '@mui/material/Stack';
import {TextField,AccordionDetails,AccordionSummary,Accordion,Button,MenuItem,InputBase,Typography,IconButton,Toolbar,Box,AppBar} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
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
export default function NavBarInstructor({instructorId}) {
    const navigate = useNavigate();
    const handleLogOut = () => {navigate("/")};
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [filter, setfilter] = useState(null);
    const isFilterMenuOpen = Boolean(filter);
    const [searchTerm, setSearchTerm] = useState(null);
    const handleProfileMenuOpen = (event) => {setAnchorEl(event.currentTarget);};
    const handleMenuClose = () => {setAnchorEl(null);};
    const handleFiltering = (event) => {setfilter(event.currentTarget);};
    const isFilterMenuClose = () => {setfilter(null);};
    const [filterPriceMin, setFilterPriceMin] = useState(null);
    const [filterPriceMax, setFilterPriceMax] = useState(null);
  const menuId = 'primary-search-account-menu';
  const filterId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu anchorEl={anchorEl} anchorOrigin={{vertical: 'top',horizontal: 'right'}} id={menuId} keepMounted transformOrigin={{vertical: 'top',horizontal: 'right'}}open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={()=>{navigate("/instructor/profile/"+instructorId)}}>Profile</MenuItem>
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
          <TextField
          onChange={(change)=>{setFilterPriceMax(change.target.value)}}
          id="outlined-number"
          label="Maximum Price"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <Box sx={{ flexGrow: 1}} />
         <Button  sx={{ bgcolor:theme.palette.paper }} variant="contained"  >Filter</Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
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

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Filter By Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Stack direction="row">
        <TextField
          id="outlined-number"
          label="Rating"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}></TextField>
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
      <AppBar>
        <Toolbar>
        <Typography variant="h6" noWrap component="div"sx={{ display: { xs: 'none', sm: 'block' } }}><img src={logo} onClick={()=>{navigate("/instructor/"+instructorId)}}alt="JALP Logo"/></Typography>
          <Stack spacing={8} direction="row">
          <Stack direction="row">
          <Search onChange={(change)=>{setSearchTerm(change.target.value)}}>
          <IconButton sx={{ mr: 2,paddingTop:1  }} color="inherit"onClick={()=>{console.log("hahahahaha")}}><SearchIcon /></IconButton>
            <StyledInputBase sx={{ width:500 }} placeholder="Search…" inputProps={{ 'aria-label': 'search' }}/>
          </Search>
            < IconButton onClick={handleFiltering} size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2,paddingTop:1  }}>
          <FilterListIcon /> 
          </IconButton>
          </Stack>
          <Box sx={{ flexGrow: 0.1 }} />
         <Button  sx={{ bgcolor:theme.palette.paper }} onClick={()=>{navigate("/instructor/addCourse/"+instructorId)}} variant="contained"  >Add new Course</Button>
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
    </Box>
  );
}

