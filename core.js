/* ----------------------------------------------------------------------------
	CONTEXT
   ------------------------------------------------------------------------- */

//Window dimensions
var h = window.innerHeight;
var w = window.innerWidth;

//Others
var canvas = null;
var ctx = null;






var grid = [];

/* ----------------------------------------------------------------------------
	RESIZING CANVAS GENERATION
   ------------------------------------------------------------------------- */

	/* -------------------------------------
		COORDINATES
	   ------------------------------------- */

	    /*
	   		Conversion of the window coordinates to iFrame internal coordonates
	   			-> Window coordonates to Relative coordonates (1920:1080)
	    */

  			function x(val)
  			{
  				return (val*h)/1080;
  			}

  			function y(val)
  			{
  				return (val*w)/1900;
  			}

	/* -------------------------------------
		INITIALISATION OF THE NEW DRAWING FUNCTIONS
	   ------------------------------------- */

	   	function fillRect(posx, posy, largeur, hauteur, color)
	   	{
	   		//Obtention du contexte
  			canvas=document.getElementById("canvas");
  			if (canvas.getContext)
      		{
        		ctx = canvas.getContext("2d");
        		ctx.fillStyle = color;
	   			ctx.clearRect(x(posx), y(posy), x(largeur), y(hauteur));
	   		}
	   	}

  		function init()
  		{
  			//Obtention du contexte
  			canvas=document.getElementById("canvas");
  			if (canvas.getContext)
      		{
        		ctx = canvas.getContext("2d");

        		//Redéfinition des fonctions canvas

        		Object.getPrototypeOf(ctx).fillRect2=function(posx, posy, largeur, hauteur)
        		{
        			ctx.fillRect(x(posx), y(posy), x(largeur), y(hauteur));
        		}

        		Object.getPrototypeOf(ctx).clearRect2=function(posx, posy, largeur, hauteur)
        		{
        			ctx.clearRect(x(posx), y(posy), x(largeur), y(hauteur));
        		}

        		Object.getPrototypeOf(ctx).strokeRect2=function(posx, posy, largeur, hauteur)
        		{
        			ctx.strokeRect(x(posx), y(posy), x(largeur), y(hauteur));
        		}

        		Object.getPrototypeOf(ctx).moveTo2=function(posx, posy)
        		{
        			ctx.moveTo(x(posx), y(posy));
        		}

        		Object.getPrototypeOf(ctx).lineTo2=function(posx, posy)
        		{
        			ctx.lineTo(x(posx), y(posy));
        		}


        		//ctx.arc(75,75,50,0,Math.PI*2,true)
        		Object.getPrototypeOf(ctx).arc2=function(cposx, cposy, rayon, startAngle, endAngle, counterclockwise = false)
        		{
        			ctx.arc(x(cposx), y(cposy), x(rayon), startAngle, endAngle, counterclockwise);
        		}
        	}

  			resize();
  		}

	/* -------------------------------------
		RESIZE
	   ------------------------------------- */

  		function resize()
  		{
  			newh = window.innerHeight;
  			neww = window.innerWidth;

  			 // 1080/1900 = 0.56842105263

  			//Si largeur trop importante
  			if(newh/neww > 0.56842105263)
  			{
				newh = (neww*1080)/1900;
  			}
  			//Si hauteur trop importante
  			else
  			{
  				neww = (newh*1900)/1080;
  			}

  			canvas.width = neww;
  			canvas.height = newh;
  			h = newh;
  			w = neww;
  			draw();
  		}

	/* -------------------------------------
		DRAWING MODULE
	   ------------------------------------- */

    	function draw()
    	{
            //GENERATION OF THE GAME GRID

            //Generation of the display grid
            ctx.strokeStyle = "#000000";
            for(i=0;i<1920;i=i+10)
            {
                for(j=0;j<1080;j=j+10)
                {
                    ctx.strokeRect2(i,j,10,10);
                }
            }

            //Generation of the data grid
            for(i=0;i<192;i=i+1)
            {
            	grid.push([]);
                for(j=0;j<108;j=j+1)
                {
                	grid[i].push(0);
                }
            }

            /*var cell1 = new lifeform(10, 10, 1);
			cell1.draw();
			setTimeout(function(){
    			cell1.moveTo(1,1);
			}, 1000);
			setTimeout(function(){
    			cell1.moveTo(1,1);
			}, 2000);
			setTimeout(function(){
    			cell1.moveTo(1,1);
			}, 3000);
			setTimeout(function(){
    			cell1.moveTo(1,1);
			}, 4000);
			setTimeout(function(){
    			cell1.moveTo(1,1);
			}, 5000);
			setTimeout(function(){
    			cell1.moveTo(1,1);
			}, 6000);*/

			var cell1 = new lifeform(50, 50, 1);
			var cellTab = [cell1];
			var j=0;
			cell1.draw();
			for(i=0;i<600000*2;i=i+2)
            {
            	setTimeout(function(){
            		for(k=0;k<=j;k++)
            		{
            			if(cellTab[k].dead == false)
            			{
            				var temp = cellTab[k].turnAction();
	            			if(temp != 0)
	            			{
	            				cellTab.push(temp);
	            				j++;
	            			}
            			}
            			else
            			{
							cellTab.splice(k, 1);
							j--;
            			}

            		}
				}, i);
            }
			
    	}

	/* -------------------------------------
		EVENTS
	   ------------------------------------- */

	   //On window resize : resize the canvas
    	window.onresize = resize;


/* ----------------------------------------------------------------------------
	OBJECTS
   ------------------------------------------------------------------------- */








    		        // 			ctx.fillRect2(25,25,100,100);
   					// ctx.clearRect2(45,45,60,60);
    				// ctx.strokeRect2(50,50,50,50);


    				// ctx.beginPath();
				    // ctx.moveTo2(50,50);
				    // ctx.lineTo2(50,200);
				    // ctx.lineTo2(200,50);
				    // ctx.fill();
				    // ctx.closePath();

        			//ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        			//ctx.fillRect (30, 30, 55, 50);

              //SMILEY
        			/*ctx.beginPath();
				    ctx.arc2(75,75,50,0,Math.PI*2); // Cercle exterieur
				    ctx.moveTo2(110,75);
				    ctx.arc2(75,75,35,0,Math.PI);   // Bouche (sens horaire)
				    ctx.moveTo2(65,65);
				    ctx.arc2(60,65,5,0,Math.PI*2);  // Oeil gauche
				    ctx.moveTo2(95,65);
				    ctx.arc2(90,65,5,0,Math.PI*2);  // Oeil droite
				    ctx.stroke();*/

				    // ctx.beginPath();
				    // ctx.arcTo(0, 0, 600, 600, 100);//arcTo(x1, y1, x2, y2, rayon);
				    // ctx.stroke();




            //ctx.fillRect2(25,25,100,100);
            //ctx.clearRect2(45,45,60,60);
            //x,y,width,height);