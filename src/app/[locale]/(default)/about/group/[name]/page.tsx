import NotFoundPage from "@/app/not-found";
import { groupMockData as groupData } from "@/mock-data/groups";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function GroupPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const groupExists = groupData.find((groupName) => groupName.id === name);
  if (!groupExists) {
    return notFound();
  }
  return (
    <>
      <h1>{groupExists.name}</h1>
      <h3>{groupExists.description}</h3>
      <div>
        <div>
          <div className="relative z-10 h-44 w-44 self-center">
            <Image
              className="rounded-full object-cover object-center"
              src={`/${groupExists.photoUrl}`}
              alt={name}
              fill
            />
          </div>
        </div>
      </div>
    </>
  );
}
