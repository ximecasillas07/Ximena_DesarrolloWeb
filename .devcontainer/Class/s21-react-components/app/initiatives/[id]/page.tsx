'use client';

import React, { useState, Suspense } from 'react';
import { SAMPLE_INITIATIVES } from '@/app/data/initiatives';
import { useParams } from 'next/navigation';
import Link from 'next/link';

function InitiativeDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [bookmarked, setBookmarked] = useState(false);

  const initiative = SAMPLE_INITIATIVES.find((item) => item.id === id);

  if (!initiative) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">Initiative not found</h1>
        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition"
        >
          Back to Initiatives
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Link
        href="/"
        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-6"
      >
        &larr; Back to Initiatives
      </Link>
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm bg-white dark:bg-zinc-900">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {initiative.title}
          </h1>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-semibold rounded-full">
            {initiative.category}
          </span>
        </div>

        <div className="space-y-3 mb-6 text-zinc-700 dark:text-zinc-300">
          <p>
            <strong className="text-zinc-900 dark:text-zinc-100">Votes:</strong> {initiative.votes}
          </p>
          <p>
            <strong className="text-zinc-900 dark:text-zinc-100">Author:</strong> {initiative.author}
          </p>
          <p>
            <strong className="text-zinc-900 dark:text-zinc-100">Description:</strong>
          </p>
          <p className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg text-sm leading-relaxed">
            {initiative.description}
          </p>
        </div>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`px-5 py-2.5 rounded-lg font-medium transition cursor-pointer ${
            bookmarked
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-zinc-800 hover:bg-zinc-700 text-white dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-100'
          }`}
        >
          {bookmarked ? '★ Bookmarked' : '☆ Bookmark'}
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6">Loading initiative...</div>}>
      <InitiativeDetail />
    </Suspense>
  );
}
