'use client'

import { useState } from "react";
import { markPersonFound } from "@/services/updateMissingPerson";

export default function FoundButton({ id }) {

  const [loading, setLoading] = useState(false);

  async function handleFound() {

    setLoading(true);

    await markPersonFound(id);

    alert("Person marked as FOUND.");

    setLoading(false);

  }

  return (

    <button
      onClick={handleFound}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >

      {loading ? "Updating..." : "Mark as Found"}

    </button>

  );

}