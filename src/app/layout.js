"use client";
import Link from "next/link";
import "./globals.css";
import { useEffect, useState } from "react";

/* export const metadata = {
  title: "Web Tutorials",
  description: "Generated by kks",
}; */

export default function RootLayout({ children }) {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/topics")
      .then((response) => response.json())
      .then((json) => setTopics(json));
  }, []);
  return (
    <html>
      <body>
        <h1>
          <Link href="/">WEB</Link>
        </h1>
        <ol>
          {topics.map((topic) => (
            <li key={topic.id}>
              <Link href={`/read/${topic.id}`}>{topic.title}</Link>
            </li>
          ))}
        </ol>
        {children}
        <ul>
          <li>
            <Link href="/create">Create</Link>
          </li>
          <li>
            <Link href="/update/1">Update</Link>
          </li>
          <li>
            <input type="button" value="Delete" />
          </li>
        </ul>
      </body>
    </html>
  );
}
