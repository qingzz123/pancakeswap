import styled from 'styled-components'

export const TokenFactory = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const TokenFactoryItem = styled.div`
  width: 80%;
  height: 92px;
  padding: 8px;
  input {
    &:focus:not(:disabled) {
      box-shadow: 0px 0px 0px 1px #9a84c8, 0px 0px 0px 1px rgb(118 69 217 / 60%);
    }
  }
  span {
    display: inline-block;
    background-color: #ffeded;
    color: red;
    font-size: 12px;
    padding: 10px;
    margin-left: 2rem;
    border-radius: 6px;
    font-weight: 100;
  }
  svg {
    cursor: pointer;
  }
`
export const SelectorSwapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
export const SelectorItem = styled.div`
  //  width: 33%;
  height: 42px;
  padding: 8px;
  display: flex;
  align-items: center;
`

export const FoldFeeSwapper = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 10px 8px;
  border: 1px solid rgb(231, 227, 235);
  border-radius: 16px;
  margin: 10px 0;
`
export const FoldFeeItem = styled.div`
  height: 62px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  input {
    width: 110px;
    margin: 0 6px;
    &:focus:not(:disabled) {
      box-shadow: 0px 0px 0px 1px #9a84c8, 0px 0px 0px 1px rgb(118 69 217 / 60%);
    }
  }
`

export const ButtonSwapper = styled.div`
  margin: 2rem;
`
export const RouterSelectorSwapper = styled.div`
  margin: 8px 0;
  padding-left: 8px;
  width: 80%;
  display: flex;
  align-items: center;
  .ant-select {
    width: 40%;
    margin-left: 20px;
    .ant-select-selector {
      height: 40px;
    }
    .ant-select-selection-item {
      line-height: 40px;
    }
  }
`
