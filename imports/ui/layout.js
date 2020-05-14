import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor

//ui imports
import './layout.html';
import './mygallery.html';
import './addimage.html';
import './editimage.html';
import './navbar.html';
import './banner.html';
import './randomimg.html';
import './error404.html';
import './viewimage.html';
import './about.html';
import './login.html';

//api imports
import '../../lib/collection.js';
import '../../lib/accounts-ui.js';
import '../api/infinitescroll.js';
import '../api/mygallery.js';
import '../api/addimage.js';
import '../api/editimage.js';
import '../api/router.js';
import '../api/randomimg.js';
import '../api/viewimage.js';