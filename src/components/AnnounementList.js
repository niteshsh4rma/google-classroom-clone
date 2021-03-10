import React from 'react'
import { Avatar, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { useStateValue } from '../StateProvider'

const useStyles = makeStyles((theme) => ({
    item: {
        border: '1px solid lightgray',
        borderRadius: '.5rem',
        padding: '1rem',
        boxShadow: "1px 1px 3px gray"
    },
    list: {
        paddingTop: 0
    }
}))

function AnnounementList() {

    const classes = useStyles()
    const [{ user }, dispatch] = useStateValue()

    return (
        <>
            <List className={classes.list}>
                <ListItem className={classes.item}>
                    <ListItemIcon>
                        <Avatar src={user.photoURL} />
                    </ListItemIcon>
                    <ListItemText secondary={<p style={{color: "#1e8e3e"}}>Announce something to your class</p>} />
                </ListItem>
            </List>
        </>
    )
}

export default AnnounementList
