// // 'use client';
// // import { useEffect, useState } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import * as z from 'zod';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// // import { Checkbox } from '@/components/ui/checkbox';
// // import { api } from '@/lib/api-client';

// // const postSchema = z.object({
// //   title: z.string().min(3, 'Title must be at least 3 characters'),
// //   slug: z.string().optional(),
// //   content: z.string().min(10, 'Content must be at least 10 characters'),
// //   excerpt: z.string().optional(),
// //   featuredImage: z.string().optional(),
// //   category: z.string().nullable().optional(),
// //   tags: z.array(z.string()).default([]),
// //   status: z.enum(['draft', 'published', 'deleted']).default('draft'),
// //   author: z.string().min(1, 'Author is required'),
// //   metaTitle: z.string().optional(),
// //   metaDescription: z.string().optional(),
// //   allowComments: z.boolean().default(true),
// //   publishedAt: z.date().optional().nullable(),
// // });

// // type PostFormValues = z.infer<typeof postSchema>;

// // interface PostFormProps {
// //   initialData?: PostFormValues & { _id?: string };
// //   onSubmit: (data: PostFormValues) => Promise<void>;
// // }

// // export function PostForm({ initialData, onSubmit }: PostFormProps) {
// //   const [categories, setCategories] = useState<Array<{ _id: string; name: string }>>([]);
// //   const [authors, setAuthors] = useState<Array<{ _id: string; name: string }>>([]);
// //   const [tagInput, setTagInput] = useState('');

// //   useEffect(() => {
// //     // Fetch categories and authors for dropdowns
// //     Promise.all([
// //       api.getCategories({ limit: 100, status: 'active' }),
// //       api.getUsers({ limit: 100 })
// //     ]).then(([catsData, usersData]) => {
// //       setCategories(catsData.categories);
// //       setAuthors(usersData.users);
// //     }).catch(console.error);
// //   }, []);

// //   const form = useForm<PostFormValues>({
// //     resolver: zodResolver(postSchema),
// //     defaultValues: initialData ? {
// //       ...initialData,
// //       publishedAt: initialData.publishedAt ? new Date(initialData.publishedAt) : null,
// //     } : {
// //       title: '',
// //       slug: '',
// //       content: '',
// //       excerpt: '',
// //       featuredImage: '',
// //       category: null,
// //       tags: [],
// //       status: 'draft',
// //       author: '',
// //       metaTitle: '',
// //       metaDescription: '',
// //       allowComments: true,
// //       publishedAt: null,
// //     },
// //   });

// //   // Auto-generate slug from title if slug is empty
// //   const watchTitle = form.watch('title');
// //   useEffect(() => {
// //     const currentSlug = form.getValues('slug');
// //     if (!currentSlug && watchTitle) {
// //       const generatedSlug = watchTitle
// //         .toLowerCase()
// //         .replace(/[^a-z0-9]+/g, '-')
// //         .replace(/^-|-$/g, '');
// //       form.setValue('slug', generatedSlug);
// //     }
// //   }, [watchTitle, form]);

// //   // Handle tags
// //   const addTag = () => {
// //     if (tagInput.trim()) {
// //       const currentTags = form.getValues('tags') || [];
// //       if (!currentTags.includes(tagInput.trim())) {
// //         form.setValue('tags', [...currentTags, tagInput.trim()]);
// //       }
// //       setTagInput('');
// //     }
// //   };

// //   const removeTag = (tag: string) => {
// //     const currentTags = form.getValues('tags') || [];
// //     form.setValue('tags', currentTags.filter(t => t !== tag));
// //   };

