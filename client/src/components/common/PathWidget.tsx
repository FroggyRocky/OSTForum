import {NavLink} from "react-router-dom";
import styled from "styled-components";

const Path = styled.p`
  display: flex;
  align-items: center;
  color: #525252;
  font-family: var(--family-text);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;

`
const Link = styled(NavLink)`
  border-bottom: solid 0.5px #525252;
  color: #525252;
  padding-bottom: 1px;

  &:hover {
    color: #58649C;
    border-bottom: solid 0.5px #58649C;
  }

`
const PathArrow = styled.span`
  margin: 0 10px;
`

type Props = {
    historyPath: Array<{ pathName: string, path: string }>,
    targetPath: string
};

export const PathWidget = (props: Props) => {

    const historyPath = () => {
        if (props.historyPath && props.historyPath.length) {
            return props.historyPath.map((el, index) => {
                if (!props.targetPath && props.historyPath.length - 1 === index) {
                    return <Link key={el.path} to={el.path}>{el.pathName}</Link>
                } else {
                    return <>
                        <Link key={el.path} to={el.path}>{el.pathName}</Link>
                        <PathArrow>{`>`}</PathArrow>
                    </>
                }
            })
        } else {
            return <>
                <Link to='/'>Home</Link>
                <PathArrow>{`>`}</PathArrow>
            </>
        }
    }

    return <Path>{historyPath()}{props.targetPath}</Path>
}
