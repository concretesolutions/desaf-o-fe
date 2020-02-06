import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

export default class SearchButton extends Component{

    state = {
        userSearch : "",
        redirect: null,
        dataProfile: [],
        dataRepositoryList: []
    }

    render(){
        if(this.state.redirect){
            const path = this.state.redirect
            this.setState({redirect:null})
            return <Redirect 
                to={{
                pathname: path,
                state: { 
                    profile: this.state.dataProfile,
                    repositoryList: this.state.dataRepositoryList
                }
              }}/>
        }
        return (
            <div>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" style={searchInput} onChange={this.onChange}/>
                            </td>
                            <td>
                                <button style={searchButton}
                                        onClick={async() => {await this.searchProfile()}}>
                                    <img 
                                        alt="Búsqueda" 
                                        style={searchIcon} 
                                        src={ require('../resources/images/search-icon.png')}>
                                    </img>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    onChange = e =>{
        this.setState({
            userSearch: e.target.value
        });
    }

    async searchProfile(){
        const user = this.state.userSearch
        this.setState({
            userSearch: ""
        });
        const resProfile = await fetch(apiUrl + user);
        if(resProfile.status === 404){
            this.setState({redirect: "/notfound"})
        } else {
            const dataProfile = await resProfile.json()
            let urlRepo = apiUrl + user + repos
            const resRepository = await fetch(urlRepo);
            let repositoryList = await resRepository.json()
            repositoryList.sort((a, b) => {
                return b.stargazers_count - a.stargazers_count;
            })

            this.setState({redirect: "/details",dataProfile:dataProfile,dataRepositoryList:repositoryList})
        }
    }
}

const searchButton = {
    background: "#607d8b",
    border : "none",
    borderRadius: "50%",
    width: "55px",
    height: "55px",
    cursor: "pointer"
};

const searchIcon = {
    width: "45px",
    height: "45px"
}

const searchInput = {
    width: "600px",
    height: "40px",
    borderRadius: "5px",
    border: "1px solid #607d8b"
}

const repos="/repos"
const apiUrl="https://api.github.com/users/"