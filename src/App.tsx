import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Overview from "./pages/Overview";
import Schema from "./pages/Schema";
import Entities from "./pages/Entities";
import ViewModels from "./pages/ViewModels";
import Architecture from "./pages/Architecture";
import Controllers from "./pages/Controllers";
import UIPrototypes from "./pages/UIPrototypes";
import SeedData from "./pages/SeedData";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/schema" element={<Schema />} />
          <Route path="/entities" element={<Entities />} />
          <Route path="/viewmodels" element={<ViewModels />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/controllers" element={<Controllers />} />
          <Route path="/ui" element={<UIPrototypes />} />
          <Route path="/seed" element={<SeedData />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
