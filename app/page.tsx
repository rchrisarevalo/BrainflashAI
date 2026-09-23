"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import ReactGA from "react-ga4";

import "@fontsource/raleway";
import "@fontsource/roboto";

import Navigation from "./components/Nav";
import Footer from "./components/Footer";
import roundLogo from "./images/roundLogo.png";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/",
      title: "Home Page",
    });
  }, []);

  return (
    <main
      className="flex min-h-screen w-full flex-col bg-gradient-to-t from-[#1476bc] via-[#9fbedb] to-[#ffffff] overflow-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <Navigation />

      <div className="flex flex-1 items-center justify-center px-6 py-16 sm:px-10 sm:py-20">
        <div className="flex w-full max-w-4xl flex-col space-y-14 sm:space-y-16">
          <div className="flex flex-col items-center gap-12 sm:flex-row sm:gap-10">
            <div className="flex w-full flex-col space-y-8 sm:w-1/2 sm:space-y-10">
              <section className="space-y-4 px-2 text-center sm:space-y-5 sm:px-6 sm:text-left">
                <h1
                  className="text-4xl font-extrabold text-[#1476bc] sm:text-5xl md:text-6xl"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  BrainflashAI
                </h1>

                <h2 className="text-xl font-light text-gray-700 sm:text-2xl md:text-3xl">
                  Tired of sorting through endless notes?
                </h2>

                <h2 className="text-xl font-light text-gray-700 sm:text-2xl md:text-3xl">
                  Tired of those long never-ending exam prep videos?
                </h2>
              </section>

              <section className="space-y-5 px-2 text-center sm:px-6 sm:text-left">
                <p className="text-lg font-extralight leading-relaxed text-gray-600 sm:text-xl md:text-2xl">
                  Meet{" "}
                  <strong
                    className="text-[#1476bc]"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    BrainflashAI
                  </strong>
                  , the AI-powered flashcard app that transforms your{" "}
                  <strong>lecture notes</strong> into{" "}
                  <strong>easy-to-use flashcards</strong>, helping you memorize
                  and understand concepts better!
                </p>
              </section>
            </div>

            <div className="flex w-full items-center justify-center sm:w-1/2">
              <img
                src={roundLogo.src}
                alt="BrainflashAI logo"
                className="h-auto max-w-[240px] rounded-lg sm:max-w-full"
              />
            </div>
          </div>

          {!isSignedIn ? (
            <>
              <section className="mx-auto max-w-md px-6 text-center sm:px-0">
                <p className="text-xl font-semibold text-white sm:text-2xl">
                  Create an account or sign in to start mastering your studies!
                </p>
              </section>

              <section className="flex flex-col items-center justify-center gap-4 px-6 font-bold sm:flex-row sm:px-0">
                <button
                  type="button"
                  className="w-full rounded-lg border-2 border-white bg-white/90 px-8 py-3 text-[#1476bc] shadow-md transition-colors hover:bg-white sm:w-auto"
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  className="w-full rounded-lg bg-[#0a3f5d] px-8 py-3 text-white shadow-md transition-colors hover:bg-[#08324a] sm:w-auto"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </button>
              </section>
            </>
          ) : (
            <section className="flex flex-col justify-center gap-5 px-6 sm:flex-row sm:px-0">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <div className="flex items-center justify-center rounded-xl bg-white px-8 py-6 text-black shadow-lg transition-transform hover:scale-105 hover:bg-slate-100">
                  <span className="text-xl font-semibold">My Dashboard</span>
                </div>
              </Link>

              <Link
                href="/dashboard/flashcards"
                className="w-full sm:w-auto"
              >
                <div className="flex items-center justify-center rounded-xl bg-white px-8 py-6 text-black shadow-lg transition-transform hover:scale-105 hover:bg-slate-100">
                  <span className="text-xl font-semibold">
                    Generate New Set
                  </span>
                </div>
              </Link>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}