var express = require( 'express' );
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const request = require( 'request' );
const queryString = require('query-string');


var app = express();

app.use( "/public", express.static( __dirname + "/public" ) );

app.get( '/', function( req, res ) {  
    res.sendFile( __dirname + '/templates/index.html' );
} );


app.post( '/wayscript_ajax', jsonParser, function( req, res ) {  
    
    //THIS MUST ALWAYS BE KEPT SERVER SIDE, NEVER EVER EMIT TO CLIENT
    //GET YOUR KEY AT https://wayscript.com/user/<your_username>
    var secret_key = 'dsafds';
    var prog_id = 0;
    if ( !secret_key.length )                       throw( 'Error: Must enter a valid api key in app.js' );
    if ( !prog_id || !Number.isInteger( prog_id ) ) throw( 'Error: Must enter a valid program id in app.js' );

    var url = 'https://wayscript.com/api?'  
    var variables = req.body
    var params = { api_key    : secret_key,
                   program_id : 4614,
                   variables  : JSON.stringify( variables )  }
    
    url = url + queryString.stringify( params );

    request( { url : url }, function( err, response, body ) {  
        if ( err ) { 
            console.log( 'error' );
            res.send( err ); 
        
        } else res.send( JSON.parse( body ) ); 
    } );
} );

var server = app.listen( 8081, function () {  
    var port = server.address().port

    console.log( "WayScript Ajax Example Running At http://127.0.0.1:8081" );
} );