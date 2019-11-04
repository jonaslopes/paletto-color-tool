var colorNames =  ['AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGrey','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkSlateGrey','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DimGrey','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','Gray','Grey','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray','LightGrey','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSlateGrey','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','SlateGrey','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen'];
var colorHex = ['f0f8ff','faebd7','00ffff','7fffd4','f0ffff','f5f5dc','ffe4c4','000000','ffebcd','0000ff','8a2be2','a52a2a','deb887','5f9ea0','7fff00','d2691e','ff7f50','6495ed','fff8dc','dc143c','00ffff','00008b','008b8b','b8860b','a9a9a9','a9a9a9','006400','bdb76b','8b008b','556b2f','ff8c00','9932cc','8b0000','e9967a','8fbc8f','483d8b','2f4f4f','2f4f4f','00ced1','9400d3','ff1493','00bfff','696969','696969','1e90ff','b22222','fffaf0','228b22','ff00ff','dcdcdc','f8f8ff','ffd700','daa520','808080','808080','008000','adff2f','f0fff0','ff69b4','cd5c5c','4b0082','fffff0','f0e68c','e6e6fa','fff0f5','7cfc00','fffacd','add8e6','f08080','e0ffff','fafad2','d3d3d3','d3d3d3','90ee90','ffb6c1','ffa07a','20b2aa','87cefa','778899','778899','b0c4de','ffffe0','00ff00','32cd32','faf0e6','ff00ff','800000','66cdaa','0000cd','ba55d3','9370db','3cb371','7b68ee','00fa9a','48d1cc','c71585','191970','f5fffa','ffe4e1','ffe4b5','ffdead','000080','fdf5e6','808000','6b8e23','ffa500','ff4500','da70d6','eee8aa','98fb98','afeeee','db7093','ffefd5','ffdab9','cd853f','ffc0cb','dda0dd','b0e0e6','800080','663399','ff0000','bc8f8f','4169e1','8b4513','fa8072','f4a460','2e8b57','fff5ee','a0522d','c0c0c0','87ceeb','6a5acd','708090','708090','fffafa','00ff7f','4682b4','d2b48c','008080','d8bfd8','ff6347','40e0d0','ee82ee','f5deb3','ffffff','f5f5f5','ffff00','9acd32'];
    
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
    
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

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

