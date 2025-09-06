'use client';

import { useTranslations } from 'next-intl';
import { type FormEvent, useEffect, useState } from 'react';
import { DateTimePicker } from '@/components/composites/DateTimePicker';
// import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { useAppForm } from '@/components/ui/Form';

type Reservation = {
  name: string;
  phoneNr: string;
  email: string;
  start: Date | string;
  end: Date | string;
};

type ReservationFormProps = {
  start: Date;
  end: Date;
  mode: 'create' | 'view';
  onSubmit: (data: Reservation) => void;
  onCancel: () => void;
  onDelete?: () => void;
  defaultValues?: Omit<Reservation, 'start' | 'end'>;
};

function ReservationForm({
  start,
  end,
  mode,
  onSubmit,
  onCancel,
  onDelete,
  defaultValues,
}: ReservationFormProps) {
  const t = useTranslations('reservations');
  /*   const formSchema = z.object({
    name: z.string().min(1, t('form.formSchema.nameReq')),
    mobilNr: z.string().min(1, t('form.formSchema.phoneNrReq')),
    email: z.string().min(1, t('form.formSchema.emailReq')),
    start: z.date().or(z.string()),
    end: z.date().or(z.string()),
  }); */
  const [startDate, setStartDate] = useState<Date>(start);
  const [endDate, setEndDate] = useState<Date>(end);
  const form = useAppForm({
    defaultValues: {
      name: defaultValues?.name ?? '',
      phoneNr: defaultValues?.phoneNr ?? '',
      email: defaultValues?.email ?? '',
      start: start || new Date(),
      end: end || new Date(),
    },
  });

  /** Incase the person decides to change the time in the popup dialog */
  useEffect(() => {
    setStartDate(start);
    setEndDate(end);
  }, [start, end]);
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      onSubmit({
        name: form.getFieldValue('name'),
        phoneNr: form.getFieldValue('phoneNr'),
        email: form.getFieldValue('email'),
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      });
    } catch (_error) {
      // some type of toast/alert here
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className='w-full space-y-4 p-4'>
      <form.AppField name='name'>
        {(field) => (
          <field.TextField
            label={t('form.name')}
            placeholder={t('form.namePlaceholder')}
          />
        )}
      </form.AppField>

      <form.AppField name='email'>
        {(field) => (
          <field.TextField
            label={t('form.email')}
            placeholder={t('form.emailPlaceholder')}
          />
        )}
      </form.AppField>

      <form.AppField name='phoneNr'>
        {(field) => (
          <field.PhoneField
            label={t('form.phoneNr')}
            placeholder={t('form.phoneNrPlaceholder')}
            defaultCountry='NO'
            inputMode='tel'
          />
        )}
      </form.AppField>

      <form.AppField name='start'>
        {(field) => (
          <DateTimePicker
            value={startDate}
            onChange={(date) => {
              if (date) {
                setStartDate(date);
                field.handleChange(date);
              }
            }}
            hourCycle={24}
            displayFormat={{
              hour24: 'dd.MM.yyyy HH:mm',
            }}
            granularity='minute'
          />
        )}
      </form.AppField>

      <form.AppField name='end'>
        {(field) => (
          <DateTimePicker
            value={endDate}
            onChange={(date) => {
              if (date) {
                setEndDate(date);
                field.handleChange(date);
              }
            }}
            hourCycle={24}
            displayFormat={{
              hour24: 'dd.MM.yyyy HH:mm',
            }}
            granularity='minute'
          />
        )}
      </form.AppField>

      <div className='flex justify-end gap-2'>
        <Button variant='outline' type='button' onClick={onCancel}>
          {t('form.cancel')}
        </Button>
        {mode === 'view' && (
          <Button variant='destructive' type='submit' onClick={onDelete}>
            {t('form.delete')}
          </Button>
        )}
        <Button type='submit'>
          {mode === 'create' ? t('form.create') : t('form.save')}
        </Button>
      </div>
    </form>
  );
}

export { ReservationForm };
