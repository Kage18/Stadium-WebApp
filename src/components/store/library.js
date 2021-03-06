import React,{Component} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants';

const GET_LIBRARY = gql`
    query GameOwned($userId: Int!){
        gameOwned(userId: $userId){
            game{
            id
            name
            images{
                url
            }
            }
            hoursPlayed
        }
    }
`

class Library extends Component{
    render(){
        const userId = localStorage.getItem("uid")
        console.log(userId)
        return(
            <div>
            {/*<Navbar /><br></br><br></br>   */}
            {/* <SignedInLinks /><br></br><br></br>   */}
                <Query query={GET_LIBRARY} variables={{ userId }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    console.log(data);

                    return(
                        <div className="container">
                            <h1>Your Games</h1><br></br>
                                    {data.gameOwned.map(gameown =>
                                    // <Link to={`/gamestore/${gameown.game.id}`} key={gameown.game.id}>
                                    //     <div className="card border-primary" key={gameown.game.id} >
                                
                                    //         <img src={`${BASE_URL}${gameown.game.images[0].url}`} className="col-3" alt="" style={{top: "50px"}}/> 
                                    //         <center>
                                    //         <div className="col-5 text-decoration-none" style={{bottom: "85px"}}>                                    
                                    //             <h3 className="card-title text-decoration-none">{gameown.game.name}</h3>   
                                    //             <h5>Minutes Played: {gameown.hoursPlayed}</h5>                                   
                                    //         </div>
                                    //         </center>    
                                    //     </div>
                                    // </Link>
                                    <Link to={`/gamestore/${gameown.game.id}`} key={gameown.game.id}>
                                    <div className="container-fluid row" style={{"backgroundColor":"#1b2a49","padding":"4%","borderRadius":"20px","borderColor":"white"}}>
                                        <div className="col-4" style={{"width":"50px"}}>
                                            <img src={`${BASE_URL}${gameown.game.images[0].url}`}  alt="" className="col-6" /> 
                                        </div>
                                        <div className="col-8" >
                                            <h3 className="card-title text-decoration-none">{gameown.game.name}</h3>   
                                            <h5>Minutes Played: {gameown.hoursPlayed}</h5>  
                                        </div>
                                       
                                    </div>
                                    <br/><br/>  
                                    </Link>
                                )}
                        </div>
                    )                        
                }}
                </Query>
            </div>
            /*<div>
                <h1>{id}</h1>
            </div>*/
        )
    }
}

export default Library
