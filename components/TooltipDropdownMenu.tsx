import React from 'react'
import { CgProfile } from 'react-icons/cg'
import Popup from 'reactjs-popup'
import styled from 'styled-components'

const StyledProfileIcon = styled(CgProfile)`
    font-size: 3em;
    color: #61ed84;
    cursor: pointer;
`
const TooltipDropdownMenu = () => {
    return (
        <Popup
            trigger={open => (
                <StyledProfileIcon />
            )}
            position='bottom right'
            closeOnDocumentClick
            nested
        >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
        </Popup>

    )
}

export default TooltipDropdownMenu
