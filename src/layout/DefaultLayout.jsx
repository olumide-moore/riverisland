import Header from "../components/Header";
import Footer from "../components/Footer";

const DefaultLayout = ({ children }) => {

  return (
      <div className="mx-auto flex min-h-screen">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header/>
          <main>
            <div className="min-h-screen bg-white">{children}</div>
          </main>
          <Footer/>
        </div>
      </div>
  );
};

export default DefaultLayout;
