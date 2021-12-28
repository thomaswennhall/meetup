import styled, { css } from 'styled-components'

export const Wrapper = styled.section``

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const baseInput = css`
  padding: 0.6rem 0.4rem;
  margin-bottom: 1rem;
  width: 100%;
`

export const TitleInput = styled.input`
  ${baseInput}
`

export const DescriptionInput = styled.textarea`
  ${baseInput}
  resize: none;
  height: 8rem;
`

export const dateAndTimeContainer = styled.div``

export const DateInput = styled.input`
  ${baseInput}
`

export const TimeInput = styled.input`
  ${baseInput}
`

export const PlaceInput = styled.input`
  ${baseInput}
`

export const MaxAttendeesInput = styled.input`
  ${baseInput}
`

export const Button = styled.button``
