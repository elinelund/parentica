import React, { Component } from 'react';
import DesktopHeader from './Header/DesktopHeader';
import DesktopNavigation from './DesktopNavigation';
import MobileBackHeader from './Header/MobileBackHeader';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class ClassDetails extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const divStyle = {
            backgroundImage: 'url(../' + this.props.selectedClass.image + ')',
        };

        return(
            <React.Fragment>
                <MobileBackHeader link="/classes" />
                
                <DesktopHeader/>
                <div className="row">
                    <div className="container class-details">
                        <div className="class-image-mobile hide-on-large-only" style={divStyle}>
                        </div>
                        <DesktopNavigation />
                        <div className="col s12 m9 l9 class-details">
                            <div className="class-image hide-on-med-and-down" style={divStyle}>
                            </div>
                            <div className="header">
                                <div className="header-top">
                                    <div className="company">
                                        <img class="logo" src={`../${this.props.selectedClass.image}`}></img>
                                        <span>
                                        {this.props.selectedClass.companyName}
                                        </span>
                                    </div>
                                    <div className="price">
                                        <span>{this.props.selectedClass.price}€</span>
                                    </div>
                                </div>
                                <div className="header-bottom">
                                    <span className="title">{this.props.selectedClass.className}</span>
                                </div>
                            </div>
                            <div className="card-tabs">
                                <p className="description">{this.props.selectedClass.description}</p>
                            </div>
                            <div className="actions">
                                <a class="waves-effect waves-light btn" 
                                   href={`${this.props.selectedClass.url}`} 
                                   rel="nofollow" 
                                   target="_blank">
                                Select
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(ClassDetails);