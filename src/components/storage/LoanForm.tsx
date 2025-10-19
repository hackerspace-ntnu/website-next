'use client';

import { revalidateLogic } from '@tanstack/react-form';
import { addDays, addWeeks, differenceInDays, endOfWeek } from 'date-fns';
import { useTranslations } from 'next-intl';
import type { DateRange } from 'react-day-picker';
import type { CartItem } from '@/components/storage/types';
import { Button } from '@/components/ui/Button';
import { useAppForm } from '@/components/ui/Form';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter } from '@/lib/locale/navigation';
import { loanFormSchema } from '@/validations/storage/loanFormSchema';

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

  const form = useAppForm({
    validators: {
      onDynamic: loanFormSchema(useTranslations()),
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    defaultValues: {
      dates: {
        from: new Date(),
        to: addDays(new Date(), 7),
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
      router.push('/storage/loans/user');
    },
  });

  return (
    <form
      className='xs:space-y-3'
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField name='dates'>
        {(field) => (
          <field.CalendarField
            label={t.loanPeriod}
            description={t.loanPeriodDescription}
            calendarClassName='mx-auto w-fit'
            mode='range'
            required={true}
            selected={field.state.value ?? addDays(new Date(), 1)}
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
        )}
      </form.AppField>
      {userIsMember && (
        <form.AppField name='autoapprove'>
          {(field) => (
            <div className='flex items-center gap-2'>
              <field.CheckboxField
                label={t.autoapprove}
                description={t.autoapproveDescription}
              />
            </div>
          )}
        </form.AppField>
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
    </form>
  );
}

export { LoanForm };
