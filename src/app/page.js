import Banner from "@/components/Banner";
import Featured from "@/components/Featured";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div>
      <Banner />
      <Featured />
    </div>
  );
}
