'use client';
import { useState, useMemo } from 'react';
import { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';

// Define FAQ type
interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order: number;
  status: string;
}

// Server component to fetch FAQs
async function getFAQs(): Promise<FAQ[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faqs?status=active&sort=order`, {
    next: { revalidate: 3600 }, // revalidate every hour
  });
  if (!res.ok) {
    throw new Error('Failed to fetch FAQs');
  }
  const data = await res.json();
  return data.faqs || [];
}

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about our platform
        </p>
      </div>

      {/* Search wrapper – client component */}
      <Suspense fallback={<div className="mb-8" />}>
        <FAQSearch faqs={faqs} />
      </Suspense>
    </div>
  );
}

// // Client component for search and accordion
// 'use client';
// import { useState, useMemo } from 'react';

function FAQSearch({ faqs }: { faqs: FAQ[] }) {
  const [search, setSearch] = useState('');

  const filteredFAQs = useMemo(() => {
    if (!search.trim()) return faqs;
    const lowerSearch = search.toLowerCase();
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(lowerSearch) ||
        faq.answer.toLowerCase().includes(lowerSearch)
    );
  }, [search, faqs]);

  return (
    <>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredFAQs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No FAQs match your search.</p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {filteredFAQs.map((faq, index) => (
            <AccordionItem key={faq._id} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
}