import { UserProfile } from "@clerk/nextjs";
import { Bounded } from "@/components/Bounded";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-texture bg-brand-gray py-12">
      <Bounded>
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
