import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TopicCard from '../components/TopicCard';
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
}));

function RenderTags({tags, locale}) {
    let i=0;
    const output = tags.map((tag) => {
        return (
            <Link className="homepage-tags" key={i++} to={{pathname:`/${locale.split('-')[0]}/explore`, topic:`${tag.name}`}}
                onClick={()=>{
                    window.gtag("event", "topic tag from homepage", {
                        event_category: "topics",
                        event_label: tag.name
                    }); 
                }}
            >
                <span className={`tag tag-${tag.id}`}>
                    <FormattedMessage 
                        id={`topics.${tag.name.split(" ")[0]}.${locale}`}
                        defaultMessage={tag.name}
                    />
                </span>
            </Link>
        );
    });
    return output;
}

function MadridProviders({providers}) {
    const providersList = providers.map((provider) => {
        return(
            <Grid item xs={4} sm={3} md={2} key={provider.id}>
                <div className="logo-container">
                    <a href={`${provider.url}`} target="_blank" rel="noopener noreferrer"> 
                        <img src={`../images/logos/${provider.logo}.png`} alt={`${provider.logo} logo`} />
                    </a>
                </div>
            </Grid>
        );
    });

    return(
        <Grid container spacing={2}>
            {providersList}
        </Grid>
    );
}

function OnlineProviders({providers}) {
    const providersList = providers.map((provider) => {
        return(
            <Grid item xs={4} sm={3} md={2} key={provider.id}>
                <div className="logo-container">
                    <Link to={`classes/${provider.id}`}> 
                        <img src={`../images/logos/${provider.logo}.png`} alt={`${provider.logo} logo`} />
                    </Link>
                </div>
            </Grid>
        );
    });

    return(
        <Grid container spacing={2}>
            {providersList}
        </Grid>
    );
}

function Home(props) {
    const classes = useStyles();
    return(
        <LocaleContext.Consumer>{(context) => {
            const locale = context.locale;
            return(<Container className="main-content">
            <div className="tagline">
                <h2 className="tagline-header">
                    <FormattedMessage 
                        id={`homepage.tagline.header.${locale}`}
                        defaultMessage="Parenting and pregnancy classes for all"
                    />
                </h2>  
                <p className="tagline-paragraph">
                    <FormattedMessage 
                        id={`homepage.tagline.paragraph.${locale}`}
                        defaultMessage="Find pregnancy and parenting classes and events, either online or in one of the cities we are in"
                    />
                </p>
                <div className="main-links">
                    <Link to={{pathname:`/${locale.split('-')[0]}/explore/online`, topic:"all"}}>
                        <Button id="online-classes-btn" variant="contained" className={`btn-first ${classes.button}`}>
                            <FormattedMessage id={`homepage.tagline.online.button.${locale}`} />
                        </Button>
                    </Link>
                    <Link to={{pathname:`/${locale.split('-')[0]}/explore/madrid`, topic:"all"}}>
                        <Button id="madrid-classes-btn" variant="contained" className={`btn-second ${classes.button}`}>
                            <FormattedMessage id={`homepage.tagline.madrid.button.${locale}`} />
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="popular-topics">
                <h2>
                    <FormattedMessage id={`homepage.popularTopics.${locale}`} />    
                </h2>  
                <Grid container className="topic-cards" spacing={2} alignContent="center">
                    <TopicCard
                        locale={`${locale}`}
                        topic="parenting" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.parenting.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("pregnancy")).length}/>
                    <TopicCard 
                        locale={`${locale}`}
                        topic="pregnancy" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.pregnancy.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("pregnancy")).length}/>
                    <TopicCard 
                        locale={`${locale}`}
                        topic="baby" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.baby.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("baby")).length}/>
                    <TopicCard 
                        locale={`${locale}`}
                        topic="nutrition" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.nutrition.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("nutrition")).length}/>
                    <TopicCard 
                        locale={`${locale}`}
                        topic="music" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.music.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("music")).length}/>
                    <TopicCard
                        locale={`${locale}`}
                        topic="postpartum" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.postpartum.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("postpartum")).length}/>
                    <TopicCard
                        locale={`${locale}`}
                        topic="yoga" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.yoga.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("yoga")).length}/>
                    <TopicCard
                        locale={`${locale}`}
                        topic="first aid" 
                        topicLocalised={                            
                            <FormattedMessage id={`topics.first.${locale}`} />
                        }
                        resultCount={props.classEntries.filter((item) => item.tags.includes("first aid")).length}/>
                </Grid>
            </div>
            <div className="all-topics">
                <h2>
                <FormattedMessage id={`homepage.allTopics.${locale}`} />        
                </h2>  
                <RenderTags tags={props.topics} locale={`${locale}`} /> 
            </div>
            <div className="row">
                <div className="col s12 m12 l12 partners">
                    <h2><FormattedMessage id={`homepage.providers.madrid.header.${locale}`} /></h2> 
                    <MadridProviders providers={props.madridProviders}/>
                    {/* <RenderProviderCard provider={props.providers} /> */}
                </div>
            </div>
            <div className="row">
                <div className="col s12 m12 l12 partners">
                    <h2><FormattedMessage id={`homepage.providers.online.header.${locale}`} /></h2> 
                    <OnlineProviders providers={props.onlineProviders}/>
                </div>
            </div>
        </Container>)}}</LocaleContext.Consumer>
    );
}

export default Home; 