import axios from 'axios';
import { AuthService } from './session-service';

const API_URL = (window.location.host.includes('localhost')) ?
    'http://localhost:5000/api' : `${window.location.protocol}//${window.location.host}/api`;



////////////// Camps requests

const getAllCamps = (_this) => {

    axios.get(`${API_URL}/camps`)
        .then(response => {
            if (response.status === 200) {

                let camps = response.data;

                console.log("camps", camps)
                _this.setState({ camps: camps })
            } else {
                alert("Error: 1" + response.status + `
            Ha occurrido un error, por favor intentelo más tarde`)
            }
        }).catch(response => {
            alert("Error: 2" + response.status + `
        Ha occurrido un error, por favor intentelo más tarde`)
        })
}

const getCampByID = (id, _this) => {
    axios.get(`${API_URL}/camps/${id}`)
        .then(response => {
            if (response.status === 200) {

                let camps = response.data;
                camps.forEach(camp => {
                    camp.key = camp._id + "_key"
                });

                console.log("camp", camps)
                _this.setState({ camps })
            } else {
                alert("Error: " + response.status + `
            Ha occurrido un error, por favor intentelo más tarde`)
            }
        }).catch(response => {
            alert("Error: " + response.status + `
        Ha occurrido un error, por favor intentelo más tarde`)
        })
}

const getCampComments = (id, _this) => {

    axios.get(`${API_URL}/comments/campid/${id}`)
        .then(response => {
            if (response.status === 200) {

                let comments = response.data;

                console.log("comments", comments)
                _this.setState({ comments: comments })
            } else {
                alert("Error: " + response.status + `
            Ha occurrido un error, por favor intentelo más tarde`)
            }
        }).catch(response => {
            alert("Error: " + response.status + `
        Ha occurrido un error, por favor intentelo más tarde`)
        })
}

const createCamp = (data)=>{
    var data = JSON.stringify(data);
    var user = AuthService.getUserData()
    console.log(user)
    var config = {
        method: 'post',
        url: 'http://localhost:5000/api/camps/new',
        headers: { 
          'Content-Type': 'application/json',
          'auth-token':(user)?user.data:"",
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      

}

////////////// Rates requests


const postRate = (rate, _this) => {

    console.log("rate postRate", rate)
    axios.post(`${API_URL}/rates/new`, rate)
        .then(response => {
            if (response.status === 201 || 200) {

                let camps = response.data;

                console.log("camps", camps)
                _this.setState({ camps: camps })
            } else {
                console.log("well thi is unexpected")
                alert("Error: " + response.status + `
            Ha occurrido un error, por favor intentelo más tarde`)
            }
        }).catch(response => {
            console.log("please stop this")
            alert("Error: " + response.status + `
        Ha occurrido un error, por favor intentelo más tarde`)
        })
}
const getRateByQuery = (query, _this) => {

    axios.get(`${API_URL}/rates`, null, { query: { ...query } })
        .then(response => {
            if (response.status === 200) {

                let rate = response.data;

                console.log("rates", rate)
                _this.setState({ rate: rate.value })
            } else {
                alert("Error: " + response.status + `
            Ha occurrido un error, por favor intentelo más tarde`)
            }
        }).catch(response => {
            alert("Error: " + response.status + `
        Ha occurrido un error, por favor intentelo más tarde`)
        })
}



////////////// Comments requests
const postComment = (comment, _this) => {
    axios.post(`${API_URL}/comments/new`, comment)
        .then(response => {
            if (response.status === 201 || 200) {

                let camps = response.data;

                console.log("camps", camps)
                _this.setState({ camps: camps })
            } else {
                alert("Error: " + response.status + `
        Ha occurrido un error, por favor intentelo más tarde`)
            }
        }).catch(response => {
            alert("Error: " + response.status + `
    Ha occurrido un error, por favor intentelo más tarde`)
        })


}



////////////// Users requests
const login = (data)=>{
    data=JSON.stringify(data);
    var config = {
        method: 'post',
        // url: `${API_URL}/users/login`,
        url: `http://localhost:5000/users/login`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      
}

const register = (data) => {
    data=JSON.stringify(data);
    var config = {
        method: 'post',
        url: 'http://localhost:5000/users/register',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      
    
}


export {
    getAllCamps,
    getCampByID,
    getCampComments,
    postRate,
    getRateByQuery,
    postComment,
    login,
    register,
    createCamp
}