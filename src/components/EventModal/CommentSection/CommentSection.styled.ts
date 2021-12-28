import styled from 'styled-components'

import { baseText } from '../../../themes/typography'

export const Wrapper = styled.section`
  margin-top: 1rem;
  width: 100%;
  border-top: 1px dashed black;
  padding-top: 1rem;
  overflow: scroll;
`

export const Form = styled.form`
  margin-top: 0.3rem;
  display: flex;
`

export const Input = styled.input`
  resize: none;
  padding: 0.6rem 0.4rem;
  width: 100%;
  outline: none;
  border: 1px solid ${props => props.theme.colors.green};
`

export const Button = styled.button`
  outline: none;
  border: none;
  padding: 0 0.6rem;
  border-radius: 0 0.3rem 0.3rem 0;
  background-color: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.text.light};
`

export const comment = styled.p`
  ${baseText}
  padding: 0.4rem;
  border: 1px dashed ${props => props.theme.colors.blue};
  border-radius: 0.3rem;
  margin-top: 1rem;
`
