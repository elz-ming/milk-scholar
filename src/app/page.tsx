"use client";

import { useState, useEffect, Suspense } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import ToDoList from "@/app/subcomponents/ToDoList";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues
const MILKDashboardClient = dynamic(() => Promise.resolve(MILKDashboard), {
  ssr: false,
});

function MILKDashboard() {
  const [groupId, setGroupId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const launchParams = useLaunchParams();
  // const launchParams = "NjYzODczODU0MA==";

  useEffect(() => {
    const initialize = async () => {
      try {
        if (launchParams) {
          const encodedGroupId =
            launchParams.tgWebAppStartParam ??
            launchParams?.tgWebAppData?.start_param ??
            launchParams?.startapp ??
            null;

          // const encodedGroupId = launchParams;

          if (encodedGroupId) {
            // Clear any old keys you care about
            localStorage.removeItem("encoded_id");
            localStorage.removeItem("encoded_id_ready");

            // Store new encoded ID
            localStorage.setItem("encoded_id", encodedGroupId as string);
            localStorage.setItem("encoded_id_ready", "true");

            const decodedGroupId = atob(encodedGroupId as string);
            setGroupId(decodedGroupId);
          } else {
            setError("Missing group ID");
          }
        } else {
          setError("launchParams missing or invalid");
        }
      } catch (err) {
        console.error("Error initializing:", err);
        setError("An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [launchParams]);

  if (isLoading) return <div className="p-4">Loading MILK App...</div>;

  if (error) return <div className="p-4 text-red-500">{error}</div>;

  if (!groupId) return <div className="p-4">No valid group ID found.</div>;

  return <ToDoList />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <MILKDashboardClient />
    </Suspense>
  );
}
