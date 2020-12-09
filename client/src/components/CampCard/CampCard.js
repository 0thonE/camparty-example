import React from 'react'
import { Tile, Button } from "carbon-components-react";
import { ArrowRight32 } from "@carbon/icons-react";
import{withRouter} from 'react-router-dom'

class CampCard extends React.Component {

    render() {
        const currentCamp = this.props.camp;

        return (
            <div className="bx--col-md-4 bx--col-lg-4 bx--col-padding">
                <Tile className="card_center">
                    <div className="bx--aspect-ratio bx--aspect-ratio--16x9">
                        <div className="bx--aspect-ratio--object">
                            <img src={currentCamp.image} alt='imagen campamento'></img>
                        </div>
                    </div>
                    <div className="bx--row">
                        <div className="bx--col-lg-11 bx--col-md-6">
                            <h4 className="title-center-row">{currentCamp.name}</h4>
                        </div>

                        {/* </div>
                    <div className="bx--row information-row"> */}
                        <div className="bx--col-lg-11 bx--col-md-6 bx--col-sm-3 ">
                            Punto <a href="">{currentCamp.loc.coordinates[0]} - {currentCamp.loc.coordinates[1]}</a>
                        </div>
                        <div className="bx--col-lg-2 bx--col-sm-1 text-end">
                            <Button
                                // href={`/camps/${currentCamp._id}`}
                                hasIconOnly
                                renderIcon={ArrowRight32}
                                tooltipAlignment="center"
                                tooltipPosition="bottom"
                                iconDescription="Reserva tu sala"
                                size='field'
                                onClick={() => {
                                    this.props.history.push(`/camps/${currentCamp._id}`);
                                }}
                                

                            />
                        </div>
                    </div>
                </Tile>
            </div>
        );
    }
};

export default  withRouter(CampCard);