// //   return (
// //     <Form {...form}>
// //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
// //         <div className="grid grid-cols-2 gap-4">
// //           <FormField
// //             control={form.control}
// //             name="title"
// //             render={({ field }) => (
// //               <FormItem className="col-span-2">
// //                 <FormLabel>Title *</FormLabel>
// //                 <FormControl>
// //                   <Input {...field} />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="slug"
// //             render={({ field }) => (
// //               <FormItem className="col-span-2">
// //                 <FormLabel>Slug</FormLabel>
// //                 <FormControl>
// //                   <Input {...field} placeholder="auto-generated if empty" />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="author"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Author *</FormLabel>
// //                 <Select onValueChange={field.onChange} value={field.value}>
// //                   <FormControl>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Select author" />
// //                     </SelectTrigger>
// //                   </FormControl>
// //                   <SelectContent>
// //                     {authors.map((a) => (
// //                       <SelectItem key={a._id} value={a._id}>{a.name}</SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="category"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Category</FormLabel>
// //                 <Select onValueChange={field.onChange} value={field.value || ''}>
// //                   <FormControl>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="None" />
// //                     </SelectTrigger>
// //                   </FormControl>
// //                   <SelectContent>
// //                     <SelectItem value="all">None</SelectItem>
// //                     {categories.map((c) => (
// //                       <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="status"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Status</FormLabel>
// //                 <Select onValueChange={field.onChange} value={field.value}>
// //                   <FormControl>
// //                     <SelectTrigger>
// //                       <SelectValue />
// //                     </SelectTrigger>
// //                   </FormControl>
// //                   <SelectContent>
// //                     <SelectItem value="draft">Draft</SelectItem>
// //                     <SelectItem value="published">Published</SelectItem>
// //                     <SelectItem value="deleted">Deleted</SelectItem>
// //                   </SelectContent>
// //                 </Select>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           {form.watch('status') === 'published' && (
// //             <FormField
// //               control={form.control}
// //               name="publishedAt"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>Published Date</FormLabel>
// //                   <FormControl>
// //                     <Input
// //                       type="datetime-local"
// //                       value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
// //                       onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
// //                     />
// //                   </FormControl>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //           )}
// //           <FormField
// //             control={form.control}
// //             name="featuredImage"
// //             render={({ field }) => (
// //               <FormItem className="col-span-2">
// //                 <FormLabel>Featured Image URL</FormLabel>
// //                 <FormControl>
// //                   <Input {...field} placeholder="https://..." />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="excerpt"
// //             render={({ field }) => (
// //               <FormItem className="col-span-2">
// //                 <FormLabel>Excerpt</FormLabel>
// //                 <FormControl>
// //                   <Textarea {...field} rows={2} />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="content"
// //             render={({ field }) => (
// //               <FormItem className="col-span-2">
// //                 <FormLabel>Content *</FormLabel>
// //                 <FormControl>
// //                   <Textarea {...field} rows={10} />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <div className="col-span-2">
// //             <FormLabel>Tags</FormLabel>
// //             <div className="flex gap-2 mt-1">
// //               <Input
// //                 value={tagInput}
// //                 onChange={(e) => setTagInput(e.target.value)}
// //                 onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
// //                 placeholder="Add a tag"
// //               />
// //               <Button type="button" onClick={addTag} variant="outline">Add</Button>
// //             </div>
// //             <div className="flex flex-wrap gap-2 mt-2">
// //               {form.watch('tags')?.map((tag) => (
// //                 <Badge key={tag} variant="secondary" className="gap-1">
// //                   {tag}
// //                   <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">×</button>
// //                 </Badge>
// //               ))}
// //             </div>
// //           </div>
// //           <FormField
// //             control={form.control}
// //             name="metaTitle"
// //             render={({ field }) => (
// //               <FormItem className="col-span-2">
// //                 <FormLabel>Meta Title</FormLabel>
// //                 <FormControl>
// //                   <Input {...field} />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="metaDescription"
// //             render={({ field }) => (
// //               <FormItem className="col-span-2">
// //                 <FormLabel>Meta Description</FormLabel>
// //                 <FormControl>
// //                   <Textarea {...field} rows={2} />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="allowComments"
// //             render={({ field }) => (
// //               <FormItem className="flex items-center gap-2 col-span-2">
// //                 <FormControl>
// //                   <Checkbox checked={field.value} onCheckedChange={field.onChange} />
// //                 </FormControl>
// //                 <FormLabel className="!mt-0">Allow comments</FormLabel>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //         </div>
// //         <Button type="submit">Save Post</Button>
// //       </form>
// //     </Form>
// //   );
// // }

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
// import { Checkbox } from '@/components/ui/checkbox';
// import { Badge } from '@/components/ui/badge'; // <-- ADDED IMPORT
// import { api } from '@/lib/api-client';

// const postSchema = z.object({
//   title: z.string().min(3, 'Title must be at least 3 characters'),
//   slug: z.string().optional(),
//   content: z.string().min(10, 'Content must be at least 10 characters'),
//   excerpt: z.string().optional(),
//   featuredImage: z.string().optional(),
//   category: z.string().nullable().optional(),
//   tags: z.array(z.string()).default([]),
//   status: z.enum(['draft', 'published', 'deleted']).default('draft'),
//   author: z.string().min(1, 'Author is required'),
//   metaTitle: z.string().optional(),
//   metaDescription: z.string().optional(),
//   allowComments: z.boolean().default(true),
//   publishedAt: z.date().optional().nullable(),
// });

