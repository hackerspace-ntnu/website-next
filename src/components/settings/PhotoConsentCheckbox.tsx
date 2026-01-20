'use client';

import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';

type PhotoConsentCheckboxProps = {
  photoConsentSetting: boolean;
  t: {
    label: string;
    consenting: string;
    retractingConsent: string;
    successConsenting: string;
    successRetractingConsent: string;
    errorConsenting: string;
    errorRetractingConsent: string;
  };
};

function PhotoConsentCheckbox({
  photoConsentSetting,
  t,
}: PhotoConsentCheckboxProps) {
  const utils = api.useUtils();
  const router = useRouter();

  const updatePhotoConsentSetting =
    api.settings.updatePhotoConsentSetting.useMutation({
      onSuccess: async () => {
        await utils.events.fetchEventParticipants.invalidate();
        router.refresh();
      },
    });

  const id = 'photo-consent-checkbox';

  return (
    <div className='flex items-center gap-2'>
      <Checkbox
        checked={photoConsentSetting}
        className='mx-auto cursor-pointer'
        disabled={updatePhotoConsentSetting.isPending}
        id={id}
        onCheckedChange={(value) => {
          const promise = updatePhotoConsentSetting.mutateAsync({
            photoConsent: value !== 'indeterminate' ? value : false,
          });

          toast.promise(promise, {
            loading: value ? t.consenting : t.retractingConsent,
            success: value ? t.successConsenting : t.successRetractingConsent,
            error: value ? t.errorConsenting : t.errorRetractingConsent,
          });
        }}
      />
      <Label htmlFor={id}>{t.label}</Label>
    </div>
  );
}

export { PhotoConsentCheckbox };
