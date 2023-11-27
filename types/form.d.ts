export interface IDynamicForm{
    name: string,
    label: string,
    type: string,
    fieldType?: 'text' | 'image' | 'switch',
    placeholder: string,
    options?: Option[],
    validation?: IValidation
    disabled?: boolean
    defaultImageUrl?: string
}

interface IValidation{
    charLength?: {
        max?: number,
        min?: number,
    }
    date?: {
        min?: Date,
        max?: Date,
    },
    inputRule?: RegExp[],
    numeric?: boolean,
    required?: boolean
}