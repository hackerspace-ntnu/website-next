'use client';

import { Slot } from '@radix-ui/react-slot';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { MapPinIcon, XIcon } from 'lucide-react';
import { Fragment, useCallback, useId } from 'react';
import type { MarkerDragEvent } from 'react-map-gl/maplibre';
import { Marker } from 'react-map-gl/maplibre';

import { BaseMap } from '@/components/composites/BaseMap';
import { DatePicker } from '@/components/composites/DatePicker';
import { PasswordInput } from '@/components/composites/PasswordInput';
import { PhoneInput } from '@/components/composites/PhoneInput';
import { Button, type buttonVariants } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSeparator,
  InputOtpSlot,
} from '@/components/ui/InputOtp';
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
  labelSibling?: React.ReactNode;
  children: React.ReactNode;
};

function BaseField({
  className,
  label,
  labelSibling,
  children,
}: BaseFieldProps) {
  const field = useFieldContext();
  const id = useId();

  const labelElement = (
    <Label
      className={cx(field.state.meta.errors.length > 0 && 'text-destructive')}
      htmlFor={`${id}-form-item`}
    >
      {label}
    </Label>
  );

  return (
    <div className={cx('relative space-y-2', className)}>
      {labelSibling ? (
        <div className='flex items-center justify-between'>
          {labelElement}
          {labelSibling}
        </div>
      ) : (
        labelElement
      )}
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
  labelSibling?: React.ReactNode;
};

function TextField({
  className,
  label,
  labelSibling,
  ...props
}: TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField label={label} labelSibling={labelSibling} className={className}>
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
  labelSibling?: React.ReactNode;
};

function NumberField({
  className,
  label,
  labelSibling,
  ...props
}: NumberFieldProps) {
  const field = useFieldContext<number>();

  return (
    <BaseField label={label} labelSibling={labelSibling} className={className}>
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
  labelSibling?: React.ReactNode;
};

function TextAreaField({
  className,
  label,
  labelSibling,
  ...props
}: TextAreaFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField label={label} labelSibling={labelSibling} className={className}>
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
  labelSibling?: React.ReactNode;
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
  labelSibling,
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
    <BaseField label={label} labelSibling={labelSibling} className={className}>
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
  labelSibling?: React.ReactNode;
};

function SelectField({
  label,
  className,
  placeholder = 'Select an option',
  options,
  required = true,
  labelSibling,
}: SelectFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField label={label} labelSibling={labelSibling} className={className}>
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
  labelSibling?: React.ReactNode;
};

function PhoneField({
  className,
  label,
  labelSibling,
  ...props
}: PhoneFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField label={label} labelSibling={labelSibling} className={className}>
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
  labelSibling?: React.ReactNode;
};

function PasswordField({
  className,
  label,
  labelSibling,
  ...props
}: PasswordFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField label={label} labelSibling={labelSibling} className={className}>
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
  labelSibling?: React.ReactNode;
};

function DateField({
  className,
  label,
  labelSibling,
  ...props
}: DateFieldProps) {
  const field = useFieldContext<Date>();

  return (
    <BaseField label={label} labelSibling={labelSibling} className={className}>
      <DatePicker
        date={field.state.value}
        setDate={(date: Date) => field.handleChange(date)}
        onBlur={field.handleBlur}
        {...props}
      />
    </BaseField>
  );
}

type OTPFieldProps = Omit<
  React.ComponentPropsWithoutRef<typeof InputOtp>,
  'value' | 'onChange' | 'onBlur' | 'maxLength' | 'render'
> & {
  label: string;
  labelSibling?: React.ReactNode;
  slots?: number;
  groups?: number[];
};

function OTPField({
  className,
  label,
  labelSibling,
  slots = 6,
  groups = [],
  ...props
}: OTPFieldProps) {
  const field = useFieldContext<string>();

  const renderSlots = () => {
    if (groups.length === 0) {
      return (
        <InputOtpGroup>
          {Array.from({ length: slots }).map((_, index) => (
            <InputOtpSlot key={`slot-${field.name}-${index}`} index={index} />
          ))}
        </InputOtpGroup>
      );
    }

    return groups.map((groupIndex, groupSize) => (
      <Fragment key={`group-${field.name}-${groupIndex}`}>
        {groupIndex > 0 && <InputOtpSeparator />}
        <InputOtpGroup>
          {Array.from({ length: groupSize }).map((_, slotIndex) => {
            const globalIndex =
              groups.slice(0, groupIndex).reduce((sum, size) => sum + size, 0) +
              slotIndex;
            return (
              <InputOtpSlot
                key={`slot-${field.name}-${globalIndex}`}
                index={globalIndex}
              />
            );
          })}
        </InputOtpGroup>
      </Fragment>
    ));
  };

  return (
    <BaseField label={label} labelSibling={labelSibling} className={className}>
      <InputOtp
        value={field.state.value}
        onChange={(value) => field.handleChange(value)}
        onBlur={field.handleBlur}
        maxLength={slots}
        {...props}
      >
        {renderSlots()}
      </InputOtp>
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
            <Spinner size='sm' className='text-primary-foreground' />
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
    BaseField,
    TextField,
    NumberField,
    TextAreaField,
    MapField,
    SelectField,
    PhoneField,
    PasswordField,
    DateField,
    OTPField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export { useAppForm as useForm };
