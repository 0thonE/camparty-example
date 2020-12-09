import React from "react";
import {
    SendFilled32 as Send,
    StarReview32 as StarReview
} from "@carbon/icons-react";
import { Tile, Button, UnorderedList, ListItem, TextInput, Slider } from "carbon-components-react";

import { getCampByID, postRate, getRateByQuery, getCampComments, postComment } from "../../services/api-requests"

import { AuthService } from "../../services/session-service";
import { Comments } from "../../components";
// import { socket } from "../../components";

class Camp extends React.Component {
    constructor(props) {
        super(props)
        let { userId } = AuthService.getUserData();

        this.userId = userId
        this.state = {
            camps: [],
            comments: [],
            rate: 5,
            rated: false,
            campId: this.props.match.params.id,
            newComment: ""
        }
    }


    componentDidMount() {
        getCampByID(this.state.campId, this);
        getRateByQuery({ userId: this.userId, campId: this.props.match.params.id }, this);
        getCampComments(this.state.campId, this);
        var state_current = this;
        // socket.emit("initial_data");
        // socket.on("get_data", this.getData);
        // socket.on("change_data", this.changeData);

    }

    componentWillUnmount() {
        // socket.off("get_data");
        // socket.off("change_data");
    }

    // markRate = () => {
    //     socket.emit("mark_rate", this.state.campId);
    // };

    renderCamp = (currentCamp) => {
        return (
            <div className="bx--col-md-8 bx--col-lg-16">
                <div className="bx--row" >

                    <div className="bx--col-lg-10 bx--col-md-4">
                        <h2 className="title-center-row" style={{ display: "flex", alignItems: "center", margin: "auto" }}>{currentCamp.name}</h2>
                    </div>
                    <div className="bx--col-lg-4 bx--offset-lg-1 bx--col-md-2">
                        <Slider
                            style={{ display: "flex", alignItems: "center", marginBottom: "2em" }}
                            ariaLabelInput="Label for slider value"
                            id="rate_slider"
                            labelText="Calificar"
                            max={10}
                            min={0}
                            step={0.5}
                            light
                            value={this.state.rate}
                            hideTextInput={!this.state.rated}
                            onChange={({ value }) => this.setState({ rate: value })}
                            onClick={() => this.setState({ rated: true })}
                        />
                    </div>
                    <div className="bx--col-lg-1 bx--col-md-2"  >
                        <Button
                            style={{ display: (!this.state.rated) ? 'none' : 'inline' }}
                            hasIconOnly
                            renderIcon={StarReview}
                            tooltipAlignment="center"
                            tooltipPosition="bottom"
                            iconDescription="enviar calificación"
                            size='xl'
                            onClick={() => {
                                postRate({ campId: currentCamp._id, userId: this.userId, value: this.state.rate }, this)
                                this.setState({ rated: false })
                                // this.markRate()
                            }}

                        />
                    </div>
                </div>
                <Tile className="card-diplay-camp">
                    <div className="bx--row">
                        <div className="bx--col-lg-7 bx--col-md-4 bx--aspect-ratio bx--aspect-ratio--16x9">
                            <div className="bx--aspect-ratio--object">
                                <img src={currentCamp.image} alt='imagen campamento'></img>
                            </div>
                        </div>
                        <div className="bx--col-lg-7 bx--col-md-3 " style={{ position: 'relative' }}>
                            <p style={{ textAlign: 'right' }}>cal.<h3>{currentCamp.rateValue / currentCamp.rateCount}</h3></p>
                            <p>{currentCamp.description}</p>
                            <div style={{ position: 'absolute', bottom: '32px' }}>
                                Mas información:
                                <UnorderedList style={{ paddingLeft: '1em' }}>
                                    {currentCamp.more.split(',').map(i => (<ListItem>{i.trim()}</ListItem>))}
                                </UnorderedList>
                            </div>
                        </div>

                        <div className="bx--col-lg-2 bx--col-md-1 bx--col-sm-1">
                            <p>Posible gasto</p> {currentCamp.price}
                        </div>
                        <div className="bx--col-lg-8 bx--col-md-2 bx--col-sm-2 ">
                            <p>Punto</p> <a href='/'>{currentCamp.loc.coordinates[0]} - {currentCamp.loc.coordinates[1]}</a>
                        </div>
                    </div>
                    <br /><hr /><br />
                    <div className="bx--row">
                        <div className="bx--col-lg-10  bx-- bx--col-sm-3 " >
                            <TextInput
                                id={`commentInput_camp`}
                                helperText=""
                                labelText=""
                                value={this.state.newComment}
                                placeholder="Escribe un comentario... "
                                onChange={(value) => this.setState({ newComment: value.target.value })}
                            />
                        </div>
                        <div className="bx--col-lg-2 bx--col-sm-1 ">
                            <Button
                                hasIconOnly
                                renderIcon={Send}
                                tooltipAlignment="center"
                                tooltipPosition="bottom"
                                iconDescription="enviar comentario"
                                size='field'
                                onClick={() => {
                                    postComment({ userId: this.userId, campId: this.state.campId, comment: this.state.newComment })
                                    getCampComments(this.state.campId, this);
                                    this.setState({ newComment: "" })
                                }} />
                        </div>
                    </div>
                </Tile>
            </div>
        );
    }

    render() {


        return (
            <div>
                <div className="bx--grid bx--grid--full-width">
                    <div className="bx--row camp-row">
                        {this.state.camps.map(camp => this.renderCamp(camp))}
                    </div>
                    <div className="bx--row comments-row">
                        <div className="bx--col-lg-16 comments-container">
                            <Comments comments={this.state.comments} />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Camp;
