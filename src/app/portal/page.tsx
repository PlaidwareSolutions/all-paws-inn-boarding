"use client";

import { useEffect, useState } from "react";
import { SignIn } from "@/components/portal/SignIn";
import { Dashboard } from "@/components/portal/Dashboard";

const KEY = "api:session";

export default function PortalPage() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect -- initialises from a client-only
     source (browser storage, or today's date) that does not exist during SSR. Doing it
     after mount is precisely what keeps the server and client markup identical. */
  useEffect(() => {
    try {
      setSignedIn(window.localStorage.getItem(KEY) === "1");
    } catch {
      setSignedIn(false);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const set = (v: boolean) => {
    try {
      if (v) window.localStorage.setItem(KEY, "1");
      else window.localStorage.removeItem(KEY);
    } catch { /* ignore */ }
    setSignedIn(v);
  };

  if (signedIn === null) return <div className="min-h-[60svh] pt-(--header-h)" />;

  return (
    <div className="pt-(--header-h)">
      {signedIn ? <Dashboard onSignOut={() => set(false)} /> : <SignIn onSignIn={() => set(true)} />}
    </div>
  );
}
