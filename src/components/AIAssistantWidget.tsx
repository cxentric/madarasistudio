"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; content: string };

type ProductContext = { name: string; kind: string } | undefined;

const STARTER_PROMPTS = [
  "A gift for my grandmother's 70th birthday",
  "Something for a friend moving away from Chennai",
  "A journal to start the new year with",
];

export function AIAssistantWidget({
  variant = "floating",
  productContext,
}: {
  variant?: "floating" | "inline";
  productContext?: ProductContext;
}) {
  const [open, setOpen] = useState(variant === "inline");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Tell me who this is for and the occasion, and I'll suggest a book, a cover colour, and a personalisation idea.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, productContext }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const panel = (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-mist bg-cloud shadow-xl",
        variant === "floating" ? "h-[28rem] w-[22rem]" : "h-[26rem] w-full"
      )}
    >
      <div className="flex items-center justify-between border-b border-mist px-4 py-3">
        <div>
          <p className="font-display text-sm text-pine">Ask your Madarasi!</p>
          <p className="text-xs text-pine/50">Personalisation ideas, on the spot</p>
        </div>
        {variant === "floating" && (
          <button
            onClick={() => setOpen(false)}
            aria-label="Close assistant"
            className="text-pine/50 hover:text-pine"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
              m.role === "assistant"
                ? "bg-ivory text-pine/90"
                : "ml-auto bg-olive text-ivory"
            )}
          >
            {m.content}
          </div>
        ))}
        {loading && <div className="max-w-[85%] rounded-lg bg-ivory px-3 py-2 text-sm text-pine/50">Thinking…</div>}
        {error && <p className="text-xs text-rust">{error}</p>}

        {messages.length === 1 && (
          <div className="flex flex-col gap-2 pt-2">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => send(prompt)}
                className="rounded-lg border border-mist px-3 py-2 text-left text-xs text-pine/70 hover:border-olive hover:text-pine"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-mist p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Who's this book for?"
          className="w-full rounded-md border border-mist bg-ivory px-3 py-2 text-sm text-pine placeholder:text-pine/35 focus:border-olive"
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 rounded-md bg-olive px-3 py-2 text-sm font-medium text-ivory transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );

  if (variant === "inline") return panel;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        panel
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-olive px-4 py-3 text-sm font-medium text-ivory shadow-lg transition-transform hover:scale-[1.03]"
        >
          <SparkIcon className="h-4 w-4" />
          Ask your Madarasi!
        </button>
      )}
    </div>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l1.8 5.6L19 9.4l-5.2 1.8L12 17l-1.8-5.8L5 9.4l5.2-1.8L12 2z" />
    </svg>
  );
}
