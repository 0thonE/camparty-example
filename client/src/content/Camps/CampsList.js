import React from "react";
import {
    CampCard
} from '../../components'

class CampsList extends React.Component{
    
    render(){
        return(
            <>
                {this.props.camps.map(camp => (
                    <CampCard key={`campID_${camp._id}`} camp={camp}/>
                ))}            
            </>
        )
    }
}

export default CampsList;
