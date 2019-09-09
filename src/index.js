import React from 'react';
import searchSnippets from './plugins/search/snippets';
import './styles.css';
import search from './plugins/search/snippets/search';
import Plugin from './plugins/core/plugin';
import EventEmitter from 'events';
import {inherits} from 'util';

function init(appId, code) {
  ReactDOM.render(<Plugin code={code}/>, document.getElementById(appId));
}

export default init;
