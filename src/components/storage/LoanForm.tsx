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
import { Checkbox } from '../ui/Checkbox';
import { Label } from '../ui/Label';

type LoanFormProps = {
  t: {
    title: string;
    loanPeriod: string;
    loanPeriodDescription: string;
    autoapprove: string;
    autoapproveDescription: string;
    submit: string;
    success: string;
  };
  setOpen: (newState: boolean) => void;
};

function LoanForm({ t, setOpen }: LoanFormProps) {
  const router = useRouter();
  const [cart, setCart, isLoading] =
    useLocalStorage<CartItem[]>('shopping-cart');

  const borrowItemsMutation = api.storage.borrowItems.useMutation({
    onSuccess: () => toast.success(t.success),
  });

  const user = api.auth.state.useQuery().data?.user;
  const userIsMember = user ? user.groups.length > 0 : false;

  const form = useForm(loanFormSchema(useTranslations()), {
    defaultValues: {
      dates: {
        from: new Date(),
        to: addDays(new Date(), 1),
      } as DateRange,
      autoapprove: userIsMember,
    },
    onSubmit: ({ value }) => {
      if (!cart || isLoading) return;
      borrowItemsMutation.mutate(
        cart.map((i) => ({
          id: i.id,
          amount: i.amount,
          borrowFrom: value.dates.from ?? new Date(),
          borrowUntil: value.dates.to ?? addDays(new Date(), 1),
          autoapprove: value.autoapprove,
        })),
      );
      setCart(null);
      setOpen(false);
      router.push('/storage');
    },
  });

  return (
    <Form className='xs:space-y-3' onSubmit={form.handleSubmit}>
      <form.Field name='dates'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t.loanPeriod}</FormLabel>
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
            <FormDescription>{t.loanPeriodDescription}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      {userIsMember && (
        <form.Field name='autoapprove'>
          {(field) => (
            <FormItem errors={field.state.meta.errors}>
              <div className='flex items-center gap-2'>
                <FormControl>
                  <Checkbox
                    checked={field.state.value}
                    onCheckedChange={(value) =>
                      field.handleChange(
                        value !== 'indeterminate' ? value : false,
                      )
                    }
                  />
                </FormControl>
                <Label>{t.autoapprove}</Label>
              </div>
              <FormDescription>{t.autoapproveDescription}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        </form.Field>
      )}
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
