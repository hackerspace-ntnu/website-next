'use client';

import type * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  type FormOptions,
  type ValidationError,
  type Validator,
  useForm,
} from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { createContext, useContext, useId } from 'react';
import type { z } from 'zod';

import { cx } from '@/lib/utils';

import { Label } from '@/components/ui/Label';

/**
 * This is a completely custom component and not the Form component from shadcn. This is because we are using Tanstack Form instead of React Hook Form.
 * Short explanation: Tanstack Form is a much better form library than React Hook Form. It has better validation, better performance, and better documentation.
 * (The last sentence was ChatGPT's opinion, the real reason is that React hook form does not support async validation which is nice to have)
 * On how to use this look where it has been used in the codebase or ask Michael.
 */
function useFormWithZod<
  TFormSchema extends z.ZodType,
  TFormData extends object = z.infer<TFormSchema>,
>(
  schema: TFormSchema,
  options?: Omit<
    FormOptions<TFormData, Validator<TFormData, TFormSchema>>,
    'validatorAdapter'
  >,
) {
  const form = useForm({
    validatorAdapter: zodValidator(),
    ...options,
    validators: {
      ...options?.validators,
      onChange: schema,
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    void form.handleSubmit();
  }

  return {
    ...form,
    handleSubmit,
  };
}

const Form = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) => {
  return <form className={cx('relative space-y-6', className)} {...props} />;
};

type FormItemContextValue = {
  id: string;
  errors: ValidationError[];
  isSubmitted: boolean;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = ({
  className,
  errors,
  isSubmitted = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  errors: ValidationError[];
  isSubmitted?: boolean;
}) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id, errors, isSubmitted }}>
      <div className={cx('relative space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
};

const useFormItem = () => {
  const itemContext = useContext(FormItemContext);

  if (!itemContext) {
    throw new Error('useFormField should be used within a FormItem');
  }

  const { id, errors, isSubmitted } = itemContext;

  return {
    id,
    errors,
    isSubmitted,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  };
};

const FormLabel = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) => {
  const { formItemId, errors, isSubmitted } = useFormItem();

  return (
    <Label
      className={cx(
        isSubmitted && errors.length > 0 && 'text-destructive',
        className,
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
};

const FormControl = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Slot>) => {
  const { formItemId, formDescriptionId, formMessageId, errors, isSubmitted } =
    useFormItem();

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !(errors.length > 0)
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!(isSubmitted && errors.length > 0)}
      {...props}
    />
  );
};

const FormDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { formDescriptionId } = useFormItem();

  return (
    <p
      id={formDescriptionId}
      className={cx('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
};

const FormMessage = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { formMessageId, errors, isSubmitted } = useFormItem();
  const body =
    isSubmitted && errors.length > 0
      ? String(errors[0]).split(', ')[0]
      : children;

  if (!body) {
    return null;
  }

  return (
    <p
      id={formMessageId}
      className={cx(
        '-translate-y-2 absolute font-medium text-[0.8rem] text-destructive',
        className,
      )}
      {...props}
    >
      {body}
    </p>
  );
};

export {
  useFormWithZod as useForm,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};
