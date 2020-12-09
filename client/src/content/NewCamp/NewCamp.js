import React from "react";
import { Tile, TextArea, TextInput, FileUploaderDropContainer, Button } from "carbon-components-react";
import { Location32, CloseFilled32 } from "@carbon/icons-react";
import Multimedia from "../../assets/Multimedia.png";
import { createCamp } from "../../services/api-requests";
// import MultimediaUpload from "../../assets/MultimediaUpload.png";


class NewCamp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name:"",
            description:"",
            price:"",
            more:"",
            currentImage: Multimedia
        }
    }


    render() {

        return (
            <div className="bx--grid bx--grid--full-width">

                <div className="bx--row text-center">
                    <div className={`bx--col-md-4 bx--col-lg-16 bx--col-padding`}>
                        <h3 className="search-title"><TextInput
                            labelText="Ingrese el nombre del lugar"
                            placeholder="Campamento sangre sucia"
                            value={this.state.name}
                            onChange={(ev) => this.setState({ name: ev.target.value })}
                        /></h3>
                    </div>
                </div>
                <Tile className="card_center" style={{ backgroundColor: "rgba(177, 207, 95, 0.842)" }}>
                    <div className="bx--row bx--row-paddign" style={{ paddingLeft: "1em" }}>


                        <div className="bx--col-lg-1 bx--col-md-2 bx--col-sm-4 ">
                            <Location32
                                onClick={() => {
                                    console.log("click location")
                                }} />
                        </div>
                        <div className="bx--col-lg-7 bx--col-md-6 bx--col-sm-4 bx--aspect-ratio bx--aspect-ratio--16x9">
                            <div className="bx--aspect-ratio--object">

                                <img className="upload-placeholder" src={this.state.currentImage} alt="upload multimedia" />
                                <CloseFilled32 className="removeImage" style={{ display: (this.state.uploaded) ? "inline-block" : "none" }}
                                    onClick={() => {
                                        this.setState({ currentImage: Multimedia, uploaded: false })
                                        document.getElementById('imageUploader').value = null;
                                    }} />
                                <FileUploaderDropContainer
                                    id="imageUploader"
                                    style={{ height: "100%" }}
                                    className="image-uploader"
                                    accept={['jpg', 'png']}
                                    labelText=""
                                    name="imageUploader"
                                    onAddFiles={(eve, { addedFiles }) => {
                                        this.setState({ currentImage: URL.createObjectURL(addedFiles[0]), uploaded: true });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="bx--col-lg-7 bx--col-md-8 bx--col-sm-4" style={{ position: 'relative' }}>

                            <TextArea
                                labelText="Ingrese una descripcion del lugar"
                                placeholder="Aquí puede contarnos por que ir a acampar aqui"
                                value={this.state.description}
                                onChange={(ev) => this.setState({ description: ev.target.value })}
                            />
                            <TextArea
                                labelText="Algunos detalles extras que quieras agregar?"
                                placeholder="Deje los campos separados con comas y se enlistaran"
                                value={this.state.more}
                                onChange={(ev) => this.setState({ more: ev.target.value })}
                            />
                        </div>

                    </div>
                    <div className="bx--row bx--row-paddign" style={{ paddingLeft: "1em", marginTop: "2em" }}>
                        <div className="bx--col-lg-2 bx--offset-lg-1 bx--col-md-3 bx--col-sm-2">
                            <TextInput
                                id=""
                                labelText="Posible Gasto"
                                placeholder="$100-$234 mx"
                                value={this.state.price}
                                onChange={(ev) => this.setState({ price: ev.target.value })}
                            />
                        </div>
                        <div className="bx--col-lg-3 bx--offset-lg-9 bx--col-md-2 bx--offset-md-3 bx--col-sm-2">
                            <Button
                                labelText="Posible Gasto"
                                placeholder="$100-$234 mx"
                                onClick={()=>{
                                    let { currentImage,...data} = {...this.state}
                                    createCamp(data)

                                }}
                            >Agregar Campamento</Button>
                        </div>
                    </div>

                </Tile>

            </div>
        )
    }
}

export default NewCamp;
