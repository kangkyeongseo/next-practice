"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control(props) {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const onDelete = () => {
    fetch(`http://localhost:9999/topics/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((json) => {
        router.push("/");
        router.refresh();
      });
  };
  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {id && (
        <>
          <li>
            <Link href={`/update/${id}`}>Update</Link>
          </li>
          <li>
            <input type="button" value="Delete" onClick={onDelete} />
          </li>
        </>
      )}
    </ul>
  );
}
