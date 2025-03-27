'use client';

import type { CartItem } from '@/components/storage/types';
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
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter } from '@/lib/locale/navigation';
import { loanFormSchema } from '@/validations/storage/loanFormSchema';
import { addDays, addWeeks, differenceInDays, endOfWeek } from 'date-fns';
import { useTranslations } from 'next-intl';
import type { DateRange } from 'react-day-picker';

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
    success: string;
  };
};

function LoanForm({ t }: LoanFormProps) {
  const [cart, setCart, isLoading] =
    useLocalStorage<CartItem[]>('shopping-cart');
  const borrowItemsMutation = api.storage.borrowItems.useMutation({
    onSuccess: () => toast.success(t.success),
  });
  const router = useRouter();

  const form = useForm(loanFormSchema(useTranslations()), {
    defaultValues: {
      dates: {
        from: new Date(),
        to: addDays(new Date(), 1),
      } as DateRange,
    },
    onSubmit: ({ value }) => {
      if (!cart || isLoading) return;
      borrowItemsMutation.mutate(
        cart.map((i) => ({
          id: i.id,
          amount: i.amount,
          borrowedAt: value.dates.from ?? new Date(),
          returnBy: value.dates.to ?? addDays(new Date(), 1),
        })),
      );
      setCart(null);
      router.push('/storage');
    },
  });

  return (
    <Form className='xs:space-y-3' onSubmit={form.handleSubmit}>
      <form.Field name='dates'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t.returnBy}</FormLabel>
            <FormControl>
              <Calendar
                className='mx-auto w-fit rounded-md border'
                mode='range'
                selected={field.state.value}
                onSelect={(range) => {
                  field.handleChange(
                    range ?? { from: new Date(), to: addDays(new Date(), 1) },
                  );
                }}
                required={true}
                showOutsideDays={false}
                min={1}
                max={differenceInDays(
                  addDays(endOfWeek(addWeeks(new Date(), 2)), 2),
                  new Date(),
                )}
                disabled={{
                  before: new Date(),
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
