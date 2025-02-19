import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Authrisation } from "./pages/Authrisation";
import { Career } from "./pages/Career";
import { ContactUs } from "./pages/ContactUs";
import { DomainExperts } from "./pages/DomainExperts";
import { Downloads } from "./pages/Downloads";
import { Education } from "./pages/Education";
import { Events } from "./pages/Events";
import { Resources } from "./pages/Resources";
import Blog from "./pages/Blog";
import { Blog_2 } from "./pages/Blog_2";
import { UserProvider } from "./context/user/UserContext";
import { WriteBlogPage } from "./pages/WriteBlogPage";
import React, { Component } from "react";
import Profile from "./pages/Profile";

export class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/auth" index element={<Authrisation />} />
              <Route path="/Home" index element={<Home />} />
              <Route path="/Career" index element={<Career />} />
              <Route path="/ContactUs" index element={<ContactUs />} />
              <Route path="/DomainExperts" index element={<DomainExperts />} />
              <Route path="/Downloads" index element={<Downloads />} />
              <Route path="/Education" index element={<Education />} />
              <Route path="/Events" index element={<Events />} />
              <Route path="/Blog" index element={<Blog />} />
              <Route path="/Blog_2" index element={<Blog_2 />} />
              <Route path="/Resourses" index element={<Resources />} />
              <Route path="/write_page" index element={<WriteBlogPage />} />
              <Route path="/Profile" index element={<Profile />} />
              <Route path="/" index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    );
  }
}

export default App;
