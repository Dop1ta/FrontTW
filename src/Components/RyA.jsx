import { useEffect, useState, useRef } from "react";
import { Grid, Box, Card, CardMedia, List, CardActions, Button, CardContent, Typography, Stack, CircularProgress } from '@mui/material';
import axios from "axios";

function Inicio() {
  const [rechazado, setListadoR] = useState({
    link: [],
    name: []
  });

  return (
    <Grid item xs={3}>
      <h1>Perros rechazados</h1>
      <List>
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
                  <Button variant="contained" color="success" onClick={() => eliminarPerroAceptado(index, 0)}>Arrepentirse</Button>
                </CardActions>
              </Stack>
            </Card>
          </Stack>

        ))}
      </List>
    </Grid>
  )
}

export default Inicio


