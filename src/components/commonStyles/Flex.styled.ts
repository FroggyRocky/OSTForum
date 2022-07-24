import styled from 'styled-components'

type FlexType = {
    justifyContent?:string,
    flexDirection?:string,
    alignItems?:string,
    gap?:string,
    flexWrap?:string
}

export const Flex = styled.div<FlexType>`
display: flex;
  justify-content: ${({justifyContent}) => justifyContent || 'center'};
  flex-direction: ${({flexDirection}) => flexDirection || 'row'};
  align-items: ${({alignItems}) => alignItems || 'center'};
  gap: ${({gap}) => gap};
  flex-wrap: ${({flexWrap}) => flexWrap || 'wrap'};
`