// import React, { useState, useEffect } from 'react';
// import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress, Box } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import { ListDogs } from '../Queries/getDogs';
// import { Link } from 'react-router-dom';

// const TodoList = () => {
//   const [dogList, setDogList] = useState([]);
//   const [loading, setLoading] = useState(true); // Estado para controlar la carga

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const { data } = await ListDogs();
//         setDogList(data);
//         setLoading(false); // Cambiar el estado de carga cuando los datos están listos
//       } catch (error) {
//         console.error("Error fetching dog list:", error);
//         setLoading(false);
//       }
//     }
//     fetchData();    
//   }, []);

//   return (
//     <Box
//         sx={{
//             width: '100%',
//             maxWidth: 360,
//             bgcolor: 'background.paper',
//         }}
//     >
//     Elegir un perrito
//       {loading ? ( // Mostrar el círculo de progreso si loading es true
//         <CircularProgress />
//       ) : (
//         <List>
//           {dogList.perro.map(dog => (
//             <ListItem key={dog.id}>
//               <ListItemText primary={dog.name} />
//               <ListItemSecondaryAction>
//                 <Link to={`/search/${dog.id}`}>
//                   <IconButton edge="end" aria-label="Ir">
//                       <SendIcon />
//                   </IconButton>
//                 </Link>
//               </ListItemSecondaryAction>
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </Box>
//   );
// };

// export default TodoList;




import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress, Box, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ListDogs } from '../Queries/getDogs';
import { Link } from 'react-router-dom';

const TodoList = () => {
  const [dogList, setDogList] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  const fetchData = async () => {
    try {
      const { data } = await ListDogs();
      setDogList(data);
      setLoading(false); // Cambiar el estado de carga cuando los datos están listos
    } catch (error) {
      console.error("Error fetching dog list:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      Elegir un perrito
      <Button startIcon={<RefreshIcon />} onClick={handleRefresh}>
        Refrescar
      </Button>
      {loading ? ( // Mostrar el círculo de progreso si loading es true
        <CircularProgress />
      ) : (
        <List>
          {dogList.perro.map(dog => (
            <ListItem key={dog.id}>
              <ListItemText primary={dog.name} />
              <ListItemSecondaryAction>
                <Link to={`/search/${dog.id}`}>
                  <IconButton edge="end" aria-label="Ir">
                    <SendIcon />
                  </IconButton>
                </Link>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TodoList;
