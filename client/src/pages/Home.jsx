import Posts from "../components/Posts";
import Share from "../components/Share";
import Stories from "../components/Stories";

const Home = () => {
  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts />
    </div>
  )
}

export default Home;