export default async function BookingDetailPage({ params }) {
  const { id } = await params;
  return (
    <div className="mx-auto w-full max-w-[1280px] px-6">
      <h1>Booking Details</h1>
      <p>Booking details and status timeline placeholder for ID: {id} </p>
    </div>
  );
}
