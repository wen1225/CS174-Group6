import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Container from '@mui/material/Container'
import CssBaseline  from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { createTheme, ThemeProvider} from '@mui/material/styles'
import Typography  from '@mui/material/Typography'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const theme = createTheme()

export function MemberList() {

    const renderFormButton = (params) => {
        return (
            <IconButton
                variant="contained"
                sx={{ textTransform: "none" }}
                component={Link} to={{
                    pathname: `/member/update/${params.id}`,
                }}
            >
                <EditIcon />
            </IconButton>
        )
    }

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "firstName", headerName: "First Name", flex: 1 },
        { field: "lastName", headerName: "Last Name", flex: 1 },
        { field: "gender", headerName: "Gender", flex: 1 },
        { field: "click", headerName: "Action", flex: 1 , renderCell: renderFormButton}
    ]

    const rows = [
        { id: 1, firstName: "John", lastName: "Doe", gender: "Male"},
    ]

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 5,
                    }}
                >
                    <Typography component="h1" variant="h5" marginBottom="20px">
                        Members
                    </Typography>
                    <Paper sx={{padding: 2}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            autoHeight
                        />
                    </Paper>
                </Box>
                <Button
                    component={Link} to='/member/create'
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , textTransform: 'none', float: 'right'}}
                >
                    Create Member
                </Button>
            </Container>
        </ThemeProvider>
    )
}
