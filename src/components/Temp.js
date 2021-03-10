db.collection('users').doc(teacherEmail).collection('created').doc(code).collection('students').doc(user.uid).get().then((student) => {
    if (student.exists) {
        alert('Already Joined')
    } else {
        db.collection('users').doc(teacherEmail).collection('created').doc(code).collection('students').doc(user.uid).set({
            studentEmail: user.email,
            studentName: user.displayName,
            studentPicture: user.photoURL
        }).catch((err) => alert(err.message))

        // join in student base
        db.collection('users').doc(user.email).collection('joined').doc(code).set({
            owner: teacherEmail
        }).catch((err) => alert(err.message))

        dispatch({
            type: "UPDATE_JOINLIST"
        })

    }
}).catch((err) => alert(err.message))