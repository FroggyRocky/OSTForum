import {StyledAddArticleButton, StyledAddArticleButtonContainer, StyledErrorMessage} from "../StyledComponents";
import {BsFillCheckCircleFill} from "react-icons/bs";

type Props = {
    formikIsValid:boolean
    targetedContent:string
};

export function AddButton(props: Props) {
    return   <StyledAddArticleButtonContainer>
        <StyledAddArticleButton type={'submit'}>
            <BsFillCheckCircleFill size={120} opacity='0.5' color='#58649C'/>
            <p>Add {props.targetedContent}</p>
        </StyledAddArticleButton>
        {!props.formikIsValid &&
            <StyledErrorMessage style={{marginTop: '30px'}}>You haven't passed validation, check if all the fields
                are
                field correctly</StyledErrorMessage>}
    </StyledAddArticleButtonContainer>
};