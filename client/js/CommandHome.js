import React from 'react';
import CommandList from './CommandList';
import * as LoginUtils from './utils/LoginUtils';
import * as Config from './utils/config';
import * as CommandService from './services/CommandService';
export default React.createClass({

    getInitialState() {
        return {command: []}
    },

    componentDidMount() {
        if(!LoginUtils.isLogin()) return '#login';
        this.getNotification();
    },

    getNotification() {
        let position = LoginUtils.whoIsOnline();
        CommandService.findAll(position).then(command => this.setState({command}));
    },

    courseLinkHandler(course) {
        window.location.hash = "#course/" + course.id;
    },

    teacherLinkHandler(course) {
        window.location.hash = "#teacher/" + course.teacher_id;
    },

    rowClick(data) {
        if (this.props.onRowClick) {
            this.props.onRowClick(data);
        }
    },

    render() {
        let rows;
        if (this.state.command) {
            rows = this.state.command.map(item => <CommandList data={item} />);
        }

        return (
            <div>
                {rows}
            </div>

        );
    }

});
