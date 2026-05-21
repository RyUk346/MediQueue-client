import Banner from "@/components/Banner";
import HomeExtras from "@/components/Extras";
import Featured from "@/components/Featured";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div>
      <Banner />
      <Featured />
      <HomeExtras />
    </div>
  );
}
