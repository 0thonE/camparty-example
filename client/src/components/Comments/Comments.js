import React from "react";

import { Tile } from "carbon-components-react";

class Comments extends React.Component {

    renderComment = (comment) => (
        <Tile style={{border:"0.5px solid grey",backgroundColor: "rgba(68, 77, 65, 0.719)", color:"whitesmoke"  }}>
            <div className="bx--row">
                <div className="bx--col-lg-14" style={{ paddingLeft: "1em" }}>
                    {comment.usern}
                </div>
                <div className="bx--col-lg-2 " >
                    {comment.date.toLocaleString().slice(0,-3)}
                </div>
            </div>
            <hr />
            <div className="bx--row">
                <div className="bx--col--lg-16" style={{ paddingLeft: "2em" }}>
                    <p>{comment.comment}</p>
                </div>
            </div>
        </Tile>
    )


    render() {

        return (
            <Tile style={{ backgroundColor: " rgba(57, 77, 50, 0.808)" }}>
                <div className="bx--grid bx--grid--full-width">
                    <div className="bx--row text-center">
                        <div className="bx--col-md-4 bx--col-lg-16 bx--col-padding" style={{color:"whitesmoke"}}>
                            <h4 className="search-title">{(this.props.comments.length===0)?"Se el primero en compartir tu experiencia!!":"Comentarios"}</h4>
                        </div>
                    </div>
                    <div >
                        {this.props.comments.map(com => this.renderComment(com))}
                    </div>
                </div>
            </Tile>
        )
    }
}

export default Comments;
