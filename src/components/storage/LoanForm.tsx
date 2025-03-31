'use client';

import { useForm } from '@/components/ui/Form';
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
  const form = useForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      phone: '',
      returnBy: new Date(),
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='relative space-y-6 xs:space-y-3'
    >
      <form.AppForm>
        <form.SubmitButton className='mx-auto flex w-fit'>
          {t.submit}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}

export { LoanForm };
