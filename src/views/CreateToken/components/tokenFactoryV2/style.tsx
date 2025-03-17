import styled from 'styled-components'

export const TokenFactoryV2 = styled.div`
  width: 100%;
  border-radius: 20px;
  padding: 2rem 0;
  .advancedOptionsTitle {
    margin: 0 1rem;
  }
  input {
    flex: 1;
    &:focus:not(:disabled) {
      box-shadow: 0px 0px 0px 1px #9a84c8, 0px 0px 0px 1px rgb(118 69 217 / 60%);
    }
  }

  #introduceTitle {
    color: #009688;
    font-size: 12px;
  }

  .itemTitle {
    min-width: 5rem;
    margin-right: 1rem;
  }
  .price {
    flex: 1;
    border: 2px solid #374151;
    font-size: 16px;
    height: 40px;
    padding: 0 16px;
    border-radius: 10px;
    line-height: 40px;
  }
  .flex_center {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 770px) {
    width: 100%;
    margin-top: 0;
    border-radius: 0;

    .max_width {
      max-width: 40vw;
    }
    .contract_address {
      flex-direction: column;
      align-items: self-start;
    }
  }
`
export const TokenFactoryItem = styled.div`
  margin: 1rem 2rem;
  padding: 1rem 2rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  word-break: break-all;

  @media (max-width: 400px) {
    width: 100%;
    margin: 0;
  }

  a {
    text-decoration: underline;
    color: #1fc7d4;
    &:hover {
      div {
        color: #1fc7d4;
      }
    }
  }
`

export const TokenNewSwapeer = styled.div`
  margin: 1rem 2rem;
  padding: 1rem 2rem;
  border-radius: 10px;
  word-break: break-all;

  @media (max-width: 400px) {
    width: 100%;
    margin: 0;
  }

  a {
    text-decoration: underline;
    color: #1fc7d4;
    &:hover {
      div {
        color: #1fc7d4;
      }
    }
  }
  .flex {
    display: flex;
  }
`

export const TokenFactoryItemAddress = styled.div`
  margin: 1rem 2rem;
  padding: 1rem 2rem;
  border-radius: 10px;

  .itemFlex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1500px) {
    margin: auto;
    .itemFlex_block {
      display: block;
    }
  }
  @media (max-width: 400px) {
    width: 100%;
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

export const AdvancedOptionsSwitch = styled.div`
  margin: 1rem 2rem;
  background: rgb(103 58 183 / 31%);
  padding: 1rem;
  border-radius: 10px;
`

interface AdvancePros {
  isShow?: boolean
}

export const AdvancedOptionsSwapper = styled.div`
  // visibility:${(props: AdvancePros) => (props.isShow ? 'visible' : 'hidden')};
  // transition: all 3s ease-in-out;
  // height:${(props: AdvancePros) => (props.isShow ? '30vh' : '0')};
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
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
