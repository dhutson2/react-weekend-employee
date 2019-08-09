import React, { Component } from "react";
import Employee from "../CreateEmployee";
import EditEmployee from "../EditEmployee";


class Employees extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      showModal: false,
      employeeToEdit: {
        id: null,
        name: "",
        position: "",
        birthDate: "",
        department: "",
        annualSalary: ""
      }
    };
  }



    handleFormChange = (e) => {

    this.setState({
      movieToEdit: {
        ...this.state.movieToEdit, // spread the previous contents of
        // the object in the movie to edit
        // then use the computational properties to edit
        // the input you're typing in
        [e.target.name]: e.target.value
      }
    })

  }
  showModal = (movie) => {
    console.log(movie, ' movieID in show Modal')
    this.setState({
      movieToEdit: movie,
      showEditModal: !this.state.showEditModal
    })
  }
  closeAndEdit = async (e) => {
    e.preventDefault();

    try {
      const editRequest = await fetch('http://localhost:9000/api/v1/movies/' + this.state.movieToEdit._id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(this.state.movieToEdit),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(editRequest.status !== 200){
        throw Error('editResquest not working')
      }

      const editResponse = await editRequest.json();

      const editedMovieArray = this.state.movies.map((movie) => {
        // remember map creates a brand new array
        if(movie._id === editResponse.data._id){
        // comparing every movie in the array, the
        // movie we edited
        // and if they match update the movie with response
        // data from the api
          movie = editResponse.data
        }

        return movie
      });

      this.setState({
        movies: editedMovieArray,
        showEditModal: false
      })

      console.log(editResponse, ' editResponse');

    } catch(err){
      console.log(err, ' error closeAndEdit');
      return err
    }
  }


  render() {
    return <Employee />;
  }
}

export default Employees;
