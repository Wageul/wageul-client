export default async function Page({ params }: { params: { id: string } }) {
  return <p>Experience {params.id} Page</p>;
}
