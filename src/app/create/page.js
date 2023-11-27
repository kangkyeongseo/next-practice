"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  const onSumbit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    fetch(`http://localhost:9999/topics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    })
      .then((response) => response.json())
      .then((json) => {
        const lastId = json.id;
        router.push(`/read/${lastId}`);
      });
  };
  return (
    <form onSubmit={onSumbit}>
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body" />
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