// type PostFormValues = z.infer<typeof postSchema>;

// interface PostFormProps {
//   initialData?: PostFormValues & { _id?: string };
//   onSubmit: (data: PostFormValues) => Promise<void>;
// }

// export function PostForm({ initialData, onSubmit }: PostFormProps) {
//   const [categories, setCategories] = useState<Array<{ _id: string; name: string }>>([]);
//   const [authors, setAuthors] = useState<Array<{ _id: string; name: string }>>([]);
//   const [tagInput, setTagInput] = useState('');

//   useEffect(() => {
//     // Fetch categories and authors for dropdowns
//     Promise.all([
//       api.getCategories({ limit: 100, status: 'active' }),
//       api.getUsers({ limit: 100 })
//     ]).then(([catsData, usersData]) => {
//       setCategories(catsData.categories);
//       setAuthors(usersData.users);
//     }).catch(console.error);
//   }, []);

//   const form = useForm<PostFormValues>({
//     resolver: zodResolver(postSchema),
//     defaultValues: initialData ? {
//       ...initialData,
//       publishedAt: initialData.publishedAt ? new Date(initialData.publishedAt) : null,
//     } : {
//       title: '',
//       slug: '',
//       content: '',
//       excerpt: '',
//       featuredImage: '',
//       category: null,
//       tags: [],
//       status: 'draft',
//       author: '',
//       metaTitle: '',
//       metaDescription: '',
//       allowComments: true,
//       publishedAt: null,
//     },
//   });

//   // Auto-generate slug from title if slug is empty
//   const watchTitle = form.watch('title');
//   useEffect(() => {
//     const currentSlug = form.getValues('slug');
//     if (!currentSlug && watchTitle) {
//       const generatedSlug = watchTitle
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, '-')
//         .replace(/^-|-$/g, '');
//       form.setValue('slug', generatedSlug);
//     }
//   }, [watchTitle, form]);

//   // Handle tags
//   const addTag = () => {
//     if (tagInput.trim()) {
//       const currentTags = form.getValues('tags') || [];
//       if (!currentTags.includes(tagInput.trim())) {
//         form.setValue('tags', [...currentTags, tagInput.trim()]);
//       }
//       setTagInput('');
//     }
//   };

//   const removeTag = (tag: string) => {
//     const currentTags = form.getValues('tags') || [];
//     form.setValue('tags', currentTags.filter(t => t !== tag));
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
//         <div className="grid grid-cols-2 gap-4">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem className="col-span-2">
//                 <FormLabel>Title *</FormLabel>
//                 <FormControl>
//                   <Input {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="slug"
//             render={({ field }) => (
//               <FormItem className="col-span-2">
//                 <FormLabel>Slug</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="auto-generated if empty" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="author"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Author *</FormLabel>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select author" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {authors.map((a) => (
//                       <SelectItem key={a._id} value={a._id}>{a.name}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category</FormLabel>
//                 <Select onValueChange={field.onChange} value={field.value || ''}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="None" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="all">None</SelectItem> {/* FIXED: use empty string */}
//                     {categories.map((c) => (
//                       <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="status"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Status</FormLabel>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="draft">Draft</SelectItem>
//                     <SelectItem value="published">Published</SelectItem>
//                     <SelectItem value="deleted">Deleted</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {form.watch('status') === 'published' && (
//             <FormField
//               control={form.control}
//               name="publishedAt"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Published Date</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="datetime-local"
//                       value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
//                       onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           )}
//           <FormField
//             control={form.control}
//             name="featuredImage"
//             render={({ field }) => (
//               <FormItem className="col-span-2">
//                 <FormLabel>Featured Image URL</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="https://..." />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="excerpt"
//             render={({ field }) => (
//               <FormItem className="col-span-2">
//                 <FormLabel>Excerpt</FormLabel>
//                 <FormControl>
//                   <Textarea {...field} rows={2} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem className="col-span-2">
//                 <FormLabel>Content *</FormLabel>
//                 <FormControl>
//                   <Textarea {...field} rows={10} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="col-span-2">
//             <FormLabel>Tags</FormLabel>
//             <div className="flex gap-2 mt-1">
//               <Input
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
//                 placeholder="Add a tag"
//               />
//               <Button type="button" onClick={addTag} variant="outline">Add</Button>
//             </div>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {form.watch('tags')?.map((tag) => (
//                 <Badge key={tag} variant="secondary" className="gap-1">
//                   {tag}
//                   <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">×</button>
//                 </Badge>
//               ))}
//             </div>
//           </div>
//           <FormField
//             control={form.control}
//             name="metaTitle"
//             render={({ field }) => (
//               <FormItem className="col-span-2">
//                 <FormLabel>Meta Title</FormLabel>
//                 <FormControl>
//                   <Input {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="metaDescription"
//             render={({ field }) => (
//               <FormItem className="col-span-2">
//                 <FormLabel>Meta Description</FormLabel>
//                 <FormControl>
//                   <Textarea {...field} rows={2} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="allowComments"
//             render={({ field }) => (
//               <FormItem className="flex items-center gap-2 col-span-2">
//                 <FormControl>
//                   <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                 </FormControl>
//                 <FormLabel className="!mt-0">Allow comments</FormLabel>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <Button type="submit">Save Post</Button>
//       </form>
//     </Form>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge"; // Added import
import { api } from "@/lib/api-client";

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  category: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published", "deleted"]).default("draft"),
  author: z.string().min(1, "Author is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  allowComments: z.boolean().default(true),
  publishedAt: z.date().optional().nullable(),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  initialData?: any; // We'll handle transformation
  onSubmit: (data: PostFormValues) => Promise<void>;
}

