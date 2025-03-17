import styled from 'styled-components'

export const CardSwapper = styled.div`
  position: absolute;
  top: 6rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 101;
  cursor: pointer;

  a {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    width: 100%;
    word-break: break-all;
  }
`
export const ButtonSwapper = styled.div`
  margin: 3px 20px 0 0;
  text-align: center;
  height: 4rem;
}
`
export const CopySwapper = styled.div`
  display: inline-block;
  position: absolute;
  top: 50px;
  right: 150px;
  background: #5e5a68;
  padding: 10px;
  border-radius: 20px;
  color: #fff;
  font-size: 12px;
`
