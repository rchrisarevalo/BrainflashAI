"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactGA from "react-ga4";
import { FaPlus, FaLayerGroup } from "react-icons/fa6";

import "@fontsource/raleway";
import "@fontsource/roboto";
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
      if (!user) return;

      const docRef = doc(collection(db, "users"), user?.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
      setLoading(false);
    }
    getFlashcardCollection();
  }, [user]);

  const handleCardClick = (name: string) => {
    router.push(`/dashboard/flashcards?id=${name}`);
  };

  return (
    <div className="mt-28 mb-24 max-sm:mt-24 px-5 space-y-10 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <h1
          className="text-5xl sm:text-6xl font-extrabold text-[#1476bc]"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Your Dashboard
        </h1>
        <i
          className="text-lg sm:text-xl font-light block text-slate-600"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Flashcard Collection
        </i>
      </div>

      <Link href="/dashboard/flashcards" className="block">
        <div className="hover:bg-slate-50 bg-white border-2 border-dashed border-[#1476bc] text-[#1476bc] p-8 rounded-xl shadow-md transition-all hover:shadow-lg hover:scale-[1.01] flex items-center justify-center gap-3 max-w-md mx-auto">
          <FaPlus />
          <span className="text-xl font-semibold">Generate New Set</span>
        </div>
      </Link>

      {loading ? (
        <p className="text-center text-slate-500">Loading your sets…</p>
      ) : flashcards.length === 0 ? (
        <div className="flex flex-col items-center gap-3 text-slate-500 py-10">
          <FaLayerGroup size={32} className="text-[#9fbedb]" />
          <p className="text-lg">No flashcard sets yet.</p>
          <p className="text-sm">
            Hit "Generate New Set" above to create your first one.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((flashcard, index) => (
            <figure
              className="hover:cursor-pointer hover:border-[#1476bc] bg-white border-2 border-transparent p-8 rounded-xl flex flex-col items-center justify-center gap-3 text-black shadow-md transition-all hover:shadow-lg hover:scale-[1.02] min-h-[140px]"
              key={index}
              onClick={() => handleCardClick(flashcard.name)}
            >
              <h3 className="text-xl font-extrabold text-[#1476bc] text-center">
                {flashcard.name}
              </h3>
            </figure>
          ))}
        </section>
      )}
    </div>
  );
};

export default Dashboard;