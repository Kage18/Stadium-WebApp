import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import Popup from "reactjs-popup";

const GET_GAMES = gql`
    query {
        games{
            id
            name
            description
            price
            images{
                url
            }
        }
    }
`

const GET_MERCH = gql`
    query {
        merchs{
            id
            name
            desc
            price
            game{
                id
                name
            }
            images{
                id
                image
                url
            }
        }
    }
`
const BUY_MERCH = gql`
    mutation BuyMerch($merchId: Int!){
        buyMerch(merchID: $merchID){
            transaction{
                id
                amount
                time
            }
        }
    }
`

class Store extends Component{
    state = {
        id: 1,
    }
    render(){
        const id = parseInt(this.props.match.params.id)
        return(
            <div>
                <div>
                    {id === 1 && (
                        <div>
                            <Query query={GET_GAMES}>
                                {({loading, error, data}) => {
                                    if (loading) return 'Loading...';
                                    if (error) return `Error! ${error.message}`;

                                    console.log(data);
                                    var tokenValue = localStorage.getItem("token")
                                    console.log(tokenValue)

                                    return(
                                        <div className="container-fluid" style={{"padding":"2%","fontFamily":"Josefin Sans","width":"70%"}}>
                                            <h1>Games</h1><br/><br/><br/>
                                            {data.games.map(game => (
                                            <Link to={`/gamestore/${game.id}`}>
                                                <div className="container-fluid row" style={{"backgroundColor":"#1b2a49","padding":"4%","borderRadius":"20px","borderColor":"white"}}>
                                                    <div className="col-4" style={{"width":"50px"}}>
                                                        <img src={`${BASE_URL}${game.images[0].url}`}  alt="" className="col-6" /> 
                                                    </div>
                                                    <div className="col-8" >
                                                        <h3 className="card-title">{game.name}</h3>                                        
                                                        <h5>Price: ₹{game.price}</h5>
                                                    </div>
                                                </div>
                                            {/* <div className="card border-primary row" key={game.id}>
                                                <img src={`${BASE_URL}${game.images[0].url}`} className="col-4" alt="" /> 
                                                <div className="col-8">
                                                </div>
                                            </div> */}
                                            <br/><br/>
                                            </Link>
                                    ))}
                                        </div>
                                        
                                    );           
                                }}
                            </Query>
                        </div>
                    )}
                </div>

                <div>
                    {id === 2 && (
                        <div>
                            <Query query={GET_MERCH}>
                                {({loading, error, data}) => {
                                    if (loading) return 'Loading...';
                                    if (error) return `Error! ${error.message}`;

                                    console.log(data);

                                    return(
                                        <div className="container">
                                            <h1>Merch</h1><br></br>
                                            {data.merchs.map(merch => (
                                            // <div className="card border-primary">
                                            //     <img src={`${BASE_URL}${merch.images[0].url}`} className="col-3" alt="" style={{top: '70px'}} />
                                            //     <center>
                                            //     <div className="col-3" style={{bottom: "100px"}}>
                                            //     <h3 className="card-title">{merch.name}</h3>
                                            //     <p className="container"><b>Description: </b>{merch.desc}</p>
                                            //     <h5>Price: ₹{merch.price}</h5>
                                            //     {/* <button className="btn btn-primary">Buy</button> */}
                                            //     {/* <div>{merchID = merch.id}</div> */}
                                            //     <Mutation mutation={BUY_MERCH}>
                                            //         {buy => (
                                            //             <Popup trigger={<button className="btn btn-primary"> Buy </button>} position="center">
                                            //             <div> <br></br>Buying Successful !!! </div>
                                            //             </Popup>
                                            //         )}
                                            //     </Mutation>
                                            //     <br></br>
                                            //     </div>
                                            //     </center>
                                                
                                            // </div>
                                            <div className="container-fluid row" style={{"backgroundColor":"#1b2a49","padding":"4%","borderRadius":"20px","borderColor":"white"}}>
                                                    <div className="col-4" style={{"width":"50px"}}>
                                                        <img src={`${BASE_URL}${merch.images[0].url}`}  alt="" className="col-6" /> 
                                                    </div>
                                                    <div className="col-8" >
                                                        <h3 className="card-title">{merch.name}</h3>
                                                        <p className="container"><b>Description: </b>{merch.desc}</p>
                                                        <h5>Price: ₹{merch.price}</h5>
                                                        <Mutation mutation={BUY_MERCH}>
                                                            {buy => (
                                                            <Popup trigger={<button className="btn btn-primary"> Buy </button>} position="center">
                                                            <div> <br></br>Buying Successful !!! </div>
                                                            </Popup>
                                                            )}
                                                        </Mutation>
                                                    </div>
                                                </div>
                                    ))}
                                        </div>
                                    )                        
                                }}
                            </Query>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Store