"use client";

import { useState, useEffect, Suspense } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
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

  useEffect(() => {
    const initialize = async () => {
      try {
        if (launchParams) {
          try {
            const encodedGroupId =
              launchParams.tgWebAppStartParam ??
              launchParams?.tgWebAppData?.start_param ??
              launchParams?.startapp ??
              null;

            const decodedGroupId = atob(encodedGroupId as string);
            console.log("Decoded Group ID:", decodedGroupId);
            setGroupId(decodedGroupId);
          } catch (error) {
            console.error("Error decoding group ID:", error);
            setError("Invalid group ID format");
          }
        } else {
          console.log("No launchParams available");
          setError(`launchParams: ${JSON.stringify(launchParams)}`);
        }
      } catch (error) {
        console.error("Error in initializeComponent:", error);
        setError("An error occurred while initializing the component");
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [launchParams]);

  if (isLoading) return <div className="p-4">Loading MILK App...</div>;

  if (error) return <div className="p-4 text-red-500">{error}</div>;

  if (!groupId) return <div className="p-4">No valid group ID found.</div>;

  return (
    <div className="min-h-screen bg-white p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">MILK Dashboard</h1>
      <main>
        <p className="text-sm text-gray-600 mb-4">User ID: {groupId}</p>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <MILKDashboardClient />
    </Suspense>
  );
}
