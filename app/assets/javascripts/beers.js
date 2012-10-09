
/*
 *  MAIN JS FILE
 * loads feed
 * renders views
 * sets up listeners
 * 
 * 
 * 
 */



var itemTemplate = '<div class="beerName">name</div>';

function alertMe() {
    alert('Hello beer!');
}

$().ready( function() {
	getAjax();
});

function getAjax() {
   
    $.ajax({
        url: "http://localhost:3000/beers.json",
        dataType: "json",
        type: "GET",
        processData: true,
        contentType: "application/json",
        success : populate
    });
}

function populate( data ) {
    //alert( 'data:' + data);
    $( data ).each( function( index ) {
        console.log('index=' + index );
       
        $('#list').append( '<div class="item">' + this.name + '</div>');
        
        
    })
}