import React from 'react';
import {  Button, ButtonGroup, Grid, Typography, Container } from '@material-ui/core';

import { Type } from './Events/EventsList';
import styles from './NavBar.module.css';

export const NavBar: React.FunctionComponent<{
    onTypeClick: (type:  Type) => void;
}> = ({ onTypeClick }) => {
    return (
        <div className={styles.navbar}>
            <Container >
                <Grid container alignItems="center">
                    <Grid item xs={2}>
                        <Typography>my logo</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                            <Button onClick={() => onTypeClick('ALL')}>
                                All Events
                            </Button>
                            <Button onClick={() => onTypeClick('BOOKED')}>
                                My Events
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}