import { useEffect, useState, useRef } from "react";
import { Grid, Box, Card, CardMedia, List, CardActions, Button, CardContent, Typography, Stack, CircularProgress, Accordion, AccordionSummary, AccordionDetails, IconButton, ListItem } from '@mui/material';
import { useBuscarInfoQuery } from "./Queries/queryDog";
import { LoremIpsum } from "lorem-ipsum";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Tooltip from '@mui/material/Tooltip';

function Inicio() {
  const [rechazado, setListadoR] = useState({
    link: [],
    name: [],
    descri: []
  });
  const [aceptado, setListadoA] = useState({
    link: [],
    name: [],
    descri: []
  });
  const [NombreP, setNombreP] = useState('');
  const [descriptP, setDescriptP] = useState('');


  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 2,
      min: 1
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });


  const {
    data: imagenPerro,
    refetch: recargar,
    isLoading: cargando,
    isError: errors,
    isRefetching: refetching,
  } = useBuscarInfoQuery();



  useEffect(() => {
    setDescriptP(lorem.generateWords(7));
    generateRandomString();
  }, []);

  //ACEPTADO EN EL MATCH
  const aceptarP = (itemURL, itemName, idescriptP) => {
    setListadoA((rechazadoAnterior) => ({
      link: [...rechazadoAnterior.link, itemURL],
      name: [...rechazadoAnterior.name, itemName],
      descri: [...rechazadoAnterior.descri, idescriptP]
    }));
    recargar();
    generateRandomString();
    setDescriptP(lorem.generateWords(7));
  };

  //RECHAZADO EN EL MATCH
  const rechazarP = (itemURL, itemName, idescriptP) => {
    setListadoR((rechazadoAnterior) => ({
      link: [...rechazadoAnterior.link, itemURL],
      name: [...rechazadoAnterior.name, itemName],
      descri: [...rechazadoAnterior.descri, idescriptP]
    }));
    recargar();
    generateRandomString();
    setDescriptP(lorem.generateWords(7));
  };


  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result1 = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setNombreP(result1);
  }

  const eliminarPerroAceptado = (index, acre) => {

    if (acre === 0) {

      setListadoA((rechazadoAnterior) => ({
        link: [...rechazadoAnterior.link, rechazado.link[index]],
        name: [...rechazadoAnterior.name, rechazado.name[index]],
        descri: [...rechazadoAnterior.descri, rechazado.descri[index]]
      }));

      const nuevosPerrosAceptados = {
        link: [...rechazado.link.slice(0, index), ...rechazado.link.slice(index + 1)],
        name: [...rechazado.name.slice(0, index), ...rechazado.name.slice(index + 1)],
        descri: [...rechazado.descri.slice(0, index), ...rechazado.descri.slice(index + 1)]
      };
      setListadoR(nuevosPerrosAceptados);
    } else {

      setListadoR((rechazadoAnterior) => ({
        link: [...rechazadoAnterior.link, aceptado.link[index]],
        name: [...rechazadoAnterior.name, aceptado.name[index]],
        descri: [...rechazadoAnterior.descri, aceptado.descri[index]]
      }));

      const nuevosPerrosAceptados = {
        link: [...aceptado.link.slice(0, index), ...aceptado.link.slice(index + 1)],
        name: [...aceptado.name.slice(0, index), ...aceptado.name.slice(index + 1)],
        descri: [...aceptado.descri.slice(0, index), ...aceptado.descri.slice(index + 1)]
      };
      setListadoA(nuevosPerrosAceptados);
    }


  };


  return (
    <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1 class="title">Match para perros</h1>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={3}
      >

        <Grid item xs={12} lg={4}>
          <h1>Me quieres guau?</h1>
          <Stack alignItems="center" bgcolor={"white"} borderRadius={5}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {NombreP}
              </Typography>
            </CardContent>




            <Card>

              {cargando !== false || refetching
                ? <CircularProgress
                  size={60}
                  color="error"
                />
                :
                <CardMedia
                  content="cover"
                  component="img"
                  className="card-media"
                  height={500}
                  image={imagenPerro}
                  alt="Perro aleatorio"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '100%', // Agregar esta línea
                  }}
                />
              }
            </Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {descriptP}
              </Typography>
            </CardContent>
            <CardActions direction="row" spacing={2} ml={'25%'}>

              <Tooltip title="Aceptar">
                <IconButton variant="contained" disabled={cargando !== false || refetching} color="success" onClick={() => aceptarP(imagenPerro, NombreP, descriptP)}>
                  <FavoriteIcon />
                </IconButton >
              </Tooltip>

              <Tooltip title="Rechazar">
                <IconButton variant="outlined" disabled={cargando !== false || refetching} color="error" onClick={() => rechazarP(imagenPerro, NombreP, descriptP)}>
                  <HeartBrokenIcon />
                </IconButton>
              </Tooltip>

            </CardActions>
          </Stack>

        </Grid>


        <Grid item xs={6} lg={4}>
          <h1>Perros aceptados</h1>
          <List
            sx={{
              overflow: 'auto',
              maxHeight: 680,
            }}
          >
            {aceptado.link.map((item, index) => (
              <Stack key={index} marginBottom={2} >
                <Card key={index}>
                  <Stack direction={"row"}>
                    <CardMedia

                      component="img"
                      height={100}
                      style={{ maxWidth: '30%' }}
                      className="card-media" //Aplicar la clase de estilo al componente
                      image={aceptado.link[index]}
                    />
                    <h4>{aceptado.name[index]}  </h4>
                    <CardActions direction="row" spacing={2} ml={'25%'}>

                      <Tooltip title="Arrepentirse">
                        <IconButton variant="contained" color="success" onClick={() => eliminarPerroAceptado(index, 1)}>
                          <VolunteerActivismIcon />
                        </IconButton>
                      </Tooltip>

                    </CardActions>

                  </Stack>

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Descipcion</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {aceptado.descri[index]}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                </Card>
              </Stack>

            )).reverse()}
          </List>
        </Grid>



        <Grid item xs={6} lg={4}>
          <h1>Perros rechazados</h1>
          <List
            sx={{
              overflow: 'auto',
              maxHeight: 680,
            }}
          >
            {rechazado.link.map((item, index) => (
              <Stack key={index} marginBottom={2}>
                <Card >
                  <Stack direction={"row"}>
                    <CardMedia
                      component="img"
                      height={100}
                      style={{ maxWidth: '30%' }}
                      className="card-media" //Aplicar la clase de estilo al componente
                      image={rechazado.link[index]}
                    />
                    <h4>{rechazado.name[index]}</h4>
                    <CardActions direction="row" spacing={2} ml={'25%'}>

                      <Tooltip title="Arrepentirse">
                        <IconButton variant="contained" color="success" onClick={() => eliminarPerroAceptado(index, 0)}>
                          <VolunteerActivismIcon />
                        </IconButton>
                      </Tooltip>

                    </CardActions>
                  </Stack>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Descipcion</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {rechazado.descri[index]}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Card>
              </Stack>

            )).reverse()}
          </List>
        </Grid>


      </Grid>
    </Box >
  )
}

export default Inicio