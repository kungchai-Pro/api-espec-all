var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRoute');
var positionRouter = require('./routes/positionRoute');
var departmentRouter = require('./routes/departmentRoute');
var menuallRouter = require('./routes/menuallRoute');
var groupmenudetailRoute = require('./routes/groupmenudetailRoute');
var flowsystemRouter = require('./routes/flowSystemRoute');
var flowsystemsubRouter = require('./routes/flowdsystemsubRoute');
var flowdetailRoute = require('./routes/flowdetailRoute');
var flowdetailsubRoute = require('./routes/flowdetailsubRoute');
var typedocumentRoute = require('./routes/typedocumentRoute');
var transitionflowRoute = require('./routes/transitionflowRoute');
var transitionnoteRoute = require('./routes/transitionnoteRoute');
var dedicateToRuote = require('./routes/dedicateToRuote');
var flowrunsystemRoute = require('./routes/flowrunsystemRoute');
var typestatusRoute = require('./routes/typestatusRoute');
var runningdocumentRoute = require('./routes/runningdocumentRoute');
var runningGroupItemRoute = require('./routes/runningGroupIdRoute');
var documentRoute = require('./routes/documentRuote');
var uploadefileRoute = require('./routes/uploadfile.route');
var usergroupProfile = require('./routes/userGroupProfileRoute');
var JournalBygroupRoute = require('./routes/JournalBygroupRoute');
var typeproductRoute = require('./routes/typeproductRoute');
var hostemailRoute = require('./routes/HostEmailRoute');
var journalImagesRoute = require('./routes/journalImageRoute');
var batchversionRoute = require('./routes/batchversionRoute');
var PackagingDetailRoute = require('./routes/packaginDetailRoute');
var notejournalgroup = require('./routes/noteJournalgroupRoute');
var noterejectgroupRoute = require('./routes/noterejectgroupRoute');


global.__basedir = __dirname;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/api/spec/user', usersRouter);
app.use('/api/spec/position', positionRouter);
app.use('/api/spec/department', departmentRouter);
app.use('/api/spec/menuall', menuallRouter);
app.use('/api/spec/groupmenudetail', groupmenudetailRoute);
app.use('/api/spec/flowsystem', flowsystemRouter);
app.use('/api/spec/flowsystemsub', flowsystemsubRouter);

app.use('/api/spec/flowdetail', flowdetailRoute);
app.use('/api/spec/flowdetailsub', flowdetailsubRoute);

app.use('/api/spec/typedocument', typedocumentRoute);
app.use('/api/spec/transitionflow', transitionflowRoute);
app.use('/api/spec/transitionnote', transitionnoteRoute);
app.use('/api/spec/dedicateto', dedicateToRuote);
app.use('/api/spec/flowrunsystem', flowrunsystemRoute);
app.use('/api/spec/typestatus', typestatusRoute);
app.use('/api/spec/runningdocument', runningdocumentRoute);
app.use('/api/spec/runninggroupId', runningGroupItemRoute);
app.use('/api/spec/document', documentRoute);
app.use('/api/spec/groupProfile', usergroupProfile);
app.use('/api/spec/file', uploadefileRoute);
app.use('/api/spec/JournalBygroup', JournalBygroupRoute);
app.use('/api/spec/typeproduct', typeproductRoute);
app.use('/api/spec/hostemail', hostemailRoute);
app.use('/api/spec/journalImages', journalImagesRoute);
app.use('/api/spec/batchversion', batchversionRoute);
app.use('/api/spec/packagingDetail', PackagingDetailRoute);
app.use('/api/spec/notejournalgroup', notejournalgroup);
app.use('/api/spec/noterejectgroup', noterejectgroupRoute);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
