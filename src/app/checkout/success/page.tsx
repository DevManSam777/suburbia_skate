"use client";

import Link from "next/link";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { FaCircleCheck } from "react-icons/fa6";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-texture bg-brand-gray flex items-center justify-center">
      <Bounded className="text-center">
        <div className="flex justify-center mb-6">
          <FaCircleCheck className="text-green-500 text-6xl" />
        </div>
        <Heading className="mb-6" as="h1">
          Order Successful!
        </Heading>
        <p className="text-xl mb-4 max-w-2xl mx-auto">
          Thank you for your purchase! Your custom skateboard order has been confirmed.
        </p>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          This is a demo site using PayPal Sandbox - no real payment was processed.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-purple px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </Bounded>
    </div>
  );
}
