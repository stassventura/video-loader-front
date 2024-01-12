import Form from "./components/common/form";
import Header from "./components/common/header";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Header />
      <div className="h-svh grid content-center bg-background px-2">
        <Form />
      </div>
      <Toaster richColors={true} position="bottom-center" />
    </>
  );
}

export default App;
