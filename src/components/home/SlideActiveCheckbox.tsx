'use client';

import { Checkbox } from '@/components/ui/Checkbox';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

type SlideActiveCheckboxProps = {
  slide: RouterOutput['home']['fetchSlide'];
  t: {
    successfullyChangedToActive: string;
    successfullyChangedToInactive: string;
  };
};

function SlideActiveCheckbox({ slide, t }: SlideActiveCheckboxProps) {
  const utils = api.useUtils();
  const router = useRouter();

  const changeSlideActive = api.home.changeSlideActive.useMutation({
    onSuccess: async (_data, variables) => {
      toast.success(
        variables.active
          ? t.successfullyChangedToActive
          : t.successfullyChangedToInactive,
      );
      await utils.home.fetchSlide.invalidate();
      await utils.home.fetchSlides.invalidate();
      router.refresh();
    },
  });

  return (
    <Checkbox
      checked={changeSlideActive.variables?.active ?? slide.active}
      onCheckedChange={(value) => {
        changeSlideActive.mutate({
          id: slide.id,
          active: value !== 'indeterminate' ? value : false,
        });
      }}
      className='cursor-pointer'
    />
  );
}

export { SlideActiveCheckbox };
