
function hexToHslValues(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    var obj = {
        h:  h,
        s: s,
        l: l
      };

    return obj;
}
function hexToHsl(H) {  
    var hslObj = hexToHslValues(H);
    return "hsl(" + hslObj.h + "," + hslObj.s + "%," + hslObj.l + "%)"; 
}

function HslToHex(h,s,l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}

function hexToRgbValues(h) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

    // 6 digits
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }

    // return "rgb("+ +r + "," + +g + "," + +b + ")";

    var obj = {
        r: +r,
        g: +g,
        b: +b
      };

    return obj;
}
function hexToRgb(h) {
    var rgbObj = hexToRgbValues(h)
    return "rgb("+ rgbObj.r + "," + rgbObj.g + "," + rgbObj.b + ")";
}

function RgbtoCmykValues (r, g, b){
    var c, m, y, k;

    r = r / 255;
    g = g / 255;
    b = b / 255;
    max = Math.max(r, g, b);
    
    k = 1 - max;
    
    if (k == 1) {
        c = 0;
        m = 0;
        y = 0;
    } else {
        c = (1 - r - k) / (1 - k);
        m = (1 - g - k) / (1 - k);
        y = (1 - b - k) / (1 - k);
    }
    
    c = Math.round( c * 100 );
    m = Math.round( m * 100 );
    y = Math.round( y * 100 );
    k = Math.round( k * 100 );

    return {c : c, m : m, y : y, k : k};
}
function RgbtoCmyk (r, g, b){
    var cmykObj = RgbtoCmykValues (r, g, b);
    return "cmyk(" + Object.keys(cmykObj).map(k => {return cmykObj[k]+"%"}).join(",") + ")";
}

function rgbToHwbValues(r, g, b) {
    var h, w, bl;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    chroma = max - min;
    if (chroma == 0) {
        h = 0;
    } else if (r == max) {
        h = (((g - b) / chroma) % 6) * 360;
    } else if (g == max) {
        h = ((((b - r) / chroma) + 2) % 6) * 360;
    } else {
        h = ((((r - g) / chroma) + 4) % 6) * 360;
    }
    w = min;
    bl = 1 - max;
    
    w = Math.round( w * 100 );
    bl = Math.round( bl * 100 );

    return {h : h, w : w, b : bl};
}
function rgbToHwb(r, g, b) {
    var hwbObj = rgbToHwbValues (r, g, b);
    return "hwb(" + hwbObj.h + "," + hwbObj.w + "%," + hwbObj.b + "%)"; 
}

function updateColorGradientLightin(id, hex) {
    var hsl = hexToHslValues(hex);
    var light = hsl.l;
    var hue = hsl.h;
    var sat = hsl.s;

    document.querySelectorAll(id).forEach( child => {
        let hsl = "hsl("+hue+", calc("+sat+" * 1%), calc("+light+" * 1%))";
        let hex = HSLToHex(hue, sat, light);
        
        child.style.background = hsl;
        child.setAttribute("title", hex); 
        child.setAttribute("data-text", hex); 

        light -= 5;
    });
}

function updateColorGradientDarkin(id, hex) {
    var hsl = hexToHslValues(hex);
    var light = hsl.l-50;
    var hue = hsl.h;
    var sat = hsl.s;

    document.querySelectorAll(id).forEach( child => {
        let hsl = "hsl("+hue+", calc("+sat+" * 1%), calc("+light+" * 1%))";
        let hex = HslToHex(hue, sat, light);
        
        child.style.background = hsl;
        child.setAttribute("title", hex); 
        child.setAttribute("data-text", hex); 

        light -= 5;
    });
}

