import React from 'react';
import { LocaleContext } from '../contexts/LocaleContext';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';

export default function LanguageSelector() {
    return(<LocaleContext.Consumer>{(context) => {
        const {setEnglish, setSpanish} = context;
        const locale = context.locale;
        return(
            <div className="locale-selector">
                <span>
                    <FormattedMessage 
                        id={`navbar.selectLanguage.${locale}`}
                        defaultMessage=""
                    />:
                </span>
                {/* <img className="locale-flag" src='../images/flags/spanish.png' alt="Spanish flag"
                    onClick={setSpanish} /> */}
                {/* <img className="locale-flag" src='../images/flags/english.png' alt="British flag"
                    onClick={setEnglish} /> */}
                <a href="/es" className="language-selector-btn" onClick={setSpanish}>español</a>
                <a href="/en" className="language-selector-btn" onClick={setEnglish}>english</a>

            </div>);
    }}</LocaleContext.Consumer>);
}