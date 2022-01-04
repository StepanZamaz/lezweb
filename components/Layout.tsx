import styled from "styled-components";

const LayoutWholeScreen = styled.div`
    height: 100%;
`
const Layout:React.FC = ({children})=> {
    return(
        <div>
            {children}
        </div>
    )
}
export default Layout;