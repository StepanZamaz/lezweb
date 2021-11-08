import React from "react";
import styled from 'styled-components';

//
export const Hero = styled.div`
  height: 82vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
export const Heading = styled.h1`
  color: #000;
  font-size: 5rem;
  font-weight: 900;
`;

export const Button = styled.button`
    border: none;
    color: blue;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
`
export const Nadpis = styled.div`
    color: #61ed84;
    margin-left: 40%;
    margin-right: 40%;
    width: 20%;
    font-size: 100px;
    
`
export const SeznamOblasti = styled.div`
    position: relative;
`
export const Header = styled.div`
    background-color: #323232;
    width: 100%;
    height: 25%;
    position: relative;
`
export const DetailImg = styled.img`
    width: 616px;
    height: 416px;
`
export const DivWhole = styled.div`
    height: 100%;
`
export const RowImage = styled.div`
    height: 65%;
    display: flex;
`
export const ColumnImage = styled.div`
    flex: 50%;
    padding: 10px;
    height: 300px;
`
//
export const navBar = styled.nav`
    display: flex ;
    justify-content: space-between;
    padding: 3 2 3;
`
export const navUl = styled.ul`
    display: flex;
    justify-content: space-between;
`