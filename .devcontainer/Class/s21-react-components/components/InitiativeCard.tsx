"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  id: string;
  title: string;
  votes: number;
  onVote: (id: string) => void;
}

const InitiativeCard: React.FC<CardProps> = ({ id, title, votes, onVote }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/initiatives/${id}`);
  };

  const handleVote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onVote(id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition bg-white dark:bg-zinc-900 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Votes:{" "}
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            {votes}
          </span>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={handleVote}
          className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition cursor-pointer"
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default InitiativeCard;
