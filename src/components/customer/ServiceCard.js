// export default function ServiceCard({ service }) {
//   return (
//     <div className="glass-panel" style={{ padding: "1.5rem" }}>
//       <h3>{service?.title || "Service Title"}</h3>
//       <p>{service?.description || "Service Description"}</p>
//     </div>
//   );
// }


import Link from "next/link";
import { ui } from "@/utils/ui";
import { formatPrice } from "@/utils/catalogue";

export default function ServiceCard({ service }) {
  const cat = service.category_id;
  return (
    <Link href={`/services/${service._id}`} className={ui.cardLink}>
      {cat?.name && <span className={ui.chip}>{cat.name}</span>}
      <h3 className="mb-1.5 mt-2.5 text-lg font-semibold">{service.name}</h3>
      <p className="mb-2 line-clamp-2 text-sm text-muted">{service.description}</p>
      {service.coverage?.coverage_area && (
        <p className="mb-3 text-xs text-muted">📍 {service.coverage.coverage_area}</p>
      )}
      <div className="flex items-center justify-between">
        <span className="font-bold">{formatPrice(service.price)}</span>
        <span className="text-primary">View →</span>
      </div>
    </Link>
  );
}