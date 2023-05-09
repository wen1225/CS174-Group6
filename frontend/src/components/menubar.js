import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export function MenuBar() {
    const navigate = useNavigate();
    return (
        <AppBar component="nav">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                    onClick={()=>{navigate("/")}}
                >
                    Customer Relationship Management
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button sx={{ color: '#fff' }} component={Link} to={{
                        pathname: `/member/`,
                    }}>
                        Membership
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}