"use client";
import { useRouter } from "next/navigation";
import Navigation from "./components/Nav";
import { useAuth } from "@clerk/nextjs";
import "@fontsource/raleway";
import "@fontsource/roboto";
import Link from "next/link";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import roundLogo from "./images/roundLogo.png";

export default function Home() {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home Page" });
  }, []);

  return (
    <main
      className="flex min-h-screen bg-gradient-to-t from-[#1476bc] via-[#9fbedb] to-[#ffffff] flex-col items-center justify-center p-6 sm:p-10"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <Navigation />
      <div className="flex flex-col mt-32 mb-24 sm:mt-36 sm:mb-36 space-y-14 sm:space-y-16 w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center gap-12 sm:gap-10">
          <div className="flex flex-col space-y-8 sm:space-y-10 w-full sm:w-1/2">
            <section className="text-center sm:text-left space-y-4 sm:space-y-5 px-2 sm:px-6">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1476bc]"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                BrainflashAI
              </h1>
              <h5 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-700">
                Tired of sorting through endless notes?
              </h5>
              <h5 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-700">
                Tired of those long never-ending exam prep videos?
              </h5>
            </section>
            <section className="text-center sm:text-left space-y-5 px-2 sm:px-6">
              <p className="text-lg sm:text-xl md:text-2xl font-extralight text-gray-600 leading-relaxed">
                Meet{" "}
                <b
                  className="text-[#1476bc]"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  BrainflashAI
                </b>
                , the AI-powered flashcard app that transforms your{" "}
                <b>lecture notes</b> into <b>easy-to-use flashcards</b>,
                helping you memorize and understand concepts better!
              </p>
            </section>
          </div>
          <div className="flex items-center justify-center w-full sm:w-1/2">
            <img
              src={roundLogo.src}
              alt="BrainflashAI Preview"
              className="max-w-[240px] sm:max-w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {!auth?.isSignedIn ? (
          <>
            <section className="text-center px-6 sm:px-0 max-w-md mx-auto">
              <p className="text-xl sm:text-2xl font-semibold text-white">
                Create an account or sign in to start mastering your studies!
              </p>
            </section>
            <section className="flex flex-col sm:flex-row items-center font-bold gap-4 justify-center px-6 sm:px-0">
              <button
                className="w-full sm:w-auto px-8 py-3 bg-white/90 text-[#1476bc] border-2 border-white rounded-lg hover:bg-white transition-colors shadow-md"
                onClick={() => router.push("/login")}
              >
                Sign In
              </button>
              <button
                className="w-full sm:w-auto px-8 py-3 bg-[#0a3f5d] text-white rounded-lg hover:bg-[#08324a] transition-colors shadow-md"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
            </section>
          </>
        ) : (
          <section className="flex flex-col sm:flex-row justify-center gap-5 px-6 sm:px-0">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <figure className="bg-white hover:bg-slate-100 text-black px-8 py-6 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center">
                <span className="text-xl font-semibold">My Dashboard</span>
              </figure>
            </Link>
            <Link href="/dashboard/flashcards" className="w-full sm:w-auto">
              <figure className="bg-white hover:bg-slate-100 text-black px-8 py-6 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center">
                <span className="text-xl font-semibold">
                  Generate New Set
                </span>
              </figure>
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}