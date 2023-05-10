import styled from "styled-components";
import {mediaSizes} from "../../UIKit/mediaSizes.styled";
import {useEffect, useRef, MutableRefObject} from "react";

const Container = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 15px 15px 0 0;
`
const Content = styled.div`
  padding: 30px;
  font-family: var(--gotham);
  hyphens: auto;
  & > h1, h2, h3 {
    margin: 20px 0;
    @media (max-width: ${mediaSizes.mobile}) {
      margin: 15px 0 15px 0;
    }
  }

  & > h1 {
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    color: #58649C;
    @media (max-width: ${mediaSizes.mobile}) {
      font-size: 18px;
      line-height: 22px;
    }
  }

  & > ul {
    margin: 16px 0 16px 1%;

  }

  & > ul > li {
    font-family: var(--gotham);
    font-weight: 700;
    margin-left: 2%;
    font-size: 18px;
    line-height: 32px;
    color: #525252;
    @media (max-width: ${mediaSizes.mobile}) {
      font-size: 12px;
      line-height: 18px;
    }
  }

  & > p {
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
    color: #000000;
    font-family: var(--gotham);
    @media (max-width: ${mediaSizes.mobile}) {
      font-size: 12px;
      line-height: 18px;
    }
  }
  & .article__imgContainer {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: dashed 1px grey;
    border-radius: 15px;
    padding-right: 15px;
  }

  & .article__imgLoader {
    position: absolute;
    display: inline-block;
    width: 100px;
    height: 100px;
    border: 2px solid #fff;
    border-radius: 100%;
    border-top-color: #58649C;
    animation: spin 1s linear infinite;
  }
  & > figure img, figure pre img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    visibility: hidden;
  }

  & > h2, h3 {
    font-weight: 700;
    font-size: 25px;
    line-height: 28px;
    color: #525252;
    @media (max-width: ${mediaSizes.mobile}) {
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
    }
  }



  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}

& > a {
  color: #58649C;
  text-decoration: underline;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
}


`

type Props = {
    text: string
};
export const ArticleText = (props: Props) => {
    const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null)

    useEffect(() => {
        if(!contentRef.current) return
        const imgs = contentRef.current.querySelectorAll('img');
        if(!imgs || imgs.length === 0) return
        imgs.forEach(img => {
            const src = img.src
            if (src) {
                const Image = new window.Image()
                Image.src = src;
                Image.onload = () => {
                    const parent = img.parentNode as HTMLElement
                    const sibling = img.previousElementSibling as HTMLElement
                    if(!sibling && !parent) return
                    sibling.style.display = 'none'
                    img.style.visibility = 'visible'
                    parent.style.border = 'none'
                };
            }
        })

    }, [props.text])
    return <Container>
        <Content ref={contentRef} dangerouslySetInnerHTML={{__html: props.text}}>

        </Content>
    </Container>
};