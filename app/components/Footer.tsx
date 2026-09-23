import React from "react";

const Footer = () => {
  return (
    <footer className="w-screen bottom-0 bg-white px-4 py-8 text-black sm:px-8">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center text-center">
        <p className="mt-4 text-sm text-slate-600">
          Managed and maintained by{" "}
          <a
            href="https://rubenarevalo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-800 underline decoration-slate-400 underline-offset-4 transition-colors hover:text-blue-700"
          >
            Ruben Arevalo AI &amp; Software Studio
          </a>
          .
        </p>

        <p className="mt-2 text-sm text-slate-600">
          Originally created in 2024 by Ruben Arevalo,{" "}
          <a
            href="https://mauro-castillo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-800 underline decoration-slate-400 underline-offset-4 transition-colors hover:text-blue-700"
          >
            Mauro Castillo
          </a>
          ,{" "}
          <a
            href="https://maviyay.github.io/Personal-Website/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-800 underline decoration-slate-400 underline-offset-4 transition-colors hover:text-blue-700"
          >
            Maviya Yaseen
          </a>
          , and Henry Tran.
        </p>

        <p className="mt-2 text-sm text-slate-600">
          © 2024–2026 BrainflashAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
