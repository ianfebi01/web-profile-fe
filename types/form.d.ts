import { GroupBase, OptionsOrGroups } from "react-select"

export interface IDynamicForm {
  name: string
  label: string
  type: string
  fieldType?: 'text' | 'image' | 'switch' | 'year' | 'date' | 'select'
  placeholder: string
  options?: Option[]
  validation?: IValidation
  disabled?: boolean
  defaultImageUrl?: string
  select?: {
    options?: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined,
    isMulti?: boolean
  }
}

export type IOptions = {
  label: string,
  value: number | string
}

interface IValidation {
  charLength?: {
    max?: number
    min?: number
  }
  date?: {
    min?: Date
    max?: Date
  }
  inputRule?: RegExp[]
  numeric?: boolean
  required?: boolean
  image?: IImageValidation
}

interface IImageValidation {
  maxSize?: number
}
