'use client';

import { Button } from '@/components/ui/Button';
import { DateTimePicker } from '@/components/ui/DateTimePicker';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { type FormEvent, useEffect, useState } from 'react';
import { z } from 'zod';

type Reservation = {
  navn: string;
  mobilNr: string;
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

export function ReservationForm({
  start,
  end,
  mode,
  onSubmit,
  onCancel,
  onDelete,
  defaultValues,
}: ReservationFormProps) {
  const t = useTranslations('reservations');
  const formSchema = z.object({
    navn: z.string().min(1, t('form.formSchema.navnReq')),
    mobilNr: z.string().min(1, t('form.formSchema.phoneNrReq')),
    email: z.string().min(1, t('form.formSchema.emailReq')),
    start: z.date().or(z.string()),
    end: z.date().or(z.string()),
  });
  const [startDate, setStartDate] = useState<Date>(start);
  const [endDate, setEndDate] = useState<Date>(end);
  const form = useForm(formSchema, {
    defaultValues: {
      navn: defaultValues?.navn ?? '',
      mobilNr: defaultValues?.mobilNr ?? '',
      email: defaultValues?.email ?? '',
      start: start || new Date(),
      end: end || new Date(),
    },
  });

  /** I tilfelle personen endrer tiden igjen i formen */
  useEffect(() => {
    setStartDate(start);
    setEndDate(end);
  }, [start, end]);

  /** FormEvent<HTMLFormElement>, fordi onSubmit tar inn den her typen */
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      onSubmit({
        navn: form.getFieldValue('navn'),
        mobilNr: form.getFieldValue('mobilNr'),
        email: form.getFieldValue('email'),
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      });
    } catch (error) {
      // noe toast/alert her
    }
  }

  return (
    <Form onSubmit={handleFormSubmit} className='w-full space-y-4 p-4'>
      <form.Field name='navn'>
        {(field) => (
          <FormItem errors={[]}>
            <FormLabel>{t('form.name')}</FormLabel>
            <FormControl>
              <Input
                placeholder={t('form.namePlaceholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormControl>
            <FormMessage>{field.state.meta.errors?.[0]}</FormMessage>
          </FormItem>
        )}
      </form.Field>

      <form.Field name='email'>
        {(field) => (
          <FormItem errors={[]}>
            <FormLabel>{t('form.email')}</FormLabel>
            <FormControl>
              <Input
                type='email'
                placeholder={t('form.emailPlaceholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormControl>
            <FormMessage>{field.state.meta.errors?.[0]}</FormMessage>
          </FormItem>
        )}
      </form.Field>

      <form.Field name='mobilNr'>
        {(field) => (
          <FormItem errors={[]}>
            <FormLabel>{t('form.phoneNr')}</FormLabel>
            <FormControl>
              <Input
                placeholder={t('form.phoneNrPlaceholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormControl>
            <FormMessage>{field.state.meta.errors?.[0]}</FormMessage>
          </FormItem>
        )}
      </form.Field>

      <form.Field name='start'>
        {(field) => (
          <FormItem errors={[]}>
            <FormLabel>{t('form.startTime')}</FormLabel>
            <FormControl>
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
            </FormControl>
            <FormMessage>{field.state.meta.errors?.[0]}</FormMessage>
          </FormItem>
        )}
      </form.Field>

      <form.Field name='end'>
        {(field) => (
          <FormItem errors={[]}>
            <FormLabel>{t('form.endTime')}</FormLabel>
            <FormControl>
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
            </FormControl>
            <FormMessage>{field.state.meta.errors?.[0]}</FormMessage>
          </FormItem>
        )}
      </form.Field>

      <div className='flex justify-end space-x-2'>
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
    </Form>
  );
}
