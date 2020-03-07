var automobil = {
    proizvodjac:"Zastava",
    model:"fica", 
    boja:"bela",
    brzina: 1,
    gpsX: 0,
    gpsY: 0,
    movementEnabled:true,
    boxes:[],
    podaci: function(){
        return "<div class='col-xs-4'>Proizvodjac:</div><div class='col-xs-4'>" + this.proizvodjac + '</div>' +
               "<br><div class='col-xs-4'> Model:</div><div class='col-xs-4'>" + this.model + '</div>' +
               "<br> <div class='col-xs-4'> Boja:</div><div class='col-xs-4'>" + this.boja + '</div>' +
               "<br> <div class='col-xs-4'> Brzina:</div><div class='col-xs-4'>" + this.brzina + '</div>' +
               "<br> <div class='col-xs-4'> gpsX:</div><div class='col-xs-4'>" + this.gpsX + '</div>' +
               "<br> <div class='col-xs-4'> gpsY:</div><div class='col-xs-4'>" + this.gpsY+ '</div>'+
               "<br> <div class='col-xs-4'> Movment enabled:</div><div class='col-xs-4'>" + this.movementEnabled+ '</div>'+
               "<br> <div class='col-xs-4'> Boxes:</div><div class='col-xs-4'>" + this.boxes+ '</div>';
    }
}; 

var limit = $('#limit').val();
//prikaz pocentog stanja objekta automobil
ispisiStanje();

function unesiKoordinate()
{
    automobil.gpsX = $('#x').val();
    automobil.gpsY = $('#y').val();
    ispisiStanje();
    console.log(automobil);
}

function ispisiStanje(){
    
   $('#automobil').html(automobil.podaci());
    
};


function moveLeft()
{
    
    if(automobil.gpsX == 0 && !automobil.movementEnabled)
    {
        return;
    }
    
    automobil.gpsX -= automobil.brzina;
    move();
    //document.getElementById('fica').style.marginLeft = automobil.gpsX + 'px';
    ispisiStanje();
    
    
    setTimeout(function(){
        moveLeft();
    },5);
}

var j = 0;

function moveRight()
{
    if((automobil.gpsX == 0 || automobil.gpsX == limit) && !automobil.movementEnabled)
    {
        //alert('Stop all processes')
        return;
    }
    
   
    for(var i = 0; i < colors.length; i++)
    {
        var offset = $('#box_' + i).offset().left;
        
        if(automobil.gpsX == offset )
        {
            $('#box_' + i).hide();
            automobil.boxes[j] = colors[i];
            j++;
        }
    }
    
    automobil.gpsX += automobil.brzina;
    move();
    ispisiStanje();
    
   
    //rekurzivni poziv funkcije setTimeout us minimalnu vremensku fluktuaciju
    //kako web browser ne bi imao problema
    setTimeout(function(){
        moveRight();
    },5);
    
}

function moveUp()
{
    automobil.gpsY -= automobil.brzina;
    ispisiStanje();
    move();
}

function moveDown()
{
    automobil.gpsY += automobil.brzina;
    ispisiStanje();
    move();
}

function enableMovement()
{
    
    automobil.movementEnabled = true;
    ispisiStanje();
}

function move()
{
    if(automobil.gpsX == 0 || automobil.gpsX == limit)
    {
        automobil.movementEnabled = false;
    }
    document.getElementById('fica').style.marginLeft = automobil.gpsX + 'px';
    document.getElementById('fica').style.marginTop = automobil.gpsY + 'px';
}


/*setTimeout(function(){
    alert('Proslo je 10000ms');
    
}, 10000);*/
ispisiStanje();
/*for(var i = 0; i < ( 760 / automobil.brzina ); i++)
{
    setTimeout(function(){
       moveRight();
    }, 1000);
    
}

for(var i = 0; i < ( 760 / automobil.brzina ); i++)
{
    setTimeout(function(){
       moveLeft();
    }, 1000);
    
}*/

/*
 * 
 * <div style="">
     
 </div>
 * 
 */

function drawBoxTemplate(inputColor, inputSize, inputNumber, marginLeft)
{
    var colorAttributes = "background-color:" + inputColor + ";";
    var otherAttributes = "margin-top:-50px;margin-left:" + marginLeft +"px;";
    var sizeAttributes = "width:" + inputSize + "px; height:"+ inputSize +"px;";
    var styleAttribute = colorAttributes + otherAttributes + sizeAttributes;
    
    var idAttribute = "box_" + inputNumber;
    var divElement = "<div style='" + styleAttribute + "' id='" + idAttribute+ "'></div>";
    /*var boxesOffsetObject = $('#boxes').offset();
    alert(boxesOffsetObject.left);*/
    
    $('#boxes').append(divElement);
}

var colors = ['red', 'green' , 'blue', 'purple', 'black', 'gray',
    'yellow', 'aquamarine', 'orange', 'brown', 'pink'];

var marginLeft = 210;
for(var i = 0; i < colors.length; i++)
{
    drawBoxTemplate(colors[i], 50, i, marginLeft);
    //drawBoxTemplate(colors[i], i*10, i, marginLeft);
    marginLeft+=75;//marginLeft = marginLeft + 25;
    
    //drawBoxTemplate(colors[i], i*10, i);
}



function turboOn()
{
    automobil.brzina = 5;
    ispisiStanje();
    
}
function turboOff()
{
    automobil.brzina = 0.5;
    ispisiStanje();
    
}