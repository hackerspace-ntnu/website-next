'use client';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, addWeeks, endOfWeek } from 'date-fns';
import { useForm } from 'react-hook-form';
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      returnBy: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Add new loan to database
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.phoneNumber}</FormLabel>
                <FormControl>
                  <Input placeholder='420 69 420' {...field} />
                </FormControl>
                <FormDescription>{t.phoneNumberDescription}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='returnBy'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.returnBy}</FormLabel>
                <FormControl>
                  <Calendar
                    className='mx-auto w-fit rounded-md border'
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
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
          />
          <Button type='submit' className='mx-auto flex w-fit'>
            {t.submit}
          </Button>
        </form>
      </Form>
    </>
  );
}

export { LoanForm };
