import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border-light)] bg-[var(--bg-main)] py-4">
      <div className="mx-auto w-full max-w-[1380px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-8">
          <div className="flex flex-col justify-center gap-1 text-left max-w-xs">
            <div className="mb-2 flex justify-start items-center gap-2"></div>
            <p className="text-[0.75rem] leading-[1.5] text-[var(--text-secondary)]">
              AI-Powered Local Services Marketplace connecting verified
              professionals with customers across Sri Lanka with transparent
              pricing, instant booking, and secure escrow payments.
            </p>
          </div>

          <div className="flex flex-col items-end text-left">
            <ul className="flex list-none flex-col gap-[0.6rem] p-0 items-start">
              <li className="flex items-center gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7s0 6 8 10z" />
                </svg>
                <span className="text-[0.8rem] text-[var(--text-secondary)]">
                  Identity Verified Providers
                </span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-[0.8rem] text-[var(--text-secondary)]">
                  Escrow Payment Protection
                </span>
              </li>

              <li className="flex items-center gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <span className="text-[0.8rem] text-[var(--text-secondary)]">
                  Structured Dispute Resolution
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-[var(--border-light)] pt-3 text-center text-[0.85rem] text-[var(--text-secondary)] sm:text-left">
          <div className="flex-1">
            © 2026 All rights reserved. ServiQ Marketplace.
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-end">
            <span className="cursor-pointer transition-colors duration-200 ease-[ease-in-out]">
              Privacy Policy
            </span>
            <span className="cursor-pointer transition-colors duration-200 ease-[ease-in-out]">
              Terms of Service
            </span>
            <span className="cursor-pointer transition-colors duration-200 ease-[ease-in-out]">
              Dispute Policies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
