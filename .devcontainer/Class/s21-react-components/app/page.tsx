'use client';

import React, { useState } from 'react';
import InitiativeCard from '@/components/InitiativeCard';
import { SAMPLE_INITIATIVES, Initiative } from './data/initiatives';

const Home = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>(SAMPLE_INITIATIVES);

  const handleVote = (id: string) => {
    // Keep in-memory data in sync so details page reflects the new votes
    const target = SAMPLE_INITIATIVES.find(item => item.id === id);
    if (target) {
      target.votes += 1;
    }

    setInitiatives(prevInitiatives =>
      prevInitiatives.map(initiative =>
        initiative.id === id ? { ...initiative, votes: initiative.votes + 1 } : initiative
      )
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          SustainHub Climate Action Explorer
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Explore municipal climate initiatives, vote for impactful projects, and discover details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {initiatives.map(initiative => (
          <InitiativeCard
            key={initiative.id}
            id={initiative.id}
            title={initiative.title}
            votes={initiative.votes}
            onVote={handleVote}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
