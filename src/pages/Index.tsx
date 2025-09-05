// Landing page content is now in src/pages/Landing.tsx
// This file is kept for backward compatibility but redirects to Landing

import { Navigate } from "react-router-dom";

const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
