import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase'

export default function CreateClass() {

    const [{ user, createClassState }, dispatch] = useStateValue()

    const handleClose = () => {
        dispatch({
            type: "SET_CREATE_DIAG",
            createClassState: false

        })
    };

    const [className, setClassName] = useState(null)
    const handleClassName = (e) => {
        setClassName(e.target.value)
    }

    const createClass = async () => {
        await db
            .collection('users').doc(user.email).collection('created').add({
                classname: document.getElementById('classname').value,
                section: document.getElementById('section').value,
                subject: document.getElementById('subject').value,
                room: document.getElementById('room').value,
                teacher: user.email,
                teacherName: user.displayName,
                teacherPhotoURL: user.photoURL,
                announcements: [],
                assignments: [],
                students: []
            }).catch(err => alert(err.message))
        handleClose()
    }

    return (
        <div>
            <Dialog open={createClassState} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create class</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="classname"
                        label="Class name (required)"
                        type="text"
                        fullWidth
                        variant="filled"
                        required
                        onChange={handleClassName}
                    />
                    <TextField
                        
                        margin="normal"
                        id="section"
                        label="Section"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        
                        margin="normal"
                        id="subject"
                        label="Subject"
                        type="text"
                        fullWidth
                        variant="filled"
                        
                    />
                    <TextField
                        
                        margin="normal"
                        id="room"
                        label="Room"
                        type="text"
                        fullWidth
                        variant="filled"
                        
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" style={{'textTransform':'none'}}>
                        Cancel
                    </Button>
                    <Button onClick={createClass} color="primary" style={{'textTransform':'none'}} disabled={!className}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
