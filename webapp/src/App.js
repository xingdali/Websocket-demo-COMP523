import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: '100%',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function CustomizedProgressBars({value, ...props}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', minHeight: 50, height: '20%' }}>
      <BorderLinearProgress variant="determinate" value={value} style={{ width: '50%' }} />
      <Typography style={{ width: '15%', marginLeft: '5%' }}>{value}%</Typography>
    </div>
  );
}

export default function App() {
  const [response, setResponse] = React.useState({data: '0'});
  const [status, setStatus] = React.useState('Initialized')
  const [terminal, setTerminal] = React.useState([])
  React.useEffect (() => {
    setTerminal([...terminal, JSON.stringify(response.data)])
    if (Number(response.data) === 100) {
      setStatus('Completed')
    }
  }, [response])
  const handleClick = () => {
    let ws = new WebSocket("ws://localhost:8000");
    ws.onopen = () => {
      setStatus('Connected')
      setTerminal([...terminal, 'Connected'])
    };
    ws.onmessage = (res) => {
      console.log(res);
      setResponse(res)
    }
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ margin: '10%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography>{status}</Typography>
        <CustomizedProgressBars value={Number(response.data)} style={{ width: '100%' }}/>
        <Button variant="contained" onClick={handleClick} style={{ width: '10%', margin: '10px 10px 0 0' }}>Send</Button>
        <Stack sx={{ width: '100%' }} spacing={0} style={{ marginTop: '1%' }}>
          {terminal && terminal.map((value, key) => (
              key !== 0 && <Alert severity="success" key={key}>MessageEvent <span>{"{"}</span>data: {value}<span>{"}"}</span></Alert>
          )
          )}
        </Stack>
      </div>
    </div>
  );
}