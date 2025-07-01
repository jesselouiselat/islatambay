import Packages from "./Packages";
import Amenities from "./Amenities";
import Contact from "./Contact";
import About from "./About";
import Hero from "./Hero";
import ChatBox from "./Chatbox";
import NavBar from "./NavBar";
import TikTokEmbed from "./TiktokEmbed";
import Footer from "./Footer";

function Home() {
  return (
    <div className="">
      <NavBar />
      {/* {loggedIn && isAdmin ? <AdminDashboard /> : null} */}

      <Hero />
      <TikTokEmbed></TikTokEmbed>
      <Amenities />
      <Packages />
      <About />
      <ChatBox />
      <Contact />
      <Footer />
    </div>
  );
}
export default Home;
