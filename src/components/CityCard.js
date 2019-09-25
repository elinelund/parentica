import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

export default function CityCard(props) {
    let topicId = props.topic.split(" ")[0];
    let topic = props.topic;
    return(
        <Grid item xs={6} sm={4} md={3} key="3">
            <Link to={{pathname:`/${props.locale.split('-')[0]}/${topic}`}}
                onClick={()=>{
                    window.gtag("event", "city card", {
                        event_category: "topics",
                        event_label: topic
                    }); 
                }}
            >
            <Card className="city-card">
                <CardActionArea>
                    <CardMedia
                    image={`../images/cities/${topicId}.jpg`}
                    title={props.topicLocalised}
                    />
                    <CardContent>
                    <h4>{props.topicLocalised}</h4>
                    {/* <span>{props.resultCount} classes</span> */}
                    </CardContent>
                </CardActionArea>
            </Card>
            </Link>            
        </Grid>
    );
}