import React from 'react';
import ReactDOM from 'react-dom';
import searchSnippets from '../search/snippets'
import parse from 'html-react-parser';

class Plugin extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            code: props.code,
            htmlTemplate: ''
        };
    }
    componentDidMount() {
        this.setState({
            htmlTemplate: '<div class="hello">{Search} <div class="hello">{Search} <div>HELLO</div> {Search}</div> HELLO {Search}</div> {Search}',
            jsonData: {
                value: 'value',
            },
        });
    }
    render() {       
        return parse(this.state.htmlTemplate, {
            replace: domNode => {
               
                if (domNode.data) {
                  
                    const parsed =  domNode.data.split(/(\{(?:.*?)\})/g).map((match, i) => {
                        if (match.indexOf('{') == 0) {
                            const Snippet = searchSnippets[match.replace('{', '').replace('}', '')];
                            return <React.Fragment><Snippet /></React.Fragment>
                        } else {
                            return parse(match)
                        }
                    })
                    console.log(parsed)
                    return <React.Fragment>{parsed}</React.Fragment>;
                }
            }
        })// <React.Fragment>{content}</React.Fragment>
    }
}

export default Plugin;