function updateColorControl(c) {
    let color = "#"+c;
    console.log("c:" + color);

    // CONVERT COLOR TO NAME
    var colorNames =  ['AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGrey','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkSlateGrey','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DimGrey','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','Gray','Grey','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray','LightGrey','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSlateGrey','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','SlateGrey','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen'];
    var colorHex = ['f0f8ff','faebd7','00ffff','7fffd4','f0ffff','f5f5dc','ffe4c4','000000','ffebcd','0000ff','8a2be2','a52a2a','deb887','5f9ea0','7fff00','d2691e','ff7f50','6495ed','fff8dc','dc143c','00ffff','00008b','008b8b','b8860b','a9a9a9','a9a9a9','006400','bdb76b','8b008b','556b2f','ff8c00','9932cc','8b0000','e9967a','8fbc8f','483d8b','2f4f4f','2f4f4f','00ced1','9400d3','ff1493','00bfff','696969','696969','1e90ff','b22222','fffaf0','228b22','ff00ff','dcdcdc','f8f8ff','ffd700','daa520','808080','808080','008000','adff2f','f0fff0','ff69b4','cd5c5c','4b0082','fffff0','f0e68c','e6e6fa','fff0f5','7cfc00','fffacd','add8e6','f08080','e0ffff','fafad2','d3d3d3','d3d3d3','90ee90','ffb6c1','ffa07a','20b2aa','87cefa','778899','778899','b0c4de','ffffe0','00ff00','32cd32','faf0e6','ff00ff','800000','66cdaa','0000cd','ba55d3','9370db','3cb371','7b68ee','00fa9a','48d1cc','c71585','191970','f5fffa','ffe4e1','ffe4b5','ffdead','000080','fdf5e6','808000','6b8e23','ffa500','ff4500','da70d6','eee8aa','98fb98','afeeee','db7093','ffefd5','ffdab9','cd853f','ffc0cb','dda0dd','b0e0e6','800080','663399','ff0000','bc8f8f','4169e1','8b4513','fa8072','f4a460','2e8b57','fff5ee','a0522d','c0c0c0','87ceeb','6a5acd','708090','708090','fffafa','00ff7f','4682b4','d2b48c','008080','d8bfd8','ff6347','40e0d0','ee82ee','f5deb3','ffffff','f5f5f5','ffff00','9acd32'];
    var coloridx = colorHex.indexOf(c);
    var colorName = "Palette Color";
    if ( coloridx >=0 ) {
        colorName = colorNames[coloridx];
    }

    // GET RGB VALUES
    var rgbValues = hexToRgbValues(color);

    var cmykValues = RgbtoCmykValues(rgbValues.r, rgbValues.g, rgbValues.b);

    var hslValues = hexToHslValues(color);

    // var hwbValues = rgbToHwb(rgbValues.r, rgbValues.g, rgbValues.b);

    // console.log(hwbValues);
    
    // UPDATE SELECTED COLOR
    var currentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-selected');
    document.documentElement.style.setProperty('--color-selected', color);
    
    // UPDATE HEX COLOR REFERENCE
    var userColorNameHexSpan = document.getElementById("userColorNameHexSpan");
    userColorNameHexSpan.innerHTML = c;

    // UPDATE NAME COLOR
    var userColorName = document.getElementById("userColorName");
    userColorName.innerHTML = colorName;

    // UPDATE RGB COLOR CONVERTED
    var convertedColorRgb = document.getElementById("convertedColorRgb");
    convertedColorRgb.innerHTML = Object.keys(rgbValues).map(k => {return rgbValues[k]}).join(",");

    // UPDATE CMYK COLOR CONVERTED
    var convertedColorCmyk = document.getElementById("convertedColorCmyk");
    convertedColorCmyk.innerHTML = Object.keys(cmykValues).map(k => {return cmykValues[k]+'%'}).join(",");

    // UPDATE HSL COLOR CONVERTED
    var convertedColorHsl = document.getElementById("convertedColorHsl");
    convertedColorHsl.innerHTML = Object.keys(hslValues).map(k => { return (k === 'h') ? hslValues[k] : hslValues[k]+"%" }).join(",");
}


// updateColorGradientLightin(".__light > div", "#ADFFE2");
// updateColorGradientDarkin(".__dark > div", "#ADFFE2");

const root = document.documentElement;
// const inputColor = [].slice.call(document.getElementById("inputColor"));

// inputColor.forEach(input => input.addEventListener('change', handleUpdate));
// inputColor.forEach(input => input.addEventListener('keyup', handleUpdate));

const inputColor = document.getElementById("inputColor");

inputColor.addEventListener('change', handleUpdate);
inputColor.addEventListener('keyup', handleUpdate);

function handleUpdate(e) {

    updateColorControl(this.value);

    // updateColorGradientLightin(".__light > div", this.value)
    // updateColorGradientDarkin(".__dark > div", this.value)
    
}

// document.addEventListener('click', function (event) {
//     if (event.target.closest('.navbar__usericon')) return;
//     var x = document.getElementById("navbar-list");
//     x.className = "navbar__list";
// });

// var usericon = document.getElementById("navbar-usericon");
// usericon.addEventListener("click", function () {
//     var x = document.getElementById("navbar-list");
//     if (x.className === "navbar__list") {
//         x.className += " navbar__list navbar__list--active";
//     } else {
//         x.className = "navbar__list";
//     }
// });


