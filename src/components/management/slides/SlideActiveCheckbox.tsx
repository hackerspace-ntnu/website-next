'use client';

import { Checkbox } from '@/components/ui/Checkbox';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

type SlideActiveCheckboxProps = {
  slide: RouterOutput['slides']['fetchSlide'];
  t: {
    changingToActive: string;
    changingToInactive: string;
    successfullyChangedToActive: string;
    successfullyChangedToInactive: string;
    errorChangingToActive: string;
    errorChangingToInactive: string;
  };
};

function SlideActiveCheckbox({ slide, t }: SlideActiveCheckboxProps) {
  const utils = api.useUtils();
  const router = useRouter();

  const changeSlideActive = api.slides.changeSlideActive.useMutation({
    onSuccess: async () => {
      await utils.slides.invalidate();
      router.refresh();
    },
  });

  return (
    <Checkbox
      checked={changeSlideActive.variables?.active ?? slide.active}
      onCheckedChange={(value) => {
        const promise = changeSlideActive.mutateAsync({
          id: slide.id,
          active: value !== 'indeterminate' ? value : false,
        });

        toast.promise(promise, {
          loading: slide.active ? t.changingToInactive : t.changingToActive,
          success: slide.active
            ? t.successfullyChangedToInactive
            : t.successfullyChangedToActive,
          error: slide.active
            ? t.errorChangingToInactive
            : t.errorChangingToActive,
        });
      }}
      className='cursor-pointer'
    />
  );
}

export { SlideActiveCheckbox };
