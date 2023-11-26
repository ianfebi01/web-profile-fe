export interface IDynamicForm{
    key: string,
    label: string,
    type: string,
    required: boolean,
    fieldType: string,
    placeholder?: string,
    options?: Option[],
    validation: IValidation
    disabled?: boolean
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
}