'use client';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { addDays, addWeeks, endOfWeek } from 'date-fns';
import { z } from 'zod';

const formSchema = z.object({
  phone: z.string().min(1),
  returnBy: z.date().min(new Date()),
});

type LoanFormProps = {
  t: {
    borrowNow: string;
    name: string;
    email: string;
    phoneNumber: string;
    phoneNumberDescription: string;
    returnBy: string;
    returnByDescription: string;
    submit: string;
  };
};

function LoanForm({ t }: LoanFormProps) {
  const form = useForm(formSchema, {
    defaultValues: {
      phone: '',
      returnBy: new Date(),
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  return (
    <Form className='xs:space-y-3' onSubmit={form.handleSubmit}>
      <form.Field name='phone'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t.phoneNumber}</FormLabel>
            <FormControl>
              <Input
                placeholder='420 69 420'
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormDescription>{t.phoneNumberDescription}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='returnBy'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t.returnBy}</FormLabel>
            <FormControl>
              <Calendar
                className='mx-auto w-fit rounded-md border'
                mode='single'
                selected={field.state.value}
                onSelect={(date) => field.handleChange(date || new Date())}
                showOutsideDays={false}
                disabled={{
                  before: new Date(),
                  after: addDays(endOfWeek(addWeeks(new Date(), 2)), 2),
                }}
              />
            </FormControl>
            <FormDescription>{t.returnByDescription}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Subscribe selector={(state) => [state.canSubmit]}>
        {([canSubmit]) => (
          <Button
            type='submit'
            className='mx-auto flex w-fit'
            disabled={!canSubmit}
          >
            {t.submit}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
}

export { LoanForm };
