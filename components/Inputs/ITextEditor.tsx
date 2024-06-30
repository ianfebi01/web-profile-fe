'use client'
import { useRef, useMemo } from 'react'
import JoditEditor, { Jodit } from 'jodit-react'

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

interface Props extends DeepPartial<Jodit['options']> {
  value: string
  placeholder?: string
  setValue: ( val: string ) => void
}
const ITextEditor = ( {
  value,
  setValue,
  placeholder = 'Start typings...',
  ...props
}: Props ) => {
  const editor = useRef( null )

  const config = useMemo<DeepPartial<Jodit['options']>>( () => {
    return {
      readonly    : false, // all options from https://xdsoft.net/jodit/docs/,
      tabIndex    : 1,
      value       : value,
      placeholder : placeholder,
      ...props,
    }
  }, [props] )

  return (
    <JoditEditor
      className="text-dark"
      ref={editor}
      value={value}
      config={config}
      // tabIndex={1} // tabIndex of textarea
      onBlur={( newContent ) => setValue( newContent )} // preferred to use only this option to update the content for performance reasons
      onChange={( newContent ) => setValue( newContent )}
    />
  )
}

export default ITextEditor
