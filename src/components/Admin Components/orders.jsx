import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import Avatar from "react-avatar";
import Grid from "@material-ui/core/Grid";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const api = axios.create({
  baseURL: `http://localhost:5000/api/order`,
});

function App() {
  var columns = [
    { title: "id", field: "_id", hidden: true },
    
    {
      title: "Order Id",
      field: "orderNo",
      editable: "never",
      headerStyle: {
        backgroundColor: "#0664A8",
        color: "#FFF",
      },
    },
    {
      title: "UID",
      field: "userId",
      editable: "never",
      headerStyle: {
        backgroundColor: "#0664A8",
        color: "#FFF",
      },
    },
    {
      title: "Net Amount(LKR)",
      field: "TotalAmount",
      editable: "never",
      headerStyle: {
        backgroundColor: "#0664A8",
        color: "#FFF",
      },
    },
    {
      title: "Shipping Address",
      field: "AddressShiping",
      editable: "never",
      headerStyle: {
        backgroundColor: "#0664A8",
        color: "#FFF",
      },
    },
    {
      title: "Status",
      field: "Status",
      headerStyle: {
        backgroundColor: "#0664A8",
        color: "#FFF",
      },
    },
    {
      title: "Date",
      field: "date",
      editable: "never",
      headerStyle: {
        backgroundColor: "#0664A8",
        color: "#FFF",
      },
    },
  ];
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    api
      .get("/getallpaidOrders")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const UpdateRow = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.Status === "") {
      errorList.push("Please enter Status");
    }
    

    if (errorList.length < 1) {
      api
        .put("/updateStatus/" + newData._id, newData)
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  

  

  return (
    <div className="container mt-5">
      <div className="App">
        <Grid container spacing={25}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <div>
              {iserror && (
                <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                    return <div key={i}>{msg}</div>;
                  })}
                </Alert>
              )}
            </div>
            <MaterialTable
              title="Orders to be Shipped"
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    UpdateRow(newData, oldData, resolve);
                  }),
                
              }}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default App;
