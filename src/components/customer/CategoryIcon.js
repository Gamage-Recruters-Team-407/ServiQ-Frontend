const EMOJI = {
  plumbing: "🔧", electrical: "⚡", cleaning: "🧹", painting: "🎨",
  gardening: "🌿", "appliance-repair": "🔌", "ac-repair": "❄️",
};

export default function CategoryIcon({ category }) {
  if (category?.icon_url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={category.icon_url} alt="" className="h-7 w-7 object-contain" />;
  }
  return <span aria-hidden="true">{EMOJI[category?.slug] || "🛠️"}</span>;
}