"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactGA from "react-ga4";
import { FaPlus, FaLayerGroup } from "react-icons/fa6";

import "@fontsource/raleway";
import "@fontsource/roboto";

import { db } from "@/firebase";
import { Flashcard } from "../types/types.config";

const Dashboard = () => {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/dashboard",
      title: "Dashboard Page",
    });
  }, []);

  useEffect(() => {
    async function getFlashcardCollection() {
      if (!user) {
        return;
      }

      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, {
          flashcards: [],
        });

        setFlashcards([]);
      }

      setLoading(false);
    }

    getFlashcardCollection();
  }, [user]);

  const handleCardClick = (name: string) => {
    router.push(`/dashboard/flashcards?id=${encodeURIComponent(name)}`);
  };

  return (
    <div className="mx-auto mt-28 mb-24 max-w-5xl space-y-10 px-5 max-sm:mt-24">
      <div className="space-y-2 text-center">
        <h1
          className="text-5xl font-extrabold text-[#1476bc] sm:text-6xl"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Your Dashboard
        </h1>

        <p
          className="block text-lg font-light text-slate-600 sm:text-xl"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Flashcard Collection
        </p>
      </div>

      <Link href="/dashboard/flashcards" className="block">
        <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#1476bc] bg-white p-8 text-[#1476bc] shadow-md transition-all hover:scale-[1.01] hover:bg-slate-50 hover:shadow-lg">
          <FaPlus />

          <span className="text-xl font-semibold">
            Generate New Set
          </span>
        </div>
      </Link>

      {loading ? (
        <p className="text-center text-slate-500">
          Loading your sets…
        </p>
      ) : flashcards.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-10 text-slate-500">
          <FaLayerGroup
            size={32}
            className="text-[#9fbedb]"
          />

          <p className="text-lg">
            No flashcard sets yet.
          </p>

          <p className="text-sm">
            Hit &ldquo;Generate New Set&rdquo; above to create your first one.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flashcards.map((flashcard, index) => (
            <button
              type="button"
              className="flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-transparent bg-white p-8 text-black shadow-md transition-all hover:scale-[1.02] hover:cursor-pointer hover:border-[#1476bc] hover:shadow-lg"
              key={`${flashcard.name}-${index}`}
              onClick={() => handleCardClick(flashcard.name)}
            >
              <h2 className="text-center text-xl font-extrabold text-[#1476bc]">
                {flashcard.name}
              </h2>
            </button>
          ))}
        </section>
      )}
    </div>
  );
};

export default Dashboard;