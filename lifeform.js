function lifeform(originalX, originalY, originalScale, cOriginal = getRandomColor(), cMotion = true, cState = 0)
{
    //Cell type ID
    this.cellType = 1;

    //Current coordinates of the life form
    this.currentX = originalX;
    this.currentY = originalY;
    this.currentScale = originalScale;

    //Color

    this.colorMotion = cMotion;
    this.colorState = cState;

    this.colorOriginal = cOriginal;
    this.color = cOriginal;//"#BADA55";

    //Life
    this.life_esperancy = 10 + Math.round(Math.random()*20);
    this.age = 0;
    this.dead = false;

    //Reproduction
    this.nb_reproduction_attemp = Math.round(Math.random()*(this.life_esperancy/5));
    this.dates_reproduction_attemp = [];
    for (i=0;i<this.nb_reproduction_attemp;i++)
    {
        var date_proposal = -1;
        var date_proposal_in_dates = false;
        while(date_proposal == -1 || date_proposal_in_dates == true)
        {
            date_proposal = Math.round(this.life_esperancy/4 + Math.random()*((this.life_esperancy*3/4)-1));
            date_proposal_in_dates = false;
            for (j=0;j<i;j++)
            {
                if(date_proposal == this.dates_reproduction_attemp[j])
                    date_proposal_in_dates = true
            }
        }
        this.dates_reproduction_attemp.push(date_proposal);
    }

    //Neighbors
    this.Neighbors = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    //Declaration of the functions
    this.moveTo = function (stepX, stepY)
    {
        this.erase();

        this.currentX += stepX;
        this.currentY += stepY;

        this.draw();
    };

    this.draw = function ()
    {
        grid[this.currentX][this.currentY] = 1;
        ctx.fillStyle = this.color;
        ctx.fillRect2(this.currentX * 10, this.currentY * 10 ,10 * originalScale, 10 * originalScale);
    };

    this.erase = function ()
    {
        grid[this.currentX][this.currentY] = 0;
        ctx.fillStyle = "grey";
        ctx.fillRect2(this.currentX * 10, this.currentY * 10 ,10 * originalScale, 10 * originalScale);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect2(this.currentX * 10, this.currentY * 10, 10 * originalScale, 10 * originalScale);
    };

    this.getOlder = function ()
    {
        this.life_esperancy --;
        this.age ++;
        if(this.life_esperancy <= 0)
        {
            this.erase();
            this.dead = true;
        }
    };

    this.turnAction = function ()
    {
        this.getOlder();

        if(this.dead == false)
        {
            //Get color
            this.colorState = this.nextState();
            this.colorMotion = this.nextMotion();
            this.color = this.nextColor();
            this.draw();

            for (i=0;i<this.nb_reproduction_attemp;i++)
            {
                var xrand = Math.round(1+Math.random()*2);
                var yrand = Math.round(1+Math.random()*2);
                if(this.currentX + xrand - 2 >=0 && this.currentY + yrand - 2 >=0)
                {
                    if(this.dates_reproduction_attemp[i] == this.age && grid[this.currentX + xrand - 2][this.currentY + yrand - 2] != this.cellType)
                    {
                        return this.createChild(this.currentX + xrand - 2, this.currentY + yrand - 2, this.currentScale);
                    }
                }
            }
            return 0;
        }
        else
        {
           return 0;
        }
    };

    this.nextState = function ()
    { 
        if(this.colorMotion == true && this.colorState == 6)
        {
            return this.colorState - 1;
        }
        else if(this.colorMotion == false && this.colorState == -6)
        {
            return this.colorState + 1;
        }
        else
        {
            if(this.colorMotion == true)
                return this.colorState + 1;
            else if(this.colorMotion == false)
                return this.colorState - 1;
        }
    }

    this.nextMotion = function ()
    { 
        if(this.colorMotion == true && this.colorState == 6)
        {
            return false;
        }
        else if(this.colorMotion == false && this.colorState == -6)
        {
            return true;
        }
        else
        {
            return this.colorMotion;
        }
    }

    this.nextColor = function ()
    { 
        var c = this.colorOriginal;
        if(c.indexOf("#") == -1)
            c = colourNameToHex(c);

        var hex = parseInt(c.replace(/^#/, ''), 16);

        //Next color
        hex = hex + (1048576 * this.colorState);

        var result = hex.toString(16);
        while(result.length < 6)
        {
            result = "0" + result;
        }
        return result;
    }

    this.hasNeighbors = function ()
    {
        var result = false;
        for(i=this.currentX-1;i<=this.currentX+1;i++)
        {
            for(j=this.currentY-1;j<=this.currentY+1;j++)
            {
                if(j!=this.currentY)
                {
                    if(grid[i][j] != 0)
                        result = true;
                }
            }
        }

        return result;
    }

    this.hasAfter = function ()
    {
        if(grid[this.currentX+1][this.currentY+1] != 0)
            return true;
        else
            return false;
    }

    this.createChild = function (x,y,scale)
    {
        //If in the window
        if(x >= 0 && x < 1920 && y >= 0 && y < 1080)// && (!this.hasAfter()))
            return new lifeform(x, y, scale, getRandomColor(), this.colorMotion, this.colorState);
        else
            return 0;
    }


}



var niceColorsTab = ["Aqua", "Aquamarine", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Crimson", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkKhaki", "DarkMagenta", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DeepPink", "DeepSkyBlue", "Fuchsia", "Gold", "GoldenRod", "GreenYellow", "HotPink", "LightBlue", "LightPink", "LightSalmon", "Lime", "LimeGreen", "MediumVioletRed", "Orange", "OrangeRed", "Red", "SeaGreen", "Sienna", "SpringGreen", "Tomato", "Turquoise", "Yellow", "YellowGreen"];
var colorDone = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


function getRandomColor()
{
    var randomNumber = Math.round(Math.random()*45);
    colorDone[randomNumber] = 1;
    return niceColorsTab[randomNumber];
}


function colourNameToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}
/*
function nextColor(c, motion)
{
    if(c.indexOf("#") == -1)
        c = colourNameToHex(c);

    var hex = parseInt(c.replace(/^#/, ''), 16);

    //Increase
    if(motion == true)
        hex = hex + 1048576;
    //Decrease
    else
        hex = hex - 1048576;

    var result = hex.toString(16);
    while(result.length < 6)
    {
        result = "0" + result;
    }
    return "#" + result;
}*/









