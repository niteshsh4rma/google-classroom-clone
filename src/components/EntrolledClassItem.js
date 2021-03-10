import React from 'react'
import List from '@material-ui/core/List'
import { Avatar, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

function EntrolledClassItem({key, data}) {
    return (
        <div>
            <List>
            <ListItem>
                <ListItemIcon>
                    <Avatar style={{width: '35px', height: '35px'}}>{data?.classname[0]}</Avatar>
                </ListItemIcon>
                <ListItemText primary={data?.classname} secondary={data?.section} />
            </ListItem>
        </List>
        </div>
    )
}

export default EntrolledClassItem
