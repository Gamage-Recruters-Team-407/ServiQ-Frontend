// export default async function ServiceDetailPage({ params }) {
//   const { id } = await params;
//   return (
//     <div className="container">
//       <h1>Service Details</h1>
//       <p>Service detail placeholder for ID: {id} (SRS §9.4)</p>
//     </div>
//   );
// }


"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import useApi from "@/utils/useApi";
import { serviceService } from "@/services/serviceService";
import { formatPrice } from "@/utils/catalogue";
import { ui } from "@/utils/ui";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/CatalogueStatusBadge";

function Row({ label, children }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="font-semibold">{children}</dd>
    </div>
  );
}

export default function ServiceDetailPage() {
  const { id } = useParams();
  const { data: service, loading, error } = useApi(() => serviceService.getServiceById(id), [id]);

  if (error) {
    return (
      <div className={`${ui.wrap} py-16`}>
        <EmptyState title="Service not found" message="This service does not exist or is no longer available.">
          <Link href="/services" className={ui.btnPrimary}>Browse services</Link>
        </EmptyState>
      </div>
    );
  }
  if (loading || !service) {
    return <div className={`${ui.wrap} py-16`}><div className="h-64 animate-pulse rounded-xl bg-surface" /></div>;
  }

  const cat = service.category_id;
  const cov = service.coverage || {};

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Categories", href: "/categories" },
          ...(cat ? [{ label: cat.name, href: `/categories/${cat.slug}` }] : []),
          { label: service.name },
        ]}
        title={service.name}
      >
        <div className="mt-2.5"><StatusBadge status={service.status} /></div>
      </PageHeader>

      <div className={`${ui.wrap} pb-16 pt-8`}>
        <div className="grid items-start gap-6 md:grid-cols-[2fr_1fr]">
          <div className={`${ui.card} p-6`}>
            {service.images?.[0] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={service.images[0]} alt={service.name} className="mb-4 max-h-72 w-full rounded-lg object-cover" />
            )}
            <h2 className="mb-2.5 text-xl font-semibold">About this service</h2>
            <p className="whitespace-pre-line">{service.description}</p>
            {service.availability_info && (
              <>
                <h3 className="mb-2 mt-5 font-semibold">Availability</h3>
                <p className="text-muted">{service.availability_info}</p>
              </>
            )}
          </div>

          <aside className={`${ui.card} p-6`}>
            <dl className="grid gap-3.5">
              <Row label="Price">{formatPrice(service.price)}</Row>
              {service.duration_minutes > 0 && <Row label="Duration">{service.duration_minutes} minutes</Row>}
              {cat && <Row label="Category">{cat.name}</Row>}
              <Row label="Coverage">
                {cov.coverage_area || cov.supported_locations?.length ? (
                  <>
                    {cov.coverage_area && <span className="block">{cov.coverage_area}{cov.radius_km > 0 ? ` (${cov.radius_km} km)` : ""}</span>}
                    {cov.supported_locations?.length > 0 && (
                      <span className="mt-1.5 flex flex-wrap gap-1.5">
                        {cov.supported_locations.map((l) => <span key={l} className={ui.chip}>{l}</span>)}
                      </span>
                    )}
                  </>
                ) : "Not specified"}
              </Row>
            </dl>
            {/* Booking / provider profile: the booking module hooks in here (service id = service._id) */}
          </aside>
        </div>
      </div>
    </>
  );
}