function RGBToHex(rgb) {
    
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

function updateColorGradientLightin(id, hex) {
    var hsl = hexToHslValues(hex);
    var light = hsl.l;
    var hue = hsl.h;
    var sat = hsl.s;

    var obj = { };

    document.querySelectorAll(id).forEach( child => {
        let hsl = "hsl("+hue+", calc("+sat+" * 1%), calc("+light+" * 1%))";
        let hex = HSLToHex(hue, sat, light);
        
        child.style.background = hsl;
        child.setAttribute("title", hex); 
        child.setAttribute("data-text", hex); 

        light -= 5;
    });
}
// RETURN HEX LIGHTIN GRADIENT OBJECT
function getColorGradientLightin(hex) {
    var hsl = hexToHslValues(hex);
    var light = hsl.l;
    var hue = hsl.h;
    var sat = hsl.s;

    var base = 100 - hsl.l;
    var salt = (base*10)/100;

    light += salt;

    var obj = { };

    for(var i=0; i<10; i++) {
        let hex = HslToHex(hue, sat, light);
        obj[(i+1)*10] =  hex;

        if (light > 100) {
            light = 100;
        }else{
            light = ((light + salt) >= 100) ? 100 : light + salt;
        }
        
    }

    return obj;
}

// SET HEX DARKIN GRADIENT GROUP OBJECT
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

// RETURN HEX DARKER GRADIENT OBJECT
function getColorGradientDarkin(hex) {
    var hsl = hexToHslValues(hex);
    var light = hsl.l;
    var hue = hsl.h;
    var sat = hsl.s;

    var base = hsl.l;
    var salt = (base*10)/100;

    light -= salt;

    var obj = { };

    for(var i=0; i<10; i++) {
        let hex = HslToHex(hue, sat, light);
        obj[(i+1)*10] =  hex;

        if (light < 0) {
            light = 0;
        }else{
            light = ((light - salt) < 0) ? 0 : light - salt;
        }
        
    }

    return obj;
}

function updateColorControl(c) {
    let color = "#"+c;
    console.log("c:" + color);

    // CONVERT COLOR TO NAME
    let coloridx = colorHex.indexOf(c);
    let colorName = "Palette Color";
    if ( coloridx >=0 ) {
        colorName = colorNames[coloridx];
    }

    // GET RGB VALUES
    var rgbValues = hexToRgbValues(color);

    // GET CMYK VALUES
    var cmykValues = RgbtoCmykValues(rgbValues.r, rgbValues.g, rgbValues.b);

    // GET HSL VALUES
    var hslValues = hexToHslValues(color);

    // UPDATE SELECTED COLOR
    var currentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-selected');
    document.documentElement.style.setProperty('--color-selected', color);
    
    // UPDATE HEX COLOR REFERENCE
    document.querySelectorAll(".usercolorHexSelected__text span").forEach(function (el) {
        el.innerHTML = c;
    });

    // UPDATE NAME COLOR
    document.querySelector(".usercolorNameSelected__text").innerHTML = colorName;

    // UPDATE RGB COLOR CONVERTED
    document.querySelector(".convertedColorTableLineRgb").innerHTML = Object.keys(rgbValues).map(k => {return rgbValues[k]}).join(", ");

    // UPDATE CMYK COLOR CONVERTED
    document.querySelector(".convertedColorTableLineCmyk").innerHTML = Object.keys(cmykValues).map(k => {return cmykValues[k]+'%'}).join(", ");

    // UPDATE HSL COLOR CONVERTED
    document.querySelector(".convertedColorTableLineHsl").innerHTML = Object.keys(hslValues).map(k => { return (k === 'h') ? hslValues[k] : hslValues[k]+"%" }).join(", ");
}

var paletto = `
<div class="pallete_gradient" data-module="component" id="{color}">
    <div class="pallete_gradient__header"> <div> <a href="#close" onclick="javascript:closePalleteGradient(this)">&#x2573;</a></div> </div>
    <div class="pallete_gradient__originalcolor">
    
    <div class="originalcolor_content">  
        <div class="originalcolor_content__shape">
            <div class="shape_circle shape_circle--big originalcolor_content__shape--cicle" style="background-color: #{color};"> </div>
        </div>
        <div class="originalcolor_content__hex" data-module="component">
        <p class="originalcolor_content__hex--text text-align--center"># <span>{color}</span></p>
        </div>
    </div>

    </div>
    <div class="pallete_gradient__shadescolor">
        <div class="shadescolor__content"> 
            <div class="shadescolor_content__title"><h4>Lighter</h4></div>
            <div class="shadescolor_content__shapes"> 
            <div class="shadescolor_content__shapes--flex shadescolor_content__shapes--lighter">
                {lighter}
            </div>
            </div>
        </div>
    </div>
    <div class="pallete_gradient__shadescolor">
        <div class="shadescolor__content"> 
            <div class="shadescolor_content__title"><h4>Darker</h4></div>
            <div class="shadescolor_content__shapes"> 
            <div class="shadescolor_content__shapes--flex shadescolor_content__shapes--darker">
                {darker}
            </div>
            </div>
        </div>
    </div>
    <div class="pallete_gradient__exportcolor">
    <div class="exportcolor__content"> 
        <div class="exportcolor__title">Export</div>
        <div class="exportcolor__scss">
        <button class="exportcolor__scss--button" onclick="{file-scss}">Export as SCSS file</button>
        </div>
        <div class="exportcolor__paletto">
        <button class="exportcolor__paletto--button" onclick="{file-paletto}">Export as .Paletto</button>
        </div>
    </div>
    </div>
</div>
`;

var scss_file = `
$base-color: {base-color};

$color-{name-color}-lighter10: {lighter10};
$color-{name-color}-lighter20: {lighter20};
$color-{name-color}-lighter30: {lighter30};
$color-{name-color}-lighter40: {lighter40};
$color-{name-color}-lighter50: {lighter50};
$color-{name-color}-lighter60: {lighter60};
$color-{name-color}-lighter70: {lighter70};
$color-{name-color}-lighter80: {lighter80};
$color-{name-color}-lighter90: {lighter90};
$color-{name-color}-lighter100: {lighter100};

$color-{name-color}-darker10: {darker10};
$color-{name-color}-darker20: {darker20};
$color-{name-color}-darker30: {darker30};
$color-{name-color}-darker40: {darker40};
$color-{name-color}-darker50: {darker50};
$color-{name-color}-darker60: {darker60};
$color-{name-color}-darker70: {darker70};
$color-{name-color}-darker80: {darker80};
$color-{name-color}-darker90: {darker90};
$color-{name-color}-darker100: {darker100};

@mixin important-text {
    color: $color-{name-color}-lighter20;
    font-size: 25px;
    font-weight: bold;
    border: 1px solid $color-{name-color}-darker70;
}

@mixin bordered($color, $width) {
    border: $width solid $color;
}

.danger {
    @include important-text;
    background-color: $color-{name-color}-lighter90;
}

.notes {
    @include bordered($color-{name-color}-darker30, 2px);
}
`;

var paletto_file = `
{
	"application": "Paletto Color Tool",
	"date": "{date}",
	"data-user": "paletto",
	"palletes" : [
		{palletes}
	]
}
`;

const root = document.documentElement;
const inputColor = document.getElementById("inputColor");

inputColor.addEventListener('change', handleUpdate);
inputColor.addEventListener('keyup', handleUpdate);

function handleUpdate(e) {
    updateColorControl(this.value);
}

document.addEventListener('click', function (event) {
    if (event.target.closest('.navbar__usericon')) return;
    var x = document.getElementById("navbar-list");
    x.className = "navbar__list";
});

var usericon = document.getElementById("navbar-usericon");
usericon.addEventListener("click", function () {
    var x = document.getElementById("navbar-list");
    if (x.className === "navbar__list") {
        x.className += " navbar__list navbar__list--active";
    } else {
        x.className = "navbar__list";
    }
});

function noPaletteControl() {
    var nopalettes = document.getElementsByClassName("colorcontrol__nopalettes")[0];
    if(document.body.contains(document.getElementsByClassName("pallete_gradient")[0])){
        nopalettes.style.display = "none"
    }else{
        nopalettes.style.display = "block"
    }
}

var addpaletteButton = document.querySelector(".addpalette__button");
addpaletteButton.addEventListener("click", function () {

    var cs = document.getElementById("inputColor").value;

    if(document.body.contains(document.getElementById(cs))){
        alert("Color already added!");
    }else{



        var gradientLighter = getColorGradientLightin("#"+cs);

        let coloridx = colorHex.indexOf(cs);
        let colorName = "PaletteColor";
        if ( coloridx >=0 ) {
            colorName = colorNames[coloridx];
        }

        let scssFile = scss_file;
        scssFile = scssFile.replace(/{base-color}/gm, "#"+cs);
        scssFile = scssFile.replace(/{name-color}/gm, colorName);

        let palettoFile = paletto_file;
        palettoFile = palettoFile.replace(/{palletes}/gm, `{"id": 1, "color":"#${cs}"}`);

        
        var xregex = "";

        var lighter = "";
        Object.keys(gradientLighter).forEach(function(key) {

            lighter += '<div class="content"> <div class="cicle tooltip" style="background-color: '+gradientLighter[key]+';"><span class="tooltiptext">'+gradientLighter[key]+' <a href="#1" onclick="javascript:copyHexPalleteGradient(this)">&#x1F4CB;</a></span></div> <div class="text">'+key+'%</div> </div>';
            
            var str_regex =  `{lighter${key}}`;
            var re = new RegExp(str_regex,"gm");
            scssFile = scssFile.replace(re, gradientLighter[key]);
        
        });

        var gradientDarker = getColorGradientDarkin("#"+cs);

        var darker = "";
        Object.keys(gradientDarker).forEach(function(key) {

            darker += '<div class="content"> <div class="cicle tooltip" style="background-color: '+gradientDarker[key]+';"><span class="tooltiptext">'+gradientDarker[key]+' <a href="#1" onclick="javascript:copyHexPalleteGradient(this)">&#x1F4CB;</a></span></div> <div class="text">'+key+'%</div> </div>';
            
            var str_regex =  `{darker${key}}`;
            var re = new RegExp(str_regex,"gm");
            scssFile = scssFile.replace(re, gradientDarker[key]);
        
        });

        var palettoNew = paletto.replace(/{color}/gm, cs);
        palettoNew = palettoNew.replace(/{lighter}/gm, lighter);
        palettoNew = palettoNew.replace(/{darker}/gm, darker);

        var scss_base64 = btoa(scssFile);
        palettoNew = palettoNew.replace(/{file-scss}/gm, `javascript:download('paletto-color-${colorName}.scss', '${scss_base64}')`);

        var paletto_base64 = btoa(palettoFile);
        palettoNew = palettoNew.replace(/{file-paletto}/gm, `javascript:download('paletto-color-${colorName}.paletto', '${paletto_base64}')`);
        
        
        var x = document.getElementById("colorControlGradient");
        x.insertAdjacentHTML('beforeend', palettoNew);
    }

    noPaletteControl();
});

function closePalleteGradient(el){
    var element = el.parentNode.parentNode.parentNode;
    element.parentNode.removeChild(element);

    noPaletteControl()
}

function copyHexPalleteGradient(el){
    var element = el.parentNode.parentNode;
    var rgbColor = element.style.backgroundColor;    
    var hexColor = RGBToHex(rgbColor);

    const copyText = document.createElement('textarea');
    copyText.value = hexColor;
    document.body.appendChild(copyText);
    copyText.select();
    document.execCommand('copy');

    alert("Copied the color: " + copyText.value);

    document.body.removeChild(copyText);
}

function download(filename, text_base64) {
    var text = atob(text_base64);
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Get the modal
var copyrightModal = document.getElementById("copyrightModal");

// Get the button that opens the modal
var btnOpenModal = document.getElementsByClassName("open-modal-license")[0];
btnOpenModal.addEventListener("click", function () {
    copyrightModal.style.display = "block";
});

// Get the <span> element that closes the modal
var iconCloseModal = document.getElementsByClassName("modal-close")[0];
iconCloseModal.addEventListener("click", function () {
    copyrightModal.style.display = "none";
});

var modal = document.getElementsByClassName("modal")[0];
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Create a class for the element
class PopUpInfo extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // Create a shadow root
      const shadow = this.attachShadow({mode: 'open'});
  
      // Create spans
      const wrapper = document.createElement('span');
      wrapper.setAttribute('class', 'wrapper');
  
      const icon = document.createElement('span');
      icon.setAttribute('class', 'icon');
      icon.setAttribute('tabindex', 0);
  
      const info = document.createElement('span');
      info.setAttribute('class', 'info');
  
      // Take attribute content and put it inside the info span
      const text = this.getAttribute('data-text');
      info.textContent = text;
  
      // Insert icon
      let imgUrl;
      if(this.hasAttribute('img')) {
        imgUrl = this.getAttribute('img');
      } else {
        imgUrl = 'img/default.png';
      }
  
      const img = document.createElement('img');
      img.src = imgUrl;
      icon.appendChild(img);
  
      // Create some CSS to apply to the shadow dom
      const style = document.createElement('style');
      console.log(style.isConnected);
  
      style.textContent = `
        .wrapper {
          position: relative;
        }
  
        .info {
          font-size: 0.8rem;
          width: 200px;
          display: inline-block;
          border: 1px solid black;
          padding: 10px;
          background: white;
          border-radius: 10px;
          opacity: 0;
          transition: 0.6s all;
          position: absolute;
          bottom: 20px;
          left: 10px;
          z-index: 3;
        }
  
        img {
          width: 1.2rem;
        }
  
        .icon:hover + .info, .icon:focus + .info {
          opacity: 1;
        }
      `;
  
      // Attach the created elements to the shadow dom
      shadow.appendChild(style);
      console.log(style.isConnected);
      shadow.appendChild(wrapper);
      wrapper.appendChild(icon);
      wrapper.appendChild(info);
    }
  }
  
  // Define the new element
  window.customElements.define('popup-info', PopUpInfo);