import React, { Component } from 'react';

class Classes extends Component {

    constructor (props) {
        super(props);
    }

    render() {

        const classes = this.props.classes.map((classEntry) => {
            const divStyle = {
                backgroundImage: 'url(' + classEntry.image + ')',
            };
            return (
                <div className="col s12 m4 l3" key={classEntry.id}>
                    <div className="card" onClick={() => this.props.onClick(classEntry.id)}>
                        <div className="card-image" style={divStyle} >
                        </div>
                        <div className="card-content">
                            <span className="card-title">{classEntry.className}</span>
                            <span className="card-subtitle">{classEntry.companyName}</span>
                            <div className="card-footer">
                                <div className="datetime">
                                    <span>
                                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(classEntry.date)))}
                                    {/* {classEntry.date} */}
                                    </span>
                                </div>
                                <div className="price">
                                    <span>{classEntry.price}€</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return(
            <React.Fragment>
                <div className="row">
                    <div className="col s12">
                        <h2>All classes</h2>
                    </div>
                </div>
                <div className="row">
                    {classes}
                </div>
            </React.Fragment>
        );
    }
}

export default Classes;