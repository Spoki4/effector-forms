import { Event } from "effector";
import { Form, FormValues } from "./factory";
import { Field, ValidationError, FieldConfig, AnyFieldsConfigs } from "./types";
declare type ErrorTextMap = {
    [key: string]: string;
};
declare type ConnectedField<Value> = {
    name: string;
    value: Value;
    errors: ValidationError<Value>[];
    firstError: ValidationError<Value> | null;
    onChange: Event<Value>;
    onBlur: Event<void>;
    errorText: (map?: ErrorTextMap) => string;
};
declare type ConnectedFields<Fields extends AnyFieldsConfigs> = {
    [K in keyof Fields]: Fields[K] extends FieldConfig<infer U> ? ConnectedField<U> : never;
};
export declare function useField<Value>(field: Field<Value>): ConnectedField<Value>;
declare type Result<Fields extends AnyFieldsConfigs> = {
    fields: ConnectedFields<Fields>;
    values: FormValues<Fields>;
    hasError: (fieldName?: keyof Fields) => boolean;
    eachValid: boolean;
    errors: (fieldName: keyof Fields) => (Fields[typeof fieldName] extends FieldConfig<infer U> ? ValidationError<U>[] : never);
    error: (fieldName: keyof Fields) => (Fields[typeof fieldName] extends FieldConfig<infer U> ? ValidationError<U> : never) | null;
    errorText: (fieldName: keyof Fields, map?: ErrorTextMap) => string;
    submit: Event<void>;
    setForm: Event<Partial<FormValues<Fields>>>;
    formValidated: Event<FormValues<Fields>>;
};
export declare function useForm<Fields extends AnyFieldsConfigs>(form: Form<Fields>): Result<Fields>;
export {};