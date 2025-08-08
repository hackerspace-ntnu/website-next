'use client';

import { Slot } from '@radix-ui/react-slot';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { MapPinIcon, XIcon } from 'lucide-react';
import type { Value } from 'platejs';
import { Plate, usePlateEditor } from 'platejs/react';
import type React from 'react';
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { DateRange } from 'react-day-picker';
import type { MarkerDragEvent } from 'react-map-gl/maplibre';
import { Marker } from 'react-map-gl/maplibre';
import type { ZodError } from 'zod';
import { BaseMap } from '@/components/composites/BaseMap';
import { DatePicker } from '@/components/composites/DatePicker';
import { FileUpload } from '@/components/composites/FileUpload';
import { PasswordInput } from '@/components/composites/PasswordInput';
import { PhoneInput } from '@/components/composites/PhoneInput';
import { Button, type buttonVariants } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Checkbox } from '@/components/ui/Checkbox';
import { DateTimePicker } from '@/components/ui/DateTimePicker';
import { Input } from '@/components/ui/Input';
import {
  InputOtp,
  InputOtpGroup,
  InputOtpSeparator,
  InputOtpSlot,
} from '@/components/ui/InputOtp';
import { Label } from '@/components/ui/Label';
import { Editor, EditorContainer } from '@/components/ui/plate/Editor';
import { EditorKit } from '@/components/ui/plate/kits/EditorKit';
import type { PlateEditor } from '@/components/ui/plate/PlateEditor';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { Textarea } from '@/components/ui/Textarea';
import { cx, type VariantProps } from '@/lib/utils';
import { fileToBase64String } from '@/lib/utils/files';

const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

type BaseFieldProps = {
  className?: string;
  label: string;
  labelVisible?: boolean;
  description?: string;
  labelSibling?: React.ReactNode;
  children: React.ReactNode;
};

