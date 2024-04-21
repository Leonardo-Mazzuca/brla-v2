
import AppRoutes from "./routes";
import AppProvider from "./context";


function App() {

  return (

    <main className="mn-w-screen min-h-screen">

        <AppProvider>
          <AppRoutes />
        </AppProvider>
      

    </main>

  );
}

export default App;
