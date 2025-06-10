import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import Footer from "../components/Footer";

const DefaultLayout = ({ setSearchText, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      <div className="mx-auto flex h-screen">
        {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* <div className="flex flex-1 gap-0 flex-col overflow-y-auto overflow-x-hidden"> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setSearchText={setSearchText} />
          <main>
            <div className="min-h-screen bg-white">{children}</div>
          </main>
          <Footer/>
        </div>
      </div>
  );
};

export default DefaultLayout;
