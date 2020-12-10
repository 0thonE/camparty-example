import React from "react";
import { Content } from "carbon-components-react/es/components/UIShell";
import CampsList from './CampsList'
import { Search } from "carbon-components-react";

import { getAllCamps } from "../../services/api-requests"


class Camps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            camps: [],
            searchValue: '',
            searchActive: false
        }
    }

    componentWillMount() {
        getAllCamps(this);
    }


    render() {
        const filteredCamps = this.state.camps.filter(camp => {
            return camp.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
        })

        return (
            <div>
                <div className="bx--grid bx--grid--full-width">
                    <div className="bx--row text-center">
                        <div className={`bx--col-md-4 bx--col-lg-16 bx--col-padding`}>
                            <h3 className="search-title">¡Encuentra tu lugar para acampar!</h3>
                        </div>
                    </div>
                    <div className="bx--row search-row">
                        <div className={` bx--offset-md-4 bx--col-md-4 bx--offset-lg-${this.state.searchActive ? '6' : '10'} bx--col-lg-${this.state.searchActive ? '10' : '6'} bx--col-padding`}>
                            <Search
                                className="search-tool"
                                labelText='labelText'
                                onChange={(event) => {
                                    this.setState({
                                        searchValue: event.target.value
                                    })
                                }}
                                onSelect={() => {
                                    this.setState({ searchActive: true })
                                }}
                                onBlur={() => {
                                    this.setState({ searchActive: false })
                                }}
                            />
                        </div>
                    </div>
                    <div className="bx--row">
                        <CampsList camps={filteredCamps}></CampsList>
                    </div>
                </div>
            </div>
        )
    }
}

export default Camps;
