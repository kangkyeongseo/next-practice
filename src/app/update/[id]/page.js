"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const onSumbit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    fetch(`http://localhost:9999/topics/${props.params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    })
      .then((response) => response.json())
      .then((json) => {
        const lastId = json.id;
        router.push(`/read/${lastId}`);
        router.refresh();
      });
  };
  useEffect(() => {
    fetch(`http://localhost:9999/topics/${props.params.id}`)
      .then((response) => response.json())
      .then((json) => {
        setTitle(json.title);
        setBody(json.body);
      });
  }, []);

  return (
    <form onSubmit={onSumbit}>
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
