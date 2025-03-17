import styled from 'styled-components'

export const TokenPage = styled.div`
  width: 100%;
  padding: 3rem 0;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(139.73deg, #e5fdff 0%, #f3efff 100%);
`
export const ToKenSwapper = styled.div`
  padding: 8px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgb(231, 227, 235);
  border-radius: 16px;
  width: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`