function BaseField({
  className,
  label,
  labelVisible = true,
  labelSibling,
  description,
  children,
}: BaseFieldProps) {
  const field = useFieldContext();
  const id = useId();

  const labelElement =
    label.length > 0 ? (
      <Label
        className={cx(
          'mb-2 block',
          field.state.meta.errors.length > 0 && 'text-destructive',
          !labelVisible && 'sr-only',
        )}
        htmlFor={`${id}-form-item`}
      >
        {label}
      </Label>
    ) : undefined;

  return (
    <div className={cx('relative space-y-2', className)}>
      {labelSibling ? (
        <div className='flex items-center justify-between'>
          {labelVisible && labelElement}
          {labelVisible && labelSibling}
        </div>
      ) : (
        labelVisible && labelElement
      )}
      {description && (
        <p
          id={`${id}-form-item-description`}
          className={cx('text-muted-foreground text-sm', className)}
        >
          {description}
        </p>
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
  labelVisible?: boolean;
  labelSibling?: React.ReactNode;
  description?: string;
};

function TextField({
  className,
  label,
  labelVisible,
  labelSibling,
  description,
  ...props
}: TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
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
  labelVisible?: boolean;
  labelSibling?: React.ReactNode;
  description?: string;
};

function NumberField({
  className,
  label,
  labelVisible,
  labelSibling,
  description,
  ...props
}: NumberFieldProps) {
  const field = useFieldContext<number>();

  return (
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
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
  labelVisible?: boolean;
  labelSibling?: React.ReactNode;
  description?: string;
};

function TextAreaField({
  className,
  label,
  labelVisible,
  labelSibling,
  description,
  ...props
}: TextAreaFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
      <Textarea
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...props}
      />
    </BaseField>
  );
}

type CheckboxFieldProps = Omit<
  React.ComponentProps<typeof Checkbox>,
  'checked' | 'value' | 'onCheckedChange' | 'onBlur'
> & {
  label: string;
  labelVisible?: boolean;
  description?: string;
};

function CheckboxField({
  className,
  label,
  labelVisible = true,
  description,
  ...props
}: CheckboxFieldProps) {
  const field = useFieldContext<boolean>();
  const id = useId();

  const labelElement =
    label.length > 0 ? (
      <Label
        className={cx(
          'block',
          field.state.meta.errors.length > 0 && 'text-destructive',
        )}
        htmlFor={`${id}-form-item`}
      >
        {label}
      </Label>
    ) : undefined;

  return (
    <div className={className}>
      <div className='mb-2 flex items-center gap-2'>
        <Checkbox
          id={`${id}-form-item`}
          aria-describedby={
            !(field.state.meta.errors.length > 0)
              ? `${id}-form-item-description`
              : `${id}-form-item-description ${id}-form-item-message`
          }
          aria-invalid={!!(field.state.meta.errors.length > 0)}
          checked={field.state.value}
          onCheckedChange={(value) =>
            field.handleChange(value !== 'indeterminate' ? value : false)
          }
          onBlur={field.handleBlur}
          {...props}
        />
        {labelVisible && labelElement}
      </div>
      {description && (
        <p
          id={`${id}-form-item-description`}
          className={cx('text-muted-foreground text-sm', className)}
        >
          {description}
        </p>
      )}
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

type Location = {
  longitude: number;
  latitude: number;
};

type MapFieldProps = {
  label: string;
  labelVisible?: boolean;
  className?: string;
  zoom?: number;
  coordinates?: Location;
  labelSibling?: React.ReactNode;
  description?: string;
};

const DEFAULT_COORDINATES: Location = {
  longitude: 0,
  latitude: 0,
} as const;

function MapField({
  label,
  labelVisible,
  className,
  zoom = 4,
  coordinates = DEFAULT_COORDINATES,
  labelSibling,
  description,
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
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
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
  label: React.ReactNode;
  value: string;
};

type SelectFieldProps = {
  label: string;
  labelVisible?: boolean;
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  required?: boolean;
  labelSibling?: React.ReactNode;
  description?: string;
};

function SelectField({
  label,
  labelVisible,
  className,
  placeholder = 'Select an option',
  options,
  required = true,
  labelSibling,
  description,
}: SelectFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
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
  labelVisible?: boolean;
  labelSibling?: React.ReactNode;
  description?: string;
};

function PhoneField({
  className,
  label,
  labelVisible,
  labelSibling,
  description,
  ...props
}: PhoneFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
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
  labelVisible?: boolean;
  labelSibling?: React.ReactNode;
  description?: string;
};

function PasswordField({
  className,
  label,
  labelVisible,
  labelSibling,
  description,
  ...props
}: PasswordFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
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
  labelVisible?: boolean;
  labelSibling?: React.ReactNode;
  description?: string;
};

function DateField({
  className,
  label,
  labelVisible,
  labelSibling,
  description,
  ...props
}: DateFieldProps) {
  const field = useFieldContext<Date>();

  return (
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
      <DatePicker
        date={field.state.value}
        setDate={(date) => field.handleChange(date)}
        onBlur={field.handleBlur}
        {...props}
      />
    </BaseField>
  );
}

type DateTimeFieldProps = Omit<
  React.ComponentProps<typeof DateTimePicker>,
  'onChange'
> & {
  label: string;
  labelVisible?: boolean;
  labelSibling?: React.ReactNode;
  description?: string;
};

function DateTimeField({
  className,
  label,
  labelVisible,
  labelSibling,
  description,
  ...props
}: DateTimeFieldProps) {
  const field = useFieldContext<Date>();

  return (
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
      <DateTimePicker
        onChange={(date) => date && field.handleChange(date)}
        value={field.state.value}
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
  labelVisible?: boolean;
  labelSibling?: React.ReactNode;
  slots?: number;
  groups?: number[];
  description?: string;
};

function OTPField({
  className,
  label,
  labelVisible,
  labelSibling,
  slots = 6,
  groups = [],
  description,
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
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
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

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupFieldProps = {
  label: string;
  labelVisible?: boolean;
  className?: string;
  options: RadioOption[];
  labelSibling?: React.ReactNode;
  description?: string;
};

function RadioGroupField({
  label,
  labelVisible,
  className,
  options,
  labelSibling,
  description,
}: RadioGroupFieldProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
      <RadioGroup
        onValueChange={field.handleChange}
        defaultValue={field.state.value}
        className='mt-4 flex flex-col space-y-2'
      >
        {options.map((option) => (
          <div key={option.value} className='flex items-center space-x-3'>
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </BaseField>
  );
}

type FileUploadFieldProps = Omit<
  React.ComponentProps<typeof FileUpload>,
  'onFilesUploaded'
> & {
  label: string;
  labelVisible?: boolean;
  labelSibling?: React.ReactNode;
  description?: string;
  className?: string;
  validator?: (value: string) => { success: boolean; error?: ZodError };
};

function FileUploadField({
  className,
  label,
  labelVisible,
  labelSibling,
  description,
  ...props
}: FileUploadFieldProps) {
  const field = useFieldContext<string | null>();

  const handleFilesUploaded = async (files: File | File[] | null) => {
    if (!files || (Array.isArray(files) && files.length === 0)) {
      field.handleChange(null);
      return;
    }

    if (Array.isArray(files)) {
      const base64Strings = await Promise.all(
        files.map((file) => fileToBase64String(file)),
      );
      field.handleChange(base64Strings.join(','));
    } else {
      const base64String = await fileToBase64String(files);
      field.handleChange(base64String);
    }
  };

  return (
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
      <FileUpload onFilesUploaded={handleFilesUploaded} {...props} />
    </BaseField>
  );
}

type CurrencyFieldProps = Omit<
  React.ComponentProps<typeof Input>,
  'type' | 'value' | 'onChange' | 'onBlur'
> & {
  label: string;
  labelVisible?: boolean;
  currency?: string;
  locale?: string;
};

function CurrencyField({
  className,
  label,
  labelVisible,
  currency = 'NOK',
  locale = 'nb-NO',
  ...props
}: CurrencyFieldProps) {
  const field = useFieldContext<number | null>();
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { decimalSeparator, groupSeparator } = useMemo(() => {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.5);
    return {
      decimalSeparator: parts.find((p) => p.type === 'decimal')?.value ?? '.',
      groupSeparator: parts.find((p) => p.type === 'group')?.value ?? ',',
    };
  }, [locale]);

  const formatCurrency = useCallback(
    (value: number | null | undefined): string => {
      if (value === null || value === undefined || Number.isNaN(value)) {
        return '';
      }
      try {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);
      } catch (error) {
        console.error('Error formatting currency:', error);
        return `${value.toFixed(2)} (Error)`;
      }
    },
    [locale, currency],
  );

  const parseCurrency = useCallback(
    (value: string): number | null => {
      if (typeof value !== 'string' || value.trim() === '') {
        return null;
      }

      const valueWithoutGroupSeparators = value.replaceAll(groupSeparator, '');

      const normalizedValue = valueWithoutGroupSeparators.replace(
        decimalSeparator,
        '.',
      );

      const cleanedValue = normalizedValue.replace(/[^-0-9.]/g, '');

      if (
        cleanedValue === '' ||
        cleanedValue === '-' ||
        cleanedValue === '.' ||
        cleanedValue.split('.').length > 2 ||
        (cleanedValue.includes('-') && !cleanedValue.startsWith('-'))
      ) {
        if (cleanedValue === '-' || cleanedValue === '.') return null;
        return null;
      }

      const numberValue = Number.parseFloat(cleanedValue);

      return Number.isNaN(numberValue) ? null : numberValue;
    },
    [groupSeparator, decimalSeparator],
  );

  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      const newValue = formatCurrency(field.state.value);
      requestAnimationFrame(() => {
        setInputValue(newValue);
      });
    }
  }, [field.state.value, formatCurrency]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value;
    setInputValue(rawValue);

    const numericValue = parseCurrency(rawValue);

    if (numericValue !== null || rawValue === '') {
      field.handleChange(numericValue);
    }
  }

  function handleFocus() {
    const numericValue = field.state.value;
    if (numericValue !== null && numericValue !== undefined) {
      const plainNumberString = numericValue
        .toFixed(2)
        .replace('.', decimalSeparator);
      setInputValue(plainNumberString);
    } else {
      setInputValue('');
    }
    requestAnimationFrame(() => {
      inputRef.current?.select();
    });
  }

  function handleBlur() {
    const numericValue = parseCurrency(inputValue);
    field.handleChange(numericValue);
    const formattedValue = formatCurrency(numericValue);
    setInputValue(formattedValue);
    field.handleBlur();
  }

  return (
    <BaseField label={label} className={className} labelVisible={labelVisible}>
      <Input
        ref={inputRef}
        type='text'
        inputMode='decimal'
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={formatCurrency(0)}
        {...props}
      />
    </BaseField>
  );
}

// Omit wasn't used to skip onSelect and onDayBlur,
// because it messes up the DayPickerProps
// (which are dynamic based on whether
// we choose the mode to be 'single', 'multiple' or 'range')
type CalendarFieldProps = React.ComponentProps<typeof Calendar> & {
  label: string;
  labelVisible?: boolean;
  labelSibling?: React.ReactNode;
  description?: string;
  calendarClassName?: string;
};

function CalendarField({
  className,
  calendarClassName,
  label,
  labelVisible,
  labelSibling,
  description,
  ...props
}: CalendarFieldProps) {
  const field = useFieldContext<Date | Date[] | DateRange | undefined>();

  return (
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
      <Calendar
        // @ts-expect-error We cannot be sure of what mode we're using
        onSelect={(selected) => {
          field.handleChange(selected);
        }}
        className={cx('rounded-md border', calendarClassName)}
        onDayBlur={field.handleBlur}
        {...props}
      />
    </BaseField>
  );
}

type SubmitButtonProps = Omit<React.ComponentProps<typeof Button>, 'type'> &
  VariantProps<typeof buttonVariants> & {
    spinnerClassName?: string;
    loading?: boolean;
  };

function SubmitButton({
  children,
  className,
  spinnerClassName,
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
          disabled={isSubmitting || isPristine || isValidating || loading}
          {...props}
        >
          {isSubmitting || isValidating || loading ? (
            <Spinner
              size='sm'
              className={cx('text-primary-foreground', spinnerClassName)}
            />
          ) : (
            children
          )}
        </Button>
      )}
    </form.Subscribe>
  );
}

type EditorFieldProps = Omit<
  React.ComponentProps<typeof PlateEditor>,
  'value' | 'onChange' | 'onBlur'
> & {
  className?: string;
  label: string;
  labelVisible?: boolean;
  labelSibling?: React.ReactNode;
  description?: string;
  initialValue?: Value;
};

function EditorField({
  className,
  label,
  labelVisible,
  labelSibling,
  description,
  initialValue,
  ...props
}: EditorFieldProps) {
  const field = useFieldContext<Value>();
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: initialValue ?? [],
    ...props.initOptions,
  });

  return (
    <BaseField
      label={label}
      labelVisible={labelVisible}
      labelSibling={labelSibling}
      className={className}
      description={description}
    >
      <Plate editor={editor} {...props.plateOptions}>
        <EditorContainer
          className={cx(
            'rounded-lg border p-1',
            props.containerOptions?.className,
          )}
          {...props.containerOptions}
        >
          <Editor
            variant={props.variant}
            onBlur={() => {
              editor?.children && field.handleChange(editor.children);
            }}
            {...props.editorOptions}
          />
        </EditorContainer>
      </Plate>
    </BaseField>
  );
}

const { useAppForm } = createFormHook({
  fieldComponents: {
    BaseField,
    TextField,
    NumberField,
    TextAreaField,
    CheckboxField,
    MapField,
    SelectField,
    PhoneField,
    PasswordField,
    DateField,
    DateTimeField,
    OTPField,
    RadioGroupField,
    FileUploadField,
    CurrencyField,
    CalendarField,
    EditorField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export { useAppForm };
