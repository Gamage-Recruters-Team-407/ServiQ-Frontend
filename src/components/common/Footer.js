import Link from "next/link";

const footerGroups = [
  {
    title: "Explore Services",
    links: [
      { label: "All Services", href: "/services" },
      { label: "Compare Services", href: "/services/compare" },
    ],
  },
  {
    title: "For Providers",
    links: [
      { label: "Become a Provider", href: "/register" },
      { label: "Provider Dashboard", href: "/provider/dashboard" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-7 sm:px-8">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight text-slate-900"
            >
              Servi<span className="text-orange-500">Q</span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
              Connecting customers with trusted service professionals. Discover,
              compare and book services with confidence.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-bold text-slate-900">
                {group.title}
              </h3>

              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-orange-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Why Choose ServiQ?
            </h3>

            <ul className="mt-3 space-y-3">
              <li className="text-sm text-slate-500">
                🛡️ Identity Verified Providers
              </li>
              <li className="text-sm text-slate-500">
                🔒 Escrow Payment Protection
              </li>
              <li className="text-sm text-slate-500">
                ⚖️ Structured Dispute Resolution
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-slate-100 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ServiQ. All rights reserved.</p>
          <p>Made for better service experiences.</p>
        </div>
      </div>
    </footer>
  );
}
