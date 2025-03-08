'use client';

import { Button } from '@/components/ui/Button';
import { useForm } from '@/components/ui/Form';
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import { newItemSchema } from '@/validations/storage/newItemSchema';
import { useTranslations } from 'next-intl';

type NewItemFormProps = {
  t: {
    nameLabel: string;
    descriptionLabel: string;
    locationLabel: string;
    categoryLabel: string;
    quantityLabel: string;
  };
};

function NewItemForm({ itemCategories }: { itemCategories: string[] }) {
  const t = useTranslations('storage.new');
  const router = useRouter();
  const form = useForm(newItemSchema(itemCategories), {
    validators: {
      onChange: newItemSchema(itemCategories),
    },
    defaultValues: {
      name: '',
      description: '',
      location: '',
      category: null,
      quantity: 1,
    },
    onSubmit: ({ value }) => {
      api.storage.newItem.useMutation();
      router.push('/storage');
      router.refresh();
    },
  });

  return (
    <Form onSubmit={form.handleSubmit} className='max-w-prose space-y-8'>
      <form.Field name='name'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('name.label')}</FormLabel>
            <FormControl>
              <Input
                placeholder={t('name.placeholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='description'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('description.label')}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t('description.placeholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='location'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('location.label')}</FormLabel>
            <FormControl>
              <Input
                placeholder={t('location.placeholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='category'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('category.label')}</FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder={itemCategories[0]} />
                </SelectTrigger>
                <SelectContent>
                  {itemCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='quantity'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('quantity.label')}</FormLabel>
            <FormControl>
              <Input
                type='number'
                min={0}
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <Button type='submit'>{t('submit')}</Button>
    </Form>
  );
}

export { NewItemForm, type NewItemFormProps };
