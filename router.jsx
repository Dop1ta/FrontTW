import { Route, Routes } from "react-router-dom";
import Inicio from "./src/Inicio";
import Formulario from "./src/Pages/Formulario";
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
        <Route path="form" element={<Formulario/>} />
      </Routes>
    </>
  );
};
export default RouterApp;