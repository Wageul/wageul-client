export default async function Page({ params }: { params: { id: string } }) {
  return <p>User {params.id} Page</p>;
}
