"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function PricingPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(null);

  const handleCheckout = async (planId) => {
    if (!session) {
      signIn("google");
      return;
    }

    try {
      setLoading(planId);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!res.ok) throw new Error("Failed to create checkout");

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert("Checkout error. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      id: "basic",
      name: "Basic Pack",
      price: "$5.00",
      credits: 1000,
      description: "Ideal for small sellers starting with Amazon ad listings.",
      features: [
        "Up to 55 full high-res generations (18 credits each)",
        "Support for up to 14 reference product photos",
        "Custom descriptive prompt support",
        "Amazon-ready studio background presets",
        "Download results in high definition"
      ],
      tag: "Starter"
    },
    {
      id: "standard",
      name: "Standard Pack",
      price: "$10.00",
      credits: 2000,
      description: "Perfect for growing stores managing regular listing updates.",
      features: [
        "Up to 111 full high-res generations (18 credits each)",
        "Support for up to 14 reference product photos",
        "Custom descriptive prompt support",
        "Priority AI generation processing queue",
        "Download results in high definition"
      ],
      tag: "Best Value"
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "$20.00",
      credits: 4000,
      description: "Best for high-volume brands managing larger catalogs.",
      features: [
        "Up to 222 full high-res generations (18 credits each)",
        "Support for up to 14 reference product photos",
        "Custom descriptive prompt support",
        "Priority AI generation processing queue",
        "Premium customer support",
        "Download results in high definition"
      ],
      tag: "Popular"
    },
    {
      id: "business",
      name: "Business Pack",
      price: "$50.00",
      credits: 10000,
      description: "Ultimate bundle designed for agencies and aggregate sellers.",
      features: [
        "Up to 555 full high-res generations (18 credits each)",
        "Support for up to 14 reference product photos",
        "Custom descriptive prompt support",
        "Priority AI generation processing queue",
        "24/7 dedicated support representative",
        "Download results in high definition"
      ],
      tag: "Corporate"
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Simple, Credit-Based Pricing
        </h1>
        <p className="mt-3 text-zinc-400 max-w-md mx-auto text-sm">
          Top up your account with credits to generate photorealistic product ad scenes. Each generation costs exactly 18 credits.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-col justify-between bg-zinc-900 border border-zinc-800/80 p-8 rounded-lg transition-all hover:border-zinc-700/80 hover:shadow-xl hover:shadow-violet-950/5 relative overflow-hidden group"
          >
            {/* Ambient background glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl group-hover:bg-violet-600/20 transition-all duration-500" />
            
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-violet-500/10 text-violet-400 text-xs font-semibold border border-violet-500/20">
                  {plan.tag}
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">{plan.description}</p>
              
              <div className="mt-6 flex items-baseline">
                <span className="text-3xl font-extrabold tracking-tight text-white">{plan.price}</span>
                <span className="ml-1 text-sm text-zinc-500">/ one-time</span>
              </div>

              <div className="mt-6 py-2.5 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-300">Credits Included</span>
                <span className="text-lg font-bold text-violet-400">{plan.credits} credits</span>
              </div>

              <ul className="mt-6 space-y-3.5 border-t border-zinc-800 pt-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-zinc-300">
                    <FaCheck className="mt-0.5 text-violet-500 flex-shrink-0 text-[10px]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout(plan.id)}
              disabled={loading !== null}
              className="mt-8 w-full py-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-sm transition-all cursor-pointer shadow-md shadow-violet-950/20 hover:scale-[1.01]"
            >
              {loading === plan.id ? "Redirecting..." : `Buy ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
