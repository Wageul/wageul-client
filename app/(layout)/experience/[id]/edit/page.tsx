export default async function Page({ params }: { params: { id: string } }) {
  return <p>Edit Experience {params.id} Page</p>;
}
