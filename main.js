var fs = require( 'fs' );
var EPub = require("epub");
var path = require( 'path' );
var count=0;
fs.readdir( "TestEpubs", function( err, files ) 
        {
        if( err ) {
            console.error( "Could not locate the directory.", err );
            process.exit( 1 );
        } 
        files.forEach( function( file, index ) {
        var tempPath1=path.join( "TestEpubs", file );
        var epub = new EPub(`${tempPath1}`);
         epub.on("end", function()
	    {
	    var name=epub.metadata.title;
	    var authors=epub.metadata.creator;
	    fs.mkdirSync(`${++count}`);
	    metaData = {  
        title: name,
        contributors:[authors]
        }
        data = JSON.stringify(metaData, null, 2);
        fs.writeFileSync(`${count}/index.json`, data); 
	    });
        epub.parse();
        
        });
        });
    

                 
        
        

