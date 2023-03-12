import styled, {css} from "styled-components";
import {Flex} from "../../UIKit/StyledComponents/styledComponents";
import {mediaSizes} from "../../mediaSizes.styled";



const Navigation = styled(Flex)`
  width: 60%;
  & > span {
    cursor: pointer;
  }
  @media (max-width: ${mediaSizes.laptop}) {
    display: none;
  }
`


const SearchButton = styled.button<{ismobile:boolean}>`
  width: 45px; 
  height: 45px;
  border-radius: 15px;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%), #58649C;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ismobile}) => ismobile && css`
    width: 35px;
    height: 35px;
  `}
`
const AvatarContainer = styled.div`
  @media (max-width: ${mediaSizes.laptop}) {
    display: none;
  }
`
const ActionPanelMob = styled.div`
  display: none;
  @media (max-width: ${mediaSizes.laptop}) {
    display: flex;
    justify-content: space-between;
    z-index: 5;
  }
`
const UserIdMob = styled.div`
  padding: 15px;
  border-bottom: 1px solid #58649C;

  & > span {
    font-family: var(--gotham);
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #58649C;
    margin-left: 15px
  }
`
const UserName = styled.span`
  font-family: var(--gotham);
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #58649C;
  margin-left: 15px
`
const NavigationMob = styled.div`
  display: none;
  @media (max-width: ${mediaSizes.laptop}) {
    display: block;
    width: 285px;
    z-index: 100;
    top:100%;
    right: 0;
    margin-top:20px;
    position: absolute;
    background-color: white;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    & > span {
      font-family: var(--gotham);
      padding: 15px;
      font-weight: 400;
      font-size: 14px;
      line-height: 13px;
      display: flex;
      align-items: center;
      color: #525252;
    }
  }
  @media (${mediaSizes.mobile}) {
    width: 150px;
  }
`
const UsersWidgets = styled.div`
  display: flex;
  z-index: 200;
  align-items: center;
  @media (max-width: ${mediaSizes.laptop}) {
    display: none;
  }
`


export const headerStyles = {
    UsersWidgets,
    NavigationMob,
    UserName,
    UserIdMob,
    ActionPanelMob,
    AvatarContainer,
    SearchButton,
    Navigation,
}