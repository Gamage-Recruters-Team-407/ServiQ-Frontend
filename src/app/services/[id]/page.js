export default async function ServiceDetailPage({ params }) {
  const { id } = await params;
  return (
    <div className="container">
      <h1>Service Details</h1>
      <p>Service detail placeholder for ID: {id} (SRS §9.4)</p>
    </div>
  );
}
