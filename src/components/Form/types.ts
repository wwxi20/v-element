import type { InjectionKey } from 'vue'
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'

export interface FormItemProps {
    label: string
    prop?: string
}
export type FormRules = Record<string, FormItemRule[]>
export interface FormItemRule extends RuleItem {
    trigger?: string
}


export interface FormProps {
    model: Record<string, any>
    rules: FormRules
    // rules: Record<string, any>

}

export interface FormContext extends FormProps {
    addField: (field: FormItemContext) => void
    removeField: (field: FormItemContext) => void
}

export interface ValidateStatusProp {
    state: 'init' | 'success' | 'error'
    errorMsg: string
    loading: boolean
}

export interface FormItemContext {
    prop: string
    validate: (trigger?: string) => Promise<any>
    // validate: (trigger?: string) => any
    resetField(): void
    clearValidate(): void
}
export interface FormValidateFailure {
    errors: ValidateError[] | null
    fields: ValidateFieldsError
}

export interface FormInstance {
    validate: () => Promise<any>
    resetFields: (props?: string[]) => void
    clearValidate: (props?: string[]) => void
}

export interface FormItemInstance {
    validateStatus: ValidateStatusProp
    validate: (trigger?: string) => Promise<any>
    resetField(): void
    clearValidate(): void
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')
