import { Route, Routes } from "react-router-dom";
import Inicio from "./src/Inicio";
// import CustomToolbar from "./src/Components/Drawer";
// import ErrorPage from "./src/Pages/ErrorPage";
// import Buscador from "./src/Pages/Buscador";

const RouterApp = () => {
  return <LogedInRoutes />;
};

// const NotLogedRoutes = () => {
//   return (
//     <Routes>
//       <Route exact path="/login" element={<Login />} />
//     </Routes>
//   );
// };
const LogedInRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Inicio />} />
      </Routes>
    </>
  );
};
export default RouterApp;