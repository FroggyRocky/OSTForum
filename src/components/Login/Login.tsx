import styled, {css} from "styled-components";
import {Wrapper} from "../common/commonStyles/Wrapper.styled";
import {Content} from "../common/commonStyles/Content.styled";
import {useState, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks";
import {loginUser} from "../../redux/auth/authConfigsThunks";
import {useNavigate} from "react-router-dom";


const LoginContainer = styled.div`
  background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);
  width: 400px;
  height: 400px;
  margin: auto auto;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoginContent = styled.div`
  width: 100%;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Label = styled.p`
  font-family: var(--family-text);
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%), #58649C;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin: 8px 0;
`
const Input = styled.input`
  border: none;
  background-color: rgba(227, 227, 227, 0.53);
  height: 40px;
  border-right: 30px;
  color: black;
  padding-left: 8px;
  border-radius: 8px;
  font-family: var(--family-text);
  &:focus {
    outline: none;
  }
`
const Button = styled.button`
  font-family: var(--family-text);
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: whitesmoke;
  margin-top: 16px;
  width: 50%;
  height: 40px;
  border: none;
  border-radius: 16px;
  background-color: #FEE140;
  background-image: linear-gradient(90deg, #FEE140 0%, #FA709A 100%);
`


type Props = {};

export const Login = (props: Props) => {
    const dispatch = useAppDispatch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const isAuth = useAppSelector(state => state.authConfigs.isAuth)
    const navigate = useNavigate()

    useEffect(() => {
    if(isAuth) {
        navigate('/dashboard')
    }
    }, [isAuth])

    function onLoginChange(e: any) {
        const value = e.target.value
        setLogin(value)
    }

    function onPasswordChange(e: any) {
        const value = e.target.value
        setPassword(value)
    }

    async function onLogin() {
        const data = {
            login: login,
            password: password
        }
        dispatch(loginUser(data))
    }

    return <Wrapper>
        <Content style={{padding: '20px 0'}}>
            <LoginContainer>
                <LoginContent>
                    <div>
                        <Label>Login</Label>
                        <Input onChange={onLoginChange} placeholder='Login'/>
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input type='password' onChange={onPasswordChange} placeholder='Password'/>
                    </div>
                    <Button onClick={onLogin}>Login</Button>
                </LoginContent>
            </LoginContainer>
        </Content>
    </Wrapper>
};