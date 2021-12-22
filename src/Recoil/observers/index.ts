import { FunctionComponent, useEffect } from 'react'
import { RecoilState, useRecoilValue } from 'recoil'

interface IProps {
  node: RecoilState<any>
  onChange: (value: any) => void
}

export const RecoilObserver: FunctionComponent<IProps> = ({ node, onChange }) => {
  const value = useRecoilValue(node)
  useEffect(() => onChange(value), [onChange, value])
  return null
}
