import { Container, Stack } from "@mui/material";

import { UserType } from "../../../lib/enum/user.enum";
import type { User } from "../../../lib/types/user";
import type { WishlistItem } from "./Wishlist";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import PersonalInfo from "./PersonalInfo";
import Wishlist from "./Wishlist";
import "../../../css/profile.css";

// STATIC placeholder user — replace with real selector later
const staticUser: User = {
  _id: "static-id",
  userType: UserType.USER,
  UserStatus: "ACTIVE" as any,
  userAuth: "PHONE" as any,
  userPhone: "+1 (720) 555-0142",
  userNick: "Marcus Reyes",
  userPoints: "1250",
  userImage:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format&q=80",
  userDesc: "",
  createdAt: new Date("2023-04-12"),
  updatedAt: new Date(),
};

// STATIC placeholder stats — no Order/Wishlist type yet, wire up later
const stats = [
  { label: "Total Orders", value: "5" },
  { label: "Delivered", value: "3" },
  { label: "Money Spend", value: `$${staticUser.userPoints ?? "0"}` },
  { label: "Wishlist", value: "2" },
];

// STATIC placeholder wishlist — replace with real Bike-based selector later
const wishlistItems: WishlistItem[] = [
  {
    id: "w1",
    name: "Velocity R7",
    brand: "Specialized",
    price: "2,899",
    image:
      "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=200&h=200&fit=crop&auto=format&q=80",
  },
  {
    id: "w2",
    name: "Surge E-MTB",
    brand: "Specialized",
    price: "5,499",
    image:
      "https://images.unsplash.com/photo-1620802090791-fd9420668913?w=200&h=200&fit=crop&auto=format&q=80",
  },
];

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <Container maxWidth="lg">
        <ProfileHeader user={staticUser} />
        <ProfileStats stats={stats} />

        <Stack
          direction={{ xs: "column", lg: "row" }}
          className="profile-info-row"
        >
          <PersonalInfo user={staticUser} />
        </Stack>

        <Wishlist items={wishlistItems} />
      </Container>
    </div>
  );
}
