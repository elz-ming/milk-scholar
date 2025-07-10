"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Bucket_A_questions } from "@/app/data/questionBank"; // ✅ adjust path!
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; // ✅ adjust path!

type User = {
  display_name: string;
  profile_pic_url?: string;
  telegramUsername: string;
  telegramUserId: string | number;
  [key: string]: any; // for dynamic fields
};

export default function UserProfile() {
  const router = useRouter();
  const { encodedId } = useParams();
  const decodedId = decodeURIComponent(encodedId as string);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!decodedId) return;

      const userRef = doc(db, "milk-scholar-applications", decodedId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUser(userSnap.data() as User);
      } else {
        console.error("No user found");
      }

      setLoading(false);
    };

    fetchUser();
  }, [decodedId]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return <div className="p-4 text-red-500">User not found</div>;

  const imageSrc =
    user.profile_pic_url?.trim() !== "" && user.profile_pic_url
      ? user.profile_pic_url
      : "/default-avatar.png";

  // ✅ Find which Bucket A questions exist in the doc and have a value
  const answered = Bucket_A_questions.filter(
    (q) => user[q.key] && user[q.key] !== ""
  ).sort((a, b) => a.order - b.order);

  return (
    <div className="p-4">
      {/* Top Bar */}
      <header className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()}>
          <ArrowLeft size={32} />
        </button>
      </header>

      {/* Profile */}
      <div className="flex items-center gap-4 mb-8">
        <Image
          src={imageSrc}
          alt={user.display_name || user.telegramUsername}
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold">
          {user.display_name || user.telegramUsername}
        </h1>
      </div>

      {/* Answers */}
      <div className="flex flex-col gap-4">
        {answered.map((q) => (
          <div key={q.key} className="border p-4 rounded bg-white shadow-sm">
            <p className="font-semibold">{q.text}</p>
            <p className="text-gray-700">{user[q.key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
