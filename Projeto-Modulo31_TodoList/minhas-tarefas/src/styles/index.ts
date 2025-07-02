import styled, { createGlobalStyle } from 'styled-components'
import variaveis from './variaveis'

const StyleGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    list-style: none;
  }

  body {
    background-color: #f4f4f4;
  }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 224px auto;
`

export const MainContainer = styled.div`
  padding: 16px 40px;
  height: 100vh;
  overflow-y: scroll;
`

export const Titulo = styled.h2`
  display: block;
  margin-top: 16px;
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: bold;
`

export const Campo = styled.input`
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
  font-weight: bold;
  color: #666666;
  width: 100%;
  border: 1px solid #a1a1a1;

  &:focus {
    border: 1px solid #1e90ff;
    outline: #1e90ff;
  }
`

export const Button = styled.button`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  background-color: #2f3640;
  border-radius: 8px;
  margin-right: 8px;
`

export const SaveButton = styled(Button)`
  background-color: ${variaveis.verde};
`

export default StyleGlobal
