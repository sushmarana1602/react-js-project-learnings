import React, { useState, useEffect } from 'react';
import * as requestAssets from "../../utils/request";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ChartConfigs } from '../../utils/device-types-config';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Checkbox  from '@mui/material/Checkbox';
import Select  from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));
const steps = [
  {
    label: 'Select Chart Type',
    description: 'Select Chart Type'
  },
  {
    label: 'Customize chart',
    description: 'Customize chart'
  },
  {
    label: 'Complete',
    description: 'Complete'
  }
];
export default function FullScreenDialog() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const[userDeviceTypeGroups, setUserDeviceTypeGroups] = useState(null);
  const[devices, setDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);

  const formDataObj = {
    chartType : '',
    deviceTypeId:null,
    deviceId: [],
    widgetSize: '',
    selectedSensorAttribute: '',
  }
  const [formData, setFormData] =  useState(formDataObj);
  useEffect(() => {
    // call api or anything
  if (deviceTypes.length == 0) {
   requestAssets.api('user-device-type-groups').then((res) => {
    setUserDeviceTypeGroups(res.data);
    });
  } 
  
 }, [deviceTypes]);
 const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  console.log(value);
  setSelectedDevices(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
};
 const getChart = (chartType) => {
  return ChartConfigs[chartType];
 }
 const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectChart = (chartType) => {
    const data = formData;
    data['chartType'] = chartType;
    setFormData(data);
    let deviceTypesList = [];
    const supported =getChart(formData.chartType).supportedDeviceTypes;
    
    userDeviceTypeGroups && userDeviceTypeGroups.forEach((deviceGroup) => {
      if (supported === '*' || supported.includes(deviceGroup.id)) {
        deviceTypesList.push({
              id: deviceGroup.id,
              label: deviceGroup.type_group_name
          });
      }
  });
  setDeviceTypes(deviceTypesList);
  handleNext();
  }

  const getDevices = (id) => {
    const data = formData;
    data['deviceTypeId'] = id;
    setFormData(data);
    
    requestAssets.api(`devices?version=lite&itemsPerPage=10000&deviceTypeGroup=${id}`).then((res) => {
      setDevices(res.data.data);
    });

  }
  const getStepContent = (step) => {
    switch (step) {
      case 0 : 
        return (
          <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
          {Object.keys(ChartConfigs).map((key) => (
            <Grid key={key} item xs={12} sm={6} md={4}>
            <Card sx={{ minWidth: 275, mr: 2 }} onClick={ () => selectChart(key) } >
                  <CardContent>
                  <img height="150"  className="chartTypeImg"  src={getChart(key).icon} />
                  </CardContent>
                  <CardActions>
                  Customize {getChart(key).name}
                  </CardActions>
                </Card>

            </Grid>
          ))}
          </Grid>
          </Container>
        );
        case 1: 
        if (formData){
            return (
              <>
              <TextField
                required
                id="outlined-required"
                label="Chart Type"
                value={formData.chartType}
                sx={{ m: 1, width: '50ch' }}
              />
              <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={deviceTypes}
                  sx={{ m: 1, width: '50ch' }}
                  renderInput={(params) => <TextField {...params} label="Select Device Type" />}
                  renderOption={(props, option) => {
                    return (
                        <li {...props}>
                          {option.label}
                        </li>
                       )
                     }}
                  onChange={(_event, value) => {
                    getDevices(value.id)
                }}
                />
                 
                <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Select Device(s)</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedDevices}
                  onChange={handleChange}
                  input={<OutlinedInput label="Devices" />}
                  renderValue={(selected) => selected.join(', ')}
                  sx={{ width: '48ch' }}
                >
                  <MenuItem disabled value="">
                    <em>Please Select</em>
                  </MenuItem>
                  {devices?.map((device) => (
                    <MenuItem key={device.id} value={device.id}>
                      <Checkbox checked={selectedDevices.indexOf(device.id) > -1} />
                      <ListItemText primary={device.device_name} />
                    </MenuItem>
                  ))}
                </Select>
        </FormControl>

                </>
            );
          }
          return null;
        case 2: 
        return (
          <p>This is complete</p>
        );
        default:
            return 'Unknown step';
    }
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          
            <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {getStepContent(index)}
              


            <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              
              
            </StepContent>
          </Step>
        ))}
      </Stepper>
      </Box>
        </List>
      </Dialog>
    </div>
  );
}
