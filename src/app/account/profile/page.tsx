import { UserProfile } from "@clerk/nextjs";
import { Bounded } from "@/components/Bounded";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-texture bg-brand-gray py-12">
      <Bounded>
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-brand-purple transition-colors mb-6"
        >
          <FaArrowLeft />
          <span className="font-semibold">Back to Account</span>
        </Link>
        <div className="flex justify-center">
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-2xl",
              },
            }}
          />
        </div>
      </Bounded>
    </div>
  );
}
