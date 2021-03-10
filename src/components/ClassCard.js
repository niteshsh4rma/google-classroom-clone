import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) =>({
    root: {
        
        borderRadius: '10px',
        margin: '15px',
        "&:hover": {
            boxShadow: "1px 1px 10px gray",
        }
    },
    media: {
        height: 100,
    },
    header: {
        backgroundImage: "url('https://gstatic.com/classroom/themes/Physics.jpg')",
        backgroundSize: 'contain',
        color: "white",
        height: 70
    },
    avatar: {
        marginTop: -35,
        marginLeft: "auto",
        marginRight: 10,
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    actionArea:{
        minWidth: 300,
        minHeight: 75,
    },
    action: {
        borderTop: '1px solid lightgray',
    }
}));

export default function CardClass({code, data}) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader
                action={
                    <IconButton aria-label="settings" >
                        <MoreVertIcon style={{'color':"white"}}/>
                    </IconButton>
                }
                title={
                    <Link to={`/c/${code}`} style={{color:'white'}}>{data.classname}</Link>
                }
                subheader={data.teacherName}
                className={classes.header}
                subheaderTypographyProps={{color: 'white'}}
                
            />
            <Avatar className={classes.avatar} src={data.teacherPhotoURL}/>
            
            <CardContent className={classes.actionArea}>

            </CardContent>
            <CardActions className={classes.action}>
                <AssignmentIndOutlinedIcon style={{marginLeft: 'auto', color: 'gray'}}/>
                <FolderOpenOutlinedIcon style={{color: 'gray'}}/>
            </CardActions>
        </Card>
    );
}