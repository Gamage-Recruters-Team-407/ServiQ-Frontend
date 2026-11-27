import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#FFFFFF] border-t border-[#E2E8F0] pt-12 pb-8 text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3.5">
              <img
                src="/images/serviQ.png"
                alt="ServiQ Logo"
                className="w-7 h-7 object-contain shrink-0"
              />
              <span className="text-lg font-extrabold tracking-tight text-[#0F172A]">
                Servi<span className="text-[#F97316]">Q</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              AI-Powered Local Services Marketplace connecting verified
              professionals with customers across Sri Lanka with transparent
              pricing, instant booking, and secure escrow payments.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#0F172A] mb-3.5">
              Explore Services
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#64748B]">
              <li>
                <Link
                  href="/services?category=Home+Repairs"
                  className="hover:text-[#F97316] transition-colors"
                >
                  Home Repairs &amp; Maintenance
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Electrical"
                  className="hover:text-[#F97316] transition-colors"
                >
                  Electrical Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Plumbing"
                  className="hover:text-[#F97316] transition-colors"
                >
                  Plumbing &amp; Sanitation
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Cleaning"
                  className="hover:text-[#F97316] transition-colors"
                >
                  Deep Cleaning &amp; Janitorial
                </Link>
              </li>
              <li>
                <Link
                  href="/services/compare"
                  className="hover:text-[#F97316] transition-colors"
                >
                  Provider Comparison
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#0F172A] mb-3.5">
              For Providers
            </h4>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#64748B]">
              <li>
                <Link
                  href="/register?role=provider"
                  className="hover:text-[#F97316] transition-colors"
                >
                  Become a Service Provider
                </Link>
              </li>
              <li>
                <Link
                  href="/provider/dashboard"
                  className="hover:text-[#F97316] transition-colors"
                >
                  Provider Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/provider/earnings"
                  className="hover:text-[#F97316] transition-colors"
                >
                  Earnings &amp; Payouts
                </Link>
              </li>
              <li>
                <Link
                  href="/provider/availability"
                  className="hover:text-[#F97316] transition-colors"
                >
                  Calendar &amp; Scheduling
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#0F172A] mb-3.5">
              Platform &amp; Trust
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#64748B]">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#15803D] shrink-0" />
                <span>Identity Verified Providers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F97316] shrink-0" />
                <span>Escrow Payment Protection</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B45309] shrink-0" />
                <span>Structured Dispute Resolution</span>
              </li>
              <li>
                <Link
                  href="/admin/analytics"
                  className="font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors"
                >
                  Platform Administration
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E2E8F0] pt-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#64748B]">
          <div>
            © 2026 Gamage Recruiters (Pvt) Ltd. All rights reserved. ServiQ
            Marketplace SRS v1.0.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#0F172A] transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-[#0F172A] transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-[#0F172A] transition-colors">
              Dispute Policies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
