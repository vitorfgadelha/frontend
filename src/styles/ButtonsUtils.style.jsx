import styled from "styled-components"

export const SContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 15%;
  gap: 10px;
`
export const SButton = styled.button`
  height: 40px;
  width: 80px;
  font-size: 16px;
  border-radius: 8px;
  border-color: transparent;
  background-color: #6c757d;
  color: white;

  &:hover {
    background-color: red;
  }
`
