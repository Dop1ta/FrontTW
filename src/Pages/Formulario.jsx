// import React, { useState, Fragment } from "react";
// import {
//   Button,
//   Card,
//   CardActions,
//   Container,
//   Grid,
//   Typography,
//   CircularProgress,
//   CardMedia
// } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { useMutation } from "react-query";
// import InputField from "../Components/CustomComponents/InputField";
// import { useBuscarInfoQuery } from "../Queries/queryDog";
// import { CustomAutocomplete } from "../Components/CustomComponents/CustomAutocomplete";
// import { mutateExample } from "../Queries/mutate";


// const Formulario = () => {


//   //PEDIR IMAGEN DEL PERRO
//   const {
//     data: imagenPerro,
//     refetch: recargar,
//     isLoading: cargando,
//     isError: errors1,
//     isRefetching: refetching,
//   } = useBuscarInfoQuery();


//   const { handleSubmit,reset,control,formState: { errors }} = useForm({
//     defaultValues: {
//       name: "",
//       sexo: "",
//       description: "",
//       urlP: imagenPerro,
//     },
//   });



//   const onSubmit = (data) => {
//     console.log(data);
//     data.urlP = imagenPerro || "";
//     mutate(data);
//   };

//   // const guardarInfo = (data) => {
//   //   console.log('poke',data);
//   //   mutate(data);
//   //   setPokemones((pokemones) => [...pokemones, data]);
//   // };
 

//   const { mutate } = useMutation(mutateExample, {
//     onSuccess: (response) => {
//      console.log('estoy bien');
//     },
//     onError: (error) => {
//      console.log('me fui a la B');
//     },
//   });



//   return (
//     <Container>
//       <Grid
//         container
//         direction="row"
//         justifyContent="center"
//         alignItems="center"
//       >
//         <Grid item md={12} xs={12} sx={{ mb: 5 }}>
//           <form id="formulario" onSubmit={handleSubmit(onSubmit)}>
//             <Card sx={{ p: 1}}>
//               <Grid
//                 container
//                 spacing={1}
//                 direction="row"
//                 justifyContent="center"
//                 alignItems="center"
//               >

//                 <Card>

//                 {cargando !== false || refetching
//                   ? <CircularProgress
//                     size={60}
//                     color="error"
//                   />
//                   :
//                   <CardMedia
//                     content="cover"
//                     component="img"
//                     className="card-media"
//                     height={300}
//                     image={imagenPerro}
//                     alt="Perro aleatorio"
//                     sx={{
//                       marginTop: '20px',
//                       display: 'flex',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       maxWidth: '100%',
//                     }}
//                   />
//                 }
//                 </Card>
                
//                 <Grid item md={4}>
//                     <InputField
//                         name="name"
//                         label="Nombre"
//                         control={control}
//                         type="text"
//                     />
//                     <CustomAutocomplete
//                         name="sexo"
//                         label="sexo"
//                         options={["Macho", "Hembra", "Binario"]}
//                         control={control}
//                     />
//                     <InputField
//                         name="description"
//                         label="Descripcion"
//                         control={control}
//                         type="text"
//                     />
//                 </Grid>
//               </Grid>
//               <CardActions sx={{ justifyContent: 'center' }}>
//                 <Button
//                   id="terminar_registro"
//                   color="primary"
//                   size="large"
//                   type="submit"
//                   variant="contained"
//                   sx={{ r: 0 }}
//                 >
//                   Terminar Registro
//                 </Button>
//               </CardActions>
//             </Card>
//           </form>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };
// export default Formulario;


import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useBuscarInfoQuery } from "../Queries/queryDog";
import InputField from "../Components/CustomComponents/InputField";
import { CustomAutocomplete } from "../Components/CustomComponents/CustomAutocomplete";
import { mutateExample } from "../Queries/mutate";

const Formulario = () => {
  const {
    data: imagenPerro,
    refetch: recargar,
    isLoading: cargando,
    isRefetching: refetching,
  } = useBuscarInfoQuery();


  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      sexo: "",
      description: "",
      urlP: "",
    },
  });


  const onSubmit = (data) => {
    data.urlP = imagenPerro || "";
    mutate(data);
  };

  const { mutate } = useMutation(mutateExample, {
    onSuccess: (response) => {
      console.log('estoy bien');
    },
    onError: (error) => {
      console.log('me fui a la B');
    },
  });

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={12} xs={12} sx={{ mb: 5 }}>
          <form id="formulario" onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ p: 1 }}>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Card>
                  <CardActions sx={{ justifyContent: 'flex-start' }}>
                    <Button
                      onClick={()=>recargar()}
                      color="secondary"
                      size="small"
                      variant="contained"
                    >
                      Pedir Otra Imagen
                    </Button>
                  </CardActions>
                  {cargando !== false || refetching ? (
                    <CircularProgress size={60} color="error" />
                  ) : (
                    <CardMedia
                      content="cover"
                      component="img"
                      className="card-media"
                      height={300}
                      image={imagenPerro}
                      alt="Perro aleatorio"
                      sx={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxWidth: '100%',
                      }}
                    />
                  )}
                </Card>
                <Grid item md={4}>
                    <InputField
                        name="name"
                        label="Nombre"
                        control={control}
                        type="text"
                    />
                    <CustomAutocomplete
                        name="sexo"
                        label="sexo"
                        options={["Macho", "Hembra", "Binario"]}
                        control={control}
                    />
                    <InputField
                        name="description"
                        label="Descripcion"
                        control={control}
                        type="text"
                    />
                                  
                </Grid>
              </Grid>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  id="terminar_registro"
                  color="primary"
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ r: 0 }}
                >
                  Terminar Registro
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Formulario;
