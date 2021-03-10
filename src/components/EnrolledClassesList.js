import React from 'react'
import EntrolledClassItem from './EntrolledClassItem'
import { useStateValue } from '../StateProvider'


function EnrolledClassesList() {
    const [{ classlist, joinlist }, dispatch] = useStateValue()
    return (
        <div>
            {
                Object.keys(joinlist).map((key) => <div>{joinlist[key]?.classname}</div>)
            }
            {
                Object.keys(classlist).map((key) => <EntrolledClassItem code={key} data={classlist[key]} />)
            }
            
        </div>
    )
}

export default EnrolledClassesList
