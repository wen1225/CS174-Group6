import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React from 'react';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

export function MenuBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar component="nav">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                    onClick={() => { navigate("/") }}
                >
                    Customer Relationship Management
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button sx={{ color: '#fff' }} component={Link} to={{
                        pathname: `/member/`,
                    }}>
                        Membership
                    </Button>
                    <Button sx={{ color: '#fff' }} component={Link} to={{
                        pathname: `/case/`,
                    }}>
                        Case
                    </Button>
                
                </Box>
                <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} component={Link} to='/auth/login'>Login</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to='/auth/register'>Register</MenuItem>
                        </Menu>
                    </div>
            </Toolbar>
        </AppBar>
    )
}