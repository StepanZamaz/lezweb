import React, { MouseEventHandler } from 'react'
import Popup from "reactjs-popup";
import styled from 'styled-components';

const ModalDiv = styled.div`
    width: 80vw;
    height: 80vh;
    background-color: white;
    color: black;
`
const ProfileFormModal = () => {
    return (
        <div>
            <Popup
                trigger={<button className="button"> Open Modal </button>}
                modal
            >
                {(close:MouseEventHandler<HTMLButtonElement>) => (
                    <ModalDiv>
                        shoj
                        <button onClick={close}>close</button>
                    </ModalDiv>
                    
                )}
            </Popup>
        </div>
    )
}

export default ProfileFormModal
