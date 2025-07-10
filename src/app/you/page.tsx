"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import {
  Bucket_A_questions,
  Bucket_B_questions,
} from "@/app/data/questionBank";
import FieldItem from "./subcomponents/FieldItem";

type UserDoc = {
  name: string;
  bucketAResponse?: Record<string, string>;
  bucketBResponse?: Record<string, string>;
};

export default function YouPage() {
  const [telegramId, setTelegramId] = useState<string | null>(null);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState(true);

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("encoded_id");
    if (storedId) {
      const decodedId = atob(storedId);
      setTelegramId(decodedId);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!telegramId) return;

      const ref = doc(db, "milk-scholar-applications", telegramId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        if (data && typeof data.name === "string") {
          const typedDoc: UserDoc = {
            name: data.name,
            bucketAResponse: data.bucketAResponse ?? {},
            bucketBResponse: data.bucketBResponse ?? {},
          };
          setUserDoc(typedDoc);
        } else {
          console.error("Invalid Firestore doc shape: missing name");
          setUserDoc(null);
        }
      } else {
        setUserDoc(null);
      }

      setLoading(false);
    };

    fetchUser();
  }, [telegramId]);

  const startEditing = (bucket: "A" | "B", key: string, value: string) => {
    setEditingKey(`${bucket}_${key}`);
    setEditingValue(value);
  };

  const saveEdit = async (bucket: "A" | "B", key: string) => {
    if (!telegramId) return;

    const ref = doc(db, "milk-scholar-applications", telegramId);
    const fieldPath =
      bucket === "A" ? `bucketAResponse.${key}` : `bucketBResponse.${key}`;
    await updateDoc(ref, { [fieldPath]: editingValue });

    setUserDoc((prev: UserDoc | null) => {
      if (!prev) return prev; // Defensive: should never happen, but safe.

      return {
        ...prev,
        [`bucket${bucket}Response`]: {
          ...prev[`bucket${bucket}Response`],
          [key]: editingValue,
        },
      };
    });
    setEditingKey(null);
    setEditingValue("");
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!userDoc) return <div className="p-4 text-red-500">User not found</div>;

  return (
    <main className="my-20 bg-gray-200 text-black overflow-y-auto">
      {/* Top profile section */}
      <section className="flex items-center gap-6 p-6 bg-white shadow-md">
        <Image
          src="/default-avatar.png"
          alt={userDoc.name}
          width={100}
          height={100}
          className="rounded-full"
        />
        <h1 className="text-3xl font-bold">{userDoc.name}</h1>
      </section>

      {/* Bucket A */}
      <section className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        {Bucket_A_questions.map((q) => {
          const val = userDoc.bucketAResponse?.[q.key] || "";
          const isEditing = editingKey === `A_${q.key}`;
          return (
            <FieldItem
              key={q.key}
              label={q.text}
              value={val}
              isEditing={isEditing}
              editingValue={editingValue}
              onChange={setEditingValue}
              onStartEdit={() => startEditing("A", q.key, val)}
              onSave={() => saveEdit("A", q.key)}
            />
          );
        })}
      </section>

      {/* Bucket B */}
      <section className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-semibold">Advanced Information</h2>
        {Bucket_B_questions.map((q) => {
          const val = userDoc.bucketBResponse?.[q.key] || "";
          const isEditing = editingKey === `B_${q.key}`;
          return (
            <FieldItem
              key={q.key}
              label={q.text}
              value={val}
              isEditing={isEditing}
              editingValue={editingValue}
              onChange={setEditingValue}
              onStartEdit={() => startEditing("B", q.key, val)}
              onSave={() => saveEdit("B", q.key)}
            />
          );
        })}
      </section>
    </main>
  );
}
