import React, { useEffect } from 'react'
import ClassCard from './ClassCard'
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../firebase'
import { useStateValue } from '../StateProvider'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    responsive: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}));



function ClassesGrid() {
    const classes = useStyles();
    const [{ user, classlist, joinlist }, dispatch] = useStateValue()

    useEffect(() => {
        document.title = "Classroom"
    })

    return (
        <div className={classes.root}>
            <div className={classes.responsive}>
                {
                    Object.keys(classlist).map((key) => <><ClassCard code={key} data={classlist[key]}/></>)
                }
            </div>

        </div>
    )
}

export default ClassesGrid
