import styled from 'styled-components'

export const CREACTNFTWAPPER = styled.div`
  width: 80%;
  height: 77vh;
  overflow-y: scroll;
  input {
    &:focus:not(:disabled) {
      box-shadow: 0px 0px 0px 1px #9a84c8, 0px 0px 0px 1px rgb(118 69 217 / 60%);
    }
  }
  @media (max-width: 770px) {
    width: 100%;
  }
`

export const FarmsWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 3rem 0 1rem 0;
  position: relative;

  .addressLabel {
    display: block;
    width: 100%;
    @media (max-width: 968px) {
      font-size: 14px;
    }
    @media (max-width: 320px) {
      font-size: 12px;
    }
  }

  .border_color {
    border: 4px solid transparent;
    border-radius: 16px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #eb2f96c7, #dd166078), linear-gradient(90deg, #ff7875ba, #1890ff);
  }

  .font_color {
    background-image: -webkit-linear-gradient(bottom, #1890ff, rgb(66 212 50 / 85%));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

export const INFHeader = styled.div`
  position: relative;
  width: 80%;
  margin: 1rem;
`
export const INFForm = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  border-bottom: 1px solid rgb(229, 232, 235);
  .required {
    font-weight: 500;
    font-size: 12px;
    color: rgb(112, 122, 131);
    .required-label {
      color: rgb(235, 87, 87);
    }
  }
  @media (max-width: 400px) {
    width: 90%;
  }
`
export const INFFormItem = styled.div`
  margin: 1rem 0;
  .item {
    margin-bottom: .3rem;
  }

  .item-title{
    color: rgb(53, 56, 64);
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 4px;
    line-height: 1.5;
    &:after {
      content: ' *';
      color: rgb(235, 87, 87);
    }
  }


  .item-imageWrapper{
    height: 15rem;
    width: 15rem;
    position: relative;
    padding: .3rem;
    cursor: pointer;
    border: 3px dashed rgb(238, 234, 244);
    border-radius: 10px;

    &:hover .item-imageWrapper-image{
      display:block;
    }
    .item-image {
      height: 96%;
      width: 96%;
      position: absolute;
      left:50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .item-imageWrapper-image {
      display:none;
      position: absolute;
      left:50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 96%;
      width: 96%;
      z-index: 80;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.15);
    }
  }
}

.defaultIcon {
  position: absolute;
  left:50%;
  top: 50%;
  transform:translate(-50%,-50%)
}

.Input-main {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 1px solid rgb(229, 232, 235);
  display: flex;
  align-items: center;
  position: relative;


  .Input--input {
    background-color: transparent;
    border: none;
    flex: 1 0 0%;
    height: 48px;
    outline: none;
    padding: 0px .5rem 0px 0px;
    min-width: 0px;
  }
}
`
export const INFCreated = styled(INFHeader)`
  margin-top: 2rem;
  margin-bottom: 2rem;

  .created-item {
    display: inline-flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 10px;
    -webkit-box-pack: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    padding: 1rem 1rem;
    background-color: rgb(32, 129, 226);
    border: 1px solid rgb(32, 129, 226);
    color: rgb(255, 255, 255);
    cursor: pointer;
  }
`

export const TotalHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto 2rem;

  @media (max-width: 770px) {
    flex-wrap: wrap;
  }
`
export const HeaderItem = styled.div`
  border: 1px solid hsl(0deg 0% 100% / 59%);
  height: 200px;
  width: 60%;
  color: #ffffff;
  border-radius: 10px;
  margin: 1rem;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 770px) {
    width: 90%;
  }

  font-weight: bold;
  font-size: 2em;

  .number {
    margin: 0.5rem 0;
    color: #096dd9;
    font-size: 4rem;
  }
`
