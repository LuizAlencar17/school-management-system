import React from 'react';

import { connect } from 'react-redux';

const Video = ({ activeModule, activeLesson}) => (
    <div className="sidebar">
        <strong>Module: </strong> {activeModule.title} <br/>
        <strong>Class: </strong> {activeLesson.title} <br/><br/>
    </div>
);

export default connect( state => ({
    activeModule: state.activeModule,
    activeLesson: state.activeLesson,
}))(Video);