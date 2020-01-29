import Modernizr from 'modernizr';

const isWin = /windows/gi.test(navigator.userAgent);

const isIe = /trident.+rv:\d+/gi.test(navigator.userAgent);
const isIe10 = /trident.+rv:10/gi.test(navigator.userAgent);
const isIe11 = /trident.+rv:11/gi.test(navigator.userAgent);

const isEdge = /windows.+edge\/\d+/gi.test(navigator.userAgent);

Modernizr.addTest('ipad', function () {
	return !!navigator.userAgent.match(/iPad/i);
});

Modernizr.addTest('iphone', function () {
	return !!navigator.userAgent.match(/iPhone/i);
});

Modernizr.addTest('ipod', function () {
	return !!navigator.userAgent.match(/iPod/i);
});

Modernizr.addTest('appleios', function () {
	return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
});

Modernizr.addTest('ie', isIe);
Modernizr.addTest('ie-10', isIe10);
Modernizr.addTest('ie-11', isIe11);
Modernizr.addTest('edge', isEdge);

Modernizr.addTest('windows', isWin);
