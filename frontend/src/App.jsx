import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import LoginModal from "./components/LoginModal";
import Contact from "./pages/Contact";
import Dashboard from "./components/Dashboard";
import ManageResume from "./components/ManageResume";
import ManageBlogs from "./components/ManageBlogs";
import ReadBlog from "./components/ReadBlog";
import UserViewBlogs from "./components/UserViewPosts";
import Petitions from "./components/Petitions";
import NotFound from "./components/NotFound";
export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginModal/>}/> 
          <Route path="/contact-me" element={<Contact/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/manage-resume" element={<ManageResume/>}/>
          <Route path="/manage-blogs"element={<ManageBlogs/>}/>
          <Route path="/blog-post/:id/:slug?" element={<ReadBlog />} />
          <Route path="/blog-posts" element={<UserViewBlogs />} />
          <Route path="/petitions" element={<Petitions/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}