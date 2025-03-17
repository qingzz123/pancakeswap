import styled from 'styled-components'

export const TokenAdmini = styled.div`
  width: 100%;
  min-height: 60vh;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
`
export const TokenAdminiItem = styled.div`
  width: 90%;
  height: 60px;
  padding: 8px;
  display: flex;
  align-items: center;
  input {
    &:focus:not(:disabled) {
      box-shadow: 0px 0px 0px 1px #9a84c8, 0px 0px 0px 1px rgb(118 69 217 / 60%);
    }
  }
  .title {
    width: 10rem;
    white-space: nowrap;
    text-align: end;
  }
`
export const ComfirmedButton = styled.div`
  margin-top: 1rem;
  width: 90%;
  padding-left: 9rem;
`
