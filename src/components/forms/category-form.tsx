// // @ts-nocheck

// 'use client';
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { api } from '@/lib/api-client';

// const categorySchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   slug: z.string().optional(),
//   description: z.string().optional(),
//   parent: z.string().nullable().optional(),
//   order: z.number().int().min(0).default(0),
//   status: z.enum(['active', 'inactive']).default('active'),
// });

// type CategoryFormValues = z.infer<typeof categorySchema>;

// interface CategoryFormProps {
//   initialData?: CategoryFormValues & { _id?: string };
//   onSubmit: (data: CategoryFormValues) => Promise<void>;
// }

// export function CategoryForm({ initialData, onSubmit }: CategoryFormProps) {
//   const [categories, setCategories] = useState<Array<{ _id: string; name: string }>>([]);

//   useEffect(() => {
//     // Fetch existing categories for parent dropdown (excluding self if editing)
//     api.getCategories({ limit: 100 }).then(data => {
//       let list = data.categories;
//       if (initialData?._id) {
//         list = list.filter((c: any) => c._id !== initialData._id);
//       }
//       setCategories(list);
//     }).catch(console.error);
//   }, [initialData]);

//   const form = useForm<CategoryFormValues>({
//     resolver: zodResolver(categorySchema),
//     defaultValues: initialData || {
//       name: '',
//       slug: '',
//       description: '',
//       parent: null,
//       order: 0,
//       status: 'active',
//     },
//   });

//   // Auto-generate slug from name if slug is empty
//   const watchName = form.watch('name');
//   useEffect(() => {
//     const currentSlug = form.getValues('slug');
//     if (!currentSlug && watchName) {
//       const generatedSlug = watchName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
//       form.setValue('slug', generatedSlug);
//     }
//   }, [watchName, form]);

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name *</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="slug"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Slug</FormLabel>
//               <FormControl>
//                 <Input {...field} placeholder="auto-generated if empty" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Textarea {...field} rows={3} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="parent"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Parent Category</FormLabel>
//               <Select onValueChange={field.onChange} value={field.value || ''}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="None (top-level)" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="all">None</SelectItem>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="order"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Order</FormLabel>
//               <FormControl>
//                 <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="status"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Status</FormLabel>
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="active">Active</SelectItem>
//                   <SelectItem value="inactive">Inactive</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Save Category</Button>
//       </form>
//     </Form>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { api } from '@/lib/api-client';

const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().optional(),
  description: z.string().optional(),
  parent: z.string().nullable().optional(),
  order: z.number().int().min(0).default(0),
  status: z.enum(['active', 'inactive']).default('active'),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  initialData?: CategoryFormValues & { _id?: string };
  onSubmit: (data: CategoryFormValues) => Promise<void>;
}

export function CategoryForm({ initialData, onSubmit }: CategoryFormProps) {
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData ?? {
      name: '',
      slug: '',
      description: '',
      parent: null,
      order: 0,
      status: 'active',
    },
  });

  /* ---------------- FETCH CATEGORIES ---------------- */

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await api.getCategories({ limit: 100 });

        let list = Array.isArray(data?.categories) ? data.categories : [];

        if (initialData?._id) {
          list = list.filter((c: any) => c._id !== initialData._id);
        }

        setCategories(list);
      } catch (err) {
        console.error('Failed to load categories', err);
        setCategories([]); // fallback safety
      }
    };

    loadCategories();
  }, [initialData]);

  /* ---------------- AUTO SLUG ---------------- */

  const watchName = form.watch('name');

  useEffect(() => {
    const currentSlug = form.getValues('slug');

    if (!currentSlug && watchName) {
      const slug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      form.setValue('slug', slug);
    }
  }, [watchName, form]);

  /* ---------------- FORM ---------------- */

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
        {/* NAME */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SLUG */}

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} placeholder="auto-generated if empty" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DESCRIPTION */}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PARENT CATEGORY */}

        <FormField
          control={form.control}
          name="parent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>

              <Select
                onValueChange={(val) => field.onChange(val || null)}
                value={field.value ?? ''}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="None (top-level)" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="all">None</SelectItem>

                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* ORDER */}

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* STATUS */}

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>

              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Category</Button>
      </form>
    </Form>
  );
}