export function PostForm({ initialData, onSubmit }: PostFormProps) {
  const [categories, setCategories] = useState<
    Array<{ _id: string; name: string }>
  >([]);
  const [authors, setAuthors] = useState<Array<{ _id: string; name: string }>>(
    [],
  );
  const [tagInput, setTagInput] = useState("");

  //   useEffect(() => {
  //     // Fetch categories and authors for dropdowns
  //     Promise.all([
  //       api.getCategories({ limit: 100, status: 'active' }),
  //       api.getUsers({ limit: 100 })
  //     ]).then(([catsData, usersData]) => {
  //       // catsData has { categories: [...] }
  //       // usersData has { users: [...] }
  //       setCategories(catsData.categories || []);
  //       setAuthors(usersData.users || []);
  //     }).catch(console.error);
  //   }, []);

  useEffect(() => {
    Promise.all([
      api.getCategories({ limit: 100, status: "active" }),
      api.getUsers({ limit: 100 }),
    ])
      .then(([catsData, usersData]) => {
         console.log("catsData:", catsData); // DEBUG: check the response
        setCategories(catsData.categories || []);
        setAuthors(usersData.users || []);
      })
      .catch(console.error);
  }, []);

  // Transform initialData to match form structure
  const defaultValues = initialData
    ? {
        ...initialData,
        // Extract IDs from populated objects if present
        author: initialData.author?._id || initialData.author || "",
        category: initialData.category?._id || initialData.category || null,
        publishedAt: initialData.publishedAt
          ? new Date(initialData.publishedAt)
          : null,
      }
    : {
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        featuredImage: "",
        category: null,
        tags: [],
        status: "draft" as const,
        author: "",
        metaTitle: "",
        metaDescription: "",
        allowComments: true,
        publishedAt: null,
      };

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  // Auto-generate slug from title if slug is empty
  const watchTitle = form.watch("title");
  useEffect(() => {
    const currentSlug = form.getValues("slug");
    if (!currentSlug && watchTitle) {
      const generatedSlug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      form.setValue("slug", generatedSlug);
    }
  }, [watchTitle, form]);

  // Handle tags
  const addTag = () => {
    if (tagInput.trim()) {
      const currentTags = form.getValues("tags") || [];
      if (!currentTags.includes(tagInput.trim())) {
        form.setValue("tags", [...currentTags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag),
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="auto-generated if empty" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {authors.map((a) => (
                      <SelectItem key={a._id} value={a._id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">None</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="deleted">Deleted</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("status") === "published" && (
            <FormField
              control={form.control}
              name="publishedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published Date</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : null,
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="featuredImage"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Featured Image URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Content *</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <FormLabel>Tags</FormLabel>
            <div className="flex gap-2 mt-1">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                placeholder="Add a tag"
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.watch("tags")?.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowComments"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 col-span-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!mt-0">Allow comments</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Save Post</Button>
      </form>
    </Form>
  );
}
