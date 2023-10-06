import React from 'react';
import {Box, Container, Grid} from "@mui/material";
import {useShipPositions} from './useShipPositions';
import {Cols} from "./Cols";
import {Rows} from './Rows';
import {Cell} from "./Cell";


function App() {
    const shipPositions = useShipPositions();
    console.log(shipPositions);
    return (
        <Container maxWidth="lg">
            <Box sx={{bgcolor: theme => theme.palette.grey[200]}}>
                <Grid container justifyContent="center" alignItems="center" spacing={2} height='100vh'>
                    <Cols>
                        <Rows>
                            <Cell shipPositions={shipPositions} />
                        </Rows>
                    </Cols>
                </Grid>
            </Box>
        </Container>
    );
}

export default App;
