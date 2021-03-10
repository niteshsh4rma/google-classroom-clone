import React from 'react'
import Container from '@material-ui/core/Container'

import MainCompHeader from './MainCompHeader'
import ClassesGrid from './ClassesGrid'

function Home() {

    return (
        <div className="home">
            <Container maxWidth={"xl"}>
                <br />
                <MainCompHeader />
                <ClassesGrid />
            </Container>
        </div>
    )
}

export default Home
