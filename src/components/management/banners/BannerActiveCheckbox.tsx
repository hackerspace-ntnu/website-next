'use client';

import { Checkbox } from '@/components/ui/Checkbox';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

type BannerActiveCheckboxProps = {
  banner: RouterOutput['banners']['fetchBanner'];
  t: {
    changingToActive: string;
    changingToInactive: string;
    successfullyChangedToActive: string;
    successfullyChangedToInactive: string;
    errorChangingToActive: string;
    errorChangingToInactive: string;
  };
};

function BannerActiveCheckbox({ banner, t }: BannerActiveCheckboxProps) {
  const utils = api.useUtils();
  const router = useRouter();

  const changeBannerActive = api.banners.changeBannerActive.useMutation({
    onSuccess: async () => {
      await utils.home.fetchSlide.invalidate();
      await utils.home.fetchSlides.invalidate();
      router.refresh();
    },
  });

  return (
    <Checkbox
      checked={changeBannerActive.variables?.active ?? banner.active}
      onCheckedChange={(value) => {
        const promise = changeBannerActive.mutateAsync({
          id: banner.id,
          active: value !== 'indeterminate' ? value : false,
        });

        toast.promise(promise, {
          loading: banner.active ? t.changingToInactive : t.changingToActive,
          success: banner.active
            ? t.successfullyChangedToInactive
            : t.successfullyChangedToActive,
          error: banner.active
            ? t.errorChangingToInactive
            : t.errorChangingToActive,
        });
      }}
      className='cursor-pointer'
    />
  );
}

export { BannerActiveCheckbox };
