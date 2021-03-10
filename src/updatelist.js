// import { useStateValue } from './StateProvider'
// // import { db } from './firebse'

// export default updatelist = async () => {

//     const[{ user }, dispatch] = useStateValue()

//     const newlist = {}

//     await db.collection('users').doc(user.email).collection('created').get().then((snapshot) => {
//         snapshot.forEach((doc) => {
//             newlist[doc.id] = doc.data()
//         })
//     })

//     await db.collection('users').doc(user.email).collection('joined').get().then((snapshot) => {
//         snapshot.forEach((doc) => {
//             newlist[doc.id] = doc.data()
//         })
//     })

//     dispatch({
//         type: "UPDATE_LIST",
//         classlist: newlist
//     })
// }