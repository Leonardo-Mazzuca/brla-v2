
import AppRoutes from "./routes";
import AppProvider from "./context";


function App() {


  return (

    <section className="mn-w-screen min-h-screen">

        <AppProvider>
          <AppRoutes />
        </AppProvider>
      

    </section>

  );
}

export default App;
