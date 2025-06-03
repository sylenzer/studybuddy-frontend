// /hooks/useEnsureUserTokens.js
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export const useEnsureUserTokens = (user) => {
  useEffect(() => {
    if (!user?.id) return;

    const checkOrCreateUserTokens = async () => {
      const { data, error } = await supabase
        .from("user_tokens")
        .select("tokens")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("❌ Failed checking user_tokens:", error);
        return;
      }

      if (!data) {
        const { error: insertError } = await supabase
          .from("user_tokens")
          .insert({ user_id: user.id, tokens: 0 });

        if (insertError) {
          console.error("❌ Could not insert user_tokens row:", insertError);
        } else {
          console.log("✅ Created user_tokens row for:", user.id);
        }
      }
    };

    checkOrCreateUserTokens();
  }, [user?.id]);
};
