import {
  FieldError,
  FieldPath,
  FieldValues,
  get,
  UseFormReturn,
  useFormState,
} from 'react-hook-form'

export function useError<
  TValues extends FieldValues,
  TPath extends FieldPath<TValues>,
>(form: UseFormReturn<TValues>, path: TPath): FieldError | null {
  const { errors } = useFormState({
    control: form.control,
    name: path,
  })

  return get(errors, path, null)
}
