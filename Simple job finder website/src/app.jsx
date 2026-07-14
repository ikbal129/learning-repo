import Home from "./pages/Home.jsx"
import Navbar from "./layouts/Navbar.jsx";
import { LocationProvider, Router, Route } from "preact-iso";
import { initialJobs } from "./dataDummy.js";
import { useState } from "preact/hooks";
import Footer from "./layouts/Footer.jsx";
import Jobs from "./pages/Jobs.jsx";
import JobApply from "./pages/JobApply.jsx";
import Post from "./pages/Post.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const [data, setData] = useState(() => {
    const getData = localStorage.getItem("jobs");
    
    if (getData) {
      return JSON.parse(getData);
    } 
    
    localStorage.setItem("jobs", "[]");
    return [];
  });

  return(
    <div className="app-layout">
    <Navbar />
    <main className="main-content">
      <LocationProvider>
        <Router>
          <Route path="/" component={() => <Home data={data}/>}/>
          <Route path="/jobs" component={() => <Jobs data={data}/>}/>
          <Route path="/jobs/apply/:id" component={() => <JobApply data={data}/>}/>
          <Route path="/post" component={() => <Post mainData={data} setData={setData}/>}/>
          <Route default component={() => <NotFound />}/>
        </Router>
      </LocationProvider>
    </main>
    <Footer />
    </div>
  )
}

export default App