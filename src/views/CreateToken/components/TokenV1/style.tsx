import styled from 'styled-components'

export const TokenFactory = styled.div`
  width: 100%;
  height: 77vh;
  overflow-y: scroll;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  #introduceTitle {
    color: #009688;
    font-size: 12px;
  }
  input {
    &:focus:not(:disabled) {
      box-shadow: 0px 0px 0px 1px #9a84c8, 0px 0px 0px 1px rgb(118 69 217 / 60%);
    }
  }
`
export const TokenFactoryItem = styled.div`
  width: 80%;
  height: 92px;
  padding: 8px;

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

export const OtherSwapper = styled.div`
  width: 80%;
  display: flex;
  padding: 8px;
  .title {
    white-space: nowrap;
  }
  .otherItem {
    display: flex;
    flex-wrap: wrap;

    .flex {
      display: flex;
      margin: 0 2rem 0.5rem 0;
      input {
        margin-right: 0.5rem;
        &:focus:not(:disabled) {
          box-shadow: 0px 0px 0px 1px #9a84c8, 0px 0px 0px 1px rgb(118 69 217 / 60%);
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    .otherItem {
      margin-top: 1rem;
      .flex {
        margin: 0 0 0.5rem 0;
        width: 45%;
      }
    }
  }
`
export const TokenFactoryItemMore = styled.div`
  margin: 1rem 2rem;
  padding: 1rem 2rem;
  border-radius: 10px;

  @media (max-width: 400px) {
    width: 100%;
    margin: 0;
  }
`
export const MoreItemSwapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;

  .moreTitle {
    margin-right: 0.5rem;
  }
  input {
    margin-right: 0.5rem;
  }

  @media (max-width: 1500px) {
    flex-wrap: wrap;
  }
`
export const MoreItem = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin-top: 1rem;

  .itemTitleMore {
    margin: 0 0.5rem 0 2rem;
    white-space: nowrap;
  }

  @media (max-width: 1500px) {
    width: 100%;

    .itemTitleMore {
      margin: 0 1rem 0 0;
    }
  }
`
export const Introduce = styled.div`
  border: 1px solid #d0f5e0;
  background: #e7faf0;
  line-height: 30px;
  padding: 0 0.5rem;
  width: 100%;
  border-radius: 4px;
  margin: 1rem auto 0;
  word-break: break-all;
  cursor: pointer;
`
