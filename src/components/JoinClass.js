import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container'
import { Avatar, ListItemIcon, ListItemSecondaryAction } from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import { TextField } from '@material-ui/core';
import { auth, db } from '../firebase';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    buttonLower: {
        textTransform: 'none'
    }

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function JoinClass() {

    const classes = useStyles();
    const [{ user, joinClassState }, dispatch] = useStateValue()
    const [code, setCode] = React.useState(null)
    const [teacherEmail, setTeacherEmail] = React.useState(null)
    const [joinStatus, setJoinStatus] = React.useState('Join')

    const containerStyle = {
        'height': 'auto',
        'border': '1px solid lightgray',
        'border-radius': '10px',
        'margin-top': '20px',
        'padding': '0.5rem',
    }


    const changeAccount = () => {
        auth.signOut()
    }

    const handleCode = (e) => {
        setCode(e.target.value)
    }

    const handleTeacherEmail = (e) => {
        setTeacherEmail(e.target.value)
    }

    const handleClose = () => {
        dispatch({
            type: "SET_JOIN_DIAG",
            joinClassState: false
        })
        setJoinStatus('Join')
    };

    const joinClass = async () => {
        setJoinStatus('Joining')

        // alert(`${code}, ${teacherEmail}`)

        // join in teacher's base

        const doc = await db.collection('users').doc(teacherEmail).collection('created').doc(code).get()
        
        if (doc.exists){
            alert('Found')
        } else {
            alert('Not Found')
        }
        

        setJoinStatus('Join')
        handleClose()

    }



    return (
        <div >
            <Dialog fullScreen open={joinClassState} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar} color={"default"}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Join class
                        </Typography>
                        <Button color="primary" onClick={joinClass}
                            disabled={!code || !teacherEmail || joinStatus == "Joining"} variant="contained" className={classes.buttonLower}>
                            {joinStatus}
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{ 'margin': '15px' }}>
                    <Container maxWidth="sm" style={containerStyle}>
                        <List>
                            <ListItem>
                                <ListItemText secondary={"You're currently signed in as"} />
                            </ListItem>
                            <ListItem style={{ 'display': 'flex', 'flexWrap': 'wrap' }}>
                                <ListItemIcon>
                                    <Avatar src={user.photoURL} />
                                </ListItemIcon>
                                <ListItemText primary={user.displayName} secondary={user.email} />
                                <Button color="primary" onClick={changeAccount}
                                    variant="outlined" className={classes.buttonLower}>
                                    Switch Account
                                </Button>
                            </ListItem>

                        </List>
                    </Container>
                    <Container
                        maxWidth="sm"
                        style={containerStyle}>
                        <List>
                            <ListItem>
                                <ListItemText primary="Class code" secondary="Ask your teacher for the class code, then enter it here." />
                            </ListItem>
                            <ListItem>
                                <TextField fullWidth id="classcode" label="Class code" variant="outlined"
                                    onChange={handleCode}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField fullWidth id="teacheremail" label="Teacher Email" variant="outlined"
                                    onChange={handleTeacherEmail}
                                />
                            </ListItem>
                        </List>
                    </Container>
                    <Container maxWidth="sm">
                        <List>
                            <ListItem>
                                <ListItemText>
                                    <b>To sign in with a class code</b>
                                </ListItemText>

                            </ListItem>
                            <ListItem>
                                <ListItemText>

                                    <ul>
                                        <li>
                                            Use an authorized account
                                </li>
                                        <li>
                                            Use a class code with 5-7 letters or numbers, and no spaces or symbols
                                </li>
                                    </ul>

                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText secondary>
                                    If you have trouble joining the class, go to the Help Center article
                            </ListItemText>
                            </ListItem>
                        </List>
                    </Container>
                </div>
            </Dialog>
        </div >
    )
}

export default JoinClass
