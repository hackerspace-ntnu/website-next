import { EditItemFormSkeleton } from '@/components/storage/EditItemFormSkeleton';

export default async function EditStorageItemLoading() {
  return (
    <div className='mx-auto max-w-prose'>
      <EditItemFormSkeleton editing={true} />
    </div>
  );
}
