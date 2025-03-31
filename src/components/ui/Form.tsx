'use client';

import { Slot } from '@radix-ui/react-slot';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { MapPinIcon, XIcon } from 'lucide-react';
import { useCallback, useId } from 'react';
import type { MarkerDragEvent } from 'react-map-gl/maplibre';
import { Marker } from 'react-map-gl/maplibre';

import { BaseMap } from '@/components/composites/BaseMap';
import { DatePicker } from '@/components/composites/DatePicker';
import { PasswordInput } from '@/components/composites/PasswordInput';
import { PhoneInput } from '@/components/composites/PhoneInput';
import { Button, type buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { Textarea } from '@/components/ui/Textarea';

import { type VariantProps, cx } from '@/lib/utils';

const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

type BaseFieldProps = {
  className?: string;
  label: string;
  children: React.ReactNode;
};

function BaseField({ className, label, children }: BaseFieldProps) {
  const field = useFieldContext();
  const id = useId();

  return (
    <div className={cx('realtive space-y-2', className)}>
      <Label
        className={cx(field.state.meta.errors.length > 0 && 'text-destructive')}
        htmlFor={`${id}-form-item`}
      >
        {label}
      </Label>
      <Slot
        id={`${id}-form-item`}
        aria-describedby={
          !(field.state.meta.errors.length > 0)
            ? `${id}-form-item-description`
            : `${id}-form-item-description ${id}-form-item-message`
        }
        aria-invalid={!!(field.state.meta.errors.length > 0)}
      >
        {children}
      </Slot>
      <p
        id={`${id}-form-item-description`}
        className={cx('text-muted-foreground text-sm', className)}
      />
      <p
        id={`${id}-form-item-message`}
        className={cx(
          '-translate-y-2 absolute font-medium text-[0.8rem] text-destructive',
          className,
        )}
      >
        {field.state.meta.errors.length > 0 &&
          (field.state.meta.errors[0] as { message: string }).message}
      </p>
    </div>
  );
}

type TextFieldProps = Omit<
  React.ComponentProps<typeof Input>,
  'type' | 'value' | 'onChange' | 'onBlur'
> & {
  label: string;
};

function TextField({ className, label, ...props }: TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField label={label} className={className}>
      <Input
        type='text'
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...props}
      />
    </BaseField>
  );
}

type NumberFieldProps = Omit<
  React.ComponentProps<typeof Input>,
  'type' | 'value' | 'onChange' | 'onBlur'
> & {
  label: string;
};

function NumberField({ className, label, ...props }: NumberFieldProps) {
  const field = useFieldContext<number>();

  return (
    <BaseField label={label} className={className}>
      <Input
        type='number'
        value={field.state.value}
        onChange={(e) => field.handleChange(Number(e.target.value))}
        onBlur={field.handleBlur}
        {...props}
      />
    </BaseField>
  );
}

type TextAreaFieldProps = Omit<
  React.ComponentProps<typeof Textarea>,
  'value' | 'onChange' | 'onBlur'
> & {
  label: string;
};

function TextAreaField({ className, label, ...props }: TextAreaFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField label={label} className={className}>
      <Textarea
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...props}
      />
    </BaseField>
  );
}

type Location = {
  longitude: number;
  latitude: number;
};

type MapFieldProps = {
  label: string;
  className?: string;
  zoom?: number;
  coordinates?: Location;
};

const DEFAULT_COORDINATES: Location = {
  longitude: 0,
  latitude: 0,
} as const;

function MapField({
  label,
  className,
  zoom = 4,
  coordinates = DEFAULT_COORDINATES,
}: MapFieldProps) {
  const field = useFieldContext<Location>();

  const onMarkerDrag = useCallback(
    (event: MarkerDragEvent) => {
      field.handleChange({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
      });
    },
    [field],
  );

  return (
    <BaseField label={label} className={className}>
      <div className='h-[400px] w-full rounded-md border'>
        <BaseMap
          initialViewState={{
            zoom,
            longitude: coordinates.longitude,
            latitude: coordinates.latitude,
          }}
        >
          <Marker
            longitude={field.state.value?.longitude ?? coordinates.longitude}
            latitude={field.state.value?.latitude ?? coordinates.latitude}
            anchor='bottom'
            draggable
            onDrag={onMarkerDrag}
          >
            <MapPinIcon className='-translate-y-full h-8 w-8 text-primary hover:scale-120' />
          </Marker>
        </BaseMap>
      </div>
    </BaseField>
  );
}

type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  required?: boolean;
};

function SelectField({
  label,
  className,
  placeholder = 'Select an option',
  options,
  required = true,
}: SelectFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField label={label} className={className}>
      <div className='flex gap-2'>
        <Select
          value={field.state.value ?? undefined}
          onValueChange={field.handleChange}
          required={required}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!required && field.state.value && (
          <Button
            type='button'
            variant='outline'
            size='icon'
            onClick={() => field.handleChange('')}
          >
            <XIcon className='h-4 w-4' />
          </Button>
        )}
      </div>
    </BaseField>
  );
}

type PhoneFieldProps = Omit<
  React.ComponentProps<typeof PhoneInput>,
  'value' | 'onChange' | 'onBlur'
> & {
  label: string;
};

function PhoneField({ className, label, ...props }: PhoneFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField label={label} className={className}>
      <PhoneInput
        value={field.state.value}
        onChange={(value) => field.handleChange(value)}
        onBlur={field.handleBlur}
        {...props}
      />
    </BaseField>
  );
}

type PasswordFieldProps = Omit<
  React.ComponentProps<typeof PasswordInput>,
  'value' | 'onChange' | 'onBlur'
> & {
  label: string;
};

function PasswordField({ className, label, ...props }: PasswordFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField label={label} className={className}>
      <PasswordInput
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...props}
      />
    </BaseField>
  );
}

type DateFieldProps = Omit<
  React.ComponentProps<typeof DatePicker>,
  'date' | 'setDate' | 'onBlur'
> & {
  label: string;
};

function DateField({ className, label, ...props }: DateFieldProps) {
  const field = useFieldContext<Date>();

  return (
    <BaseField label={label} className={className}>
      <DatePicker
        date={field.state.value}
        setDate={(date: Date) => field.handleChange(date)}
        onBlur={field.handleBlur}
        {...props}
      />
    </BaseField>
  );
}

type SubmitButtonProps = Omit<React.ComponentProps<typeof Button>, 'type'> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

function SubmitButton({
  children,
  className,
  loading,
  ...props
}: SubmitButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={(state) => [
        state.isSubmitting,
        state.isPristine,
        state.isValidating,
      ]}
    >
      {([isSubmitting, isPristine, isValidating]) => (
        <Button
          className={cx('min-w-28', className)}
          type='submit'
          disabled={isSubmitting ?? isPristine ?? isValidating ?? loading}
          {...props}
        >
          {isSubmitting || isValidating || loading ? (
            <Spinner size='sm' />
          ) : (
            children
          )}
        </Button>
      )}
    </form.Subscribe>
  );
}

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
    TextAreaField,
    MapField,
    SelectField,
    PhoneField,
    PasswordField,
    DateField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export { useAppForm as useForm };
