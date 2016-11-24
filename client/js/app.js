import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';

import Shell from './Shell';
import LoginView from './LoginView';
import CourseHome from './CourseHome';
import CourseRecord from './CourseRecord';
import CourseView from './CourseView';
import CourseFormWrapper from './CourseFormWrapper';
import StudentHome from './StudentHome';
import StudentRecord from './StudentRecord';
import StudentView from './StudentView';
import StudentFormWrapper from './StudentFormWrapper';
import TeacherHome from './TeacherHome';
import TeacherRecord from './TeacherRecord';
import TeacherView from './TeacherView';
import TeacherFormWrapper from './TeacherFormWrapper';
import ManagerHome from './ManagerHome';
import SalesmanHome from './SalesmanHome';
import ProductRecord from './ProductRecord';
import ProductView from './ProductView';
import ProductFormWrapper from './ProductFormWrapper';
import StockmanHome from './StockmanHome';
import ErrorPage from './ErrorPage';

render((
    <Router >
        <Route path="/" component={Shell}>
            <IndexRoute component={StudentHome}/>
            <Route path="login" component={LoginView}/>
            <Route path="student" component={StudentRecord}>
                <Route path=":studentId" component={StudentView}/>
                <Route path=":studentId/edit" component={StudentFormWrapper}/>
            </Route>
            <Route path="courses" component={CourseHome}/>
            <Route path="course" component={CourseRecord}>
                <Route path=":courseId" component={CourseView}/>
                <Route path=":courseId/edit" component={CourseFormWrapper}/>
            </Route>
            <Route path="teachers" component={TeacherHome}/>
            <Route path="teacher" component={TeacherRecord}>
                <Route path=":teacherId" component={TeacherView}/>
                <Route path=":teacherId/edit" component={TeacherFormWrapper}/>
            </Route>
            <Route path="managers" component={ManagerHome} />
            <Route path="salesmen" component={SalesmanHome} />
            <Route path="salesman" component={ProductRecord}>
                <Route path=":productId" component={ProductView} />
                <Route path=":productId/edit" component={ProductFormWrapper} />
            </Route>
            <Route path="stockmen" component={StockmanHome} />
            <Route path="error" component={ErrorPage} />
            <Route path="*" component={StudentHome}/>
        </Route>
    </Router>
), document.body);
