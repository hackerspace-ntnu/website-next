'use client';

import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';
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
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  returnBy: z.date().min(new Date()),
});

type LoanFormParams = {
  t: {
    borrowNow: string;
    name: string;
    nameDescription: string;
    email: string;
    emailExample: string;
    phoneNumber: string;
    phoneNumberDescription: string;
    returnBy: string;
    returnByDescription: string;
    submit: string;
  };
};

function LoanForm({ t }: LoanFormParams) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
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
      <h2 className='text-center'>{t.borrowNow}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='my-5 space-y-8'>
          <div className='grid grid-cols-3 space-x-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.name} {...field} />
                  </FormControl>
                  <FormDescription>{t.nameDescription}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.email}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.emailExample} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.phoneNumber}</FormLabel>
                  <FormControl>
                    <Input placeholder='123 456 789' {...field} />
                  </FormControl>
                  <FormDescription>{t.phoneNumberDescription}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='mx-auto max-w-[280px]'>
            <FormField
              control={form.control}
              name='returnBy'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.returnBy}</FormLabel>
                  <FormControl>
                    <DatePicker
                      buttonClassName='flex'
                      dateCallback={field.onChange}
                      disabled={{ before: new Date() }}
                    />
                  </FormControl>
                  <FormDescription>{t.returnByDescription}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='mx-auto flex w-fit'>
            {t.submit}
          </Button>
        </form>
      </Form>
    </>
  );
}

export { LoanForm };
