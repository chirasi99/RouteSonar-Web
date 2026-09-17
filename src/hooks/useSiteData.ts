// src/hooks/useSiteData.ts
import { useState, useEffect } from "react";
import {
  doc, getDoc,
  collection, getDocs,
  query, orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";
import type { SiteData } from "../types";

const useSiteData = () => {
  const [data,    setData]    = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Fetch a single "main" document from a collection
        const fetchMain = async <T>(colName: string): Promise<T | null> => {
          const snap = await getDoc(doc(db, colName, "main"));
          if (!snap.exists()) {
            console.warn(`[useSiteData] ⚠️  "${colName}/main" not found in Firestore.`);
            return null;
          }
          const raw = snap.data() as T;
          return raw;
        };

        // Fetch all news documents ordered by date desc
        const newsSnap = await getDocs(
          query(collection(db, "news"), orderBy("date", "desc"))
        );
        const news = newsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        const [navbar, hero, stats, features, steps, pricing, clients, testimonials, footer] =
          await Promise.all([
            fetchMain("navbar"),
            fetchMain("hero"),
            fetchMain("stats"),
            fetchMain("features"),
            fetchMain("steps"),
            fetchMain("pricing"),
            fetchMain("clients"),
            fetchMain("testimonials"),
            fetchMain("footer"),
          ]);

        setData({
          navbar:       navbar       as SiteData["navbar"],
          hero:         hero         as SiteData["hero"],
          stats:        stats        as SiteData["stats"],
          features:     features     as SiteData["features"],
          steps:        steps        as SiteData["steps"],
          pricing:      pricing      as SiteData["pricing"],
          clients:      clients      as SiteData["clients"],
          testimonials: testimonials as SiteData["testimonials"],
          news:         news         as SiteData["news"],
          footer:       footer       as SiteData["footer"],
        });

      } catch (e: any) {
        console.error("[useSiteData] ❌ Fetch failed:", e);
        setError(e?.message ?? "Unknown Firestore error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading, error };
};

export default useSiteData;