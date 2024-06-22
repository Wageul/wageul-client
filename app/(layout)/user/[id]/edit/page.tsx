export default async function Page({ params }: { params: { id: string } }) {
  return <p>Edit User {params.id} Page</p>;
}
