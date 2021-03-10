import { Container, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import AnnouncementList from './AnnounementList'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1.5rem',
    },
    banner: {
        height: 225,
        backgroundImage: "url('https://gstatic.com/classroom/themes/img_bookclub.jpg')",
        borderRadius: '.5rem',
        backgroundSize: 'cover',
        backgroundRepeat: 'none'
    },
    classname: {
        fontSize: "30px",
        color: "white"
    },
    border: {
        border: '1px solid'
    },
    leftmenu: {
        flex: '.3',
        border: '1px solid lightgray',
        borderRadius: '.5rem',
        marginRight: "1.5rem",
        padding: '1.5rem',
        maxHeight: 100
    },
    rightmenu: {
        flex: '1'
    }
}))

function ClassHome() {

    const classes = useStyles()

    const { cid } = useParams()

    const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
    useEffect(() => {
        window.addEventListener("resize", () => {
            const ismobile = window.innerWidth < 720;
            if (ismobile !== isMobile) setIsMobile(ismobile);
        }, false);
    }, [isMobile]);

    return (
        <div className={classes.root}>
            <Container maxWidth={"md"} className={classes.banner}>
                <List>
                    <ListItem>
                        <ListItemText primary={<h1>Soft Computing</h1>} secondary={<h2 style={{ color: 'white' }}>IT 6th</h2>} className={classes.classname} />
                    </ListItem>
                </List>
            </Container>
            <Container maxWidth={"md"} style={{ display: 'flex', padding: '0', marginTop: "1.5rem" }}>
                {
                    !isMobile ?
                        (
                            <>
                                <div className={classes.leftmenu}>
                                    <p style={{ fontSize: '16px', margin: '0.25rem 0 1rem 0', fontWeight: '600' }}>Upcoming</p>
                                    <p style={{ fontSize: '14px', margin: '0.12rem 0 1rem 0', fontWeight: '500', color: 'gray' }}>Woohoo, no work due soon!</p>
                                    <div style={{ display: 'flex' }}>
                                        <Button color="primary" variant="default" style={{ marginLeft: 'auto', textTransform: 'none' }}>View all</Button>
                                    </div>
                                </div>
                            </>
                        ) : <></>
                }

                <div className={classes.rightmenu}>
                    <AnnouncementList />
                </div>
            </Container>

        </div>
    )
}

export default ClassHome
