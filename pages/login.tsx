import React from 'react'
import BasicLayout from "../layout/Basic";
import styled from 'styled-components';
import {Hero, Heading} from '../components/styledComponents/styledComponents'
const Login = () => {
    return (
        <>
            <BasicLayout>
                <Hero>
                    <Heading>login</Heading>
                </Hero>
            </BasicLayout>   
        </>
    )
}

export default Login;
