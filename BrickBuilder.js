//BrickBuilder
//Version 1.0

const docFragment = document.createDocumentFragment();

WidgetBuilder = {
    init: (prop)=>{
        let widget = document.createElement(prop.tag);

        prop.name != undefined ? widget.setAttribute('name',prop.name):null;
        prop.id != undefined ? widget.setAttribute('id',prop.id):null;
        prop.class != undefined ? widget.setAttribute('class',prop.class):null;
        typeof prop.visible === 'boolean' ? widget.hidden = !prop.visible :null;

        if (prop.style != undefined){
            let style = JSON.stringify(prop.style).replace(/["{}]/g,'');
            style = style.replace(/_/g,'-');
            widget.setAttribute('style',style.replace(/,/g,';'));
        }

        
        for ( let key in prop.attr){
           ( key != 'id' ) && (key != 'class') && (key != 'style') && (key != 'name')?  widget.setAttribute(key,prop.attr[key]) : null ;
        }

        widget.innerHTML = prop.text != undefined? prop.text : null;


        return widget;
    },

    attr: (attribute,value,widget)=> {( attribute != 'id' ) && (attribute != 'class') && (attribute != 'style')&& (attribute != 'name')?  widget.this.setAttribute(attribute,value) : null ;},

    id: (value,widget)=>{ widget.this.setAttribute('id',value)},

    name:(value,widget)=>{ widget.this.setAttribute('name',value);},

    class: (value,widget)=>{ widget.this.setAttribute('class',value);},

    style: (value,widget) => {
        widget.property.style = value;
        if (widget.property.style != undefined){
            let style = JSON.stringify(widget.property.style).replace(/["{}]/g,'');
            style = style.replace(/_/g,'-');
            widget.this.setAttribute('style',style.replace(/,/g,';'));
        }
    },

    height: (value,widget) => {
        let style =  widget.this.getAttribute("style");
        widget.property.style.height != undefined ? 
            style = style.indexOf('height') == 0 ? 
                style.replace(/^height:[ ]{0,}[-0-9.0-9]{1,}[ ]{0,}[A-Za-z]{0,5}/g,'height:'+value) :style.replace(/;height:[ ]{0,}[-0-9.0-9]{1,}[ ]{0,}[A-Za-z]{0,5}/g,';height:'+value)
        :style =style+';height:'+value;
        widget.this.setAttribute('style',style);
    },

    width: (value,widget) => {
        let style =  widget.this.getAttribute("style");
        widget.property.style.width != undefined ? 
            style = style.indexOf('width') == 0 ? 
                style.replace(/^width:[ ]{0,}[-0-9.0-9]{1,}[ ]{0,}[A-Za-z]{0,5}/g,'width:'+value) :style.replace(/;width:[ ]{0,}[-0-9.0-9]{1,}[ ]{0,}[A-Za-z]{0,5}/g,';width:'+value)
        :style =style+';width:'+value;
        widget.this.setAttribute('style',style);
    },


};


//??????attr ??????other?????????visible ???false??????????????????layout{height,width}
//?????????????????????id, name, class, visible, other, style, layout {height, width, x, y, z} 
class Widget {
    constructor(prop) {
        this.property = prop;
        console.log(prop);
        this.this = WidgetBuilder.init(this.property);

        this.attr = (attribute, value) => { WidgetBuilder.attr(attribute, value, this); };//???other

        this.id = (value) => { WidgetBuilder.id(value, this); };

        this.name = (value) => { WidgetBuilder.name(value, this); };

        this.class = (value) => { WidgetBuilder.class(value, this); };

        //this.visible = (value) => { WidgetBuilder.visible(value,this);};

        this.style = (value) => { WidgetBuilder.style(value, this); };

        this.height = (value) => { WidgetBuilder.height(value, this); };

        this.width = (value) => { WidgetBuilder.width(value, this); };

        docFragment.append(this.this);
    }

}


class Container extends Widget {
    constructor(prop){
        Container.property = prop;
        Container.property.tag = 'container';
        super(Container.property);
    }
}


class Button extends Widget {
    constructor(prop){
        Button.property = prop;
        Button.property.tag = 'button';
        super(Button.property);
        
    }
}



// HTML??????????????????

class Text extends Widget {
    constructor(prop){
        Text.property = new Object();
        if (typeof prop === 'string'){
            Text.property.text = prop;
        }
        else if (typeof prop === 'object'){
            Text.property = prop;
        }

        Text.property.tag = 'p';


        super(Text.property);

        this.property.align != undefined ? this.this.setAttribute('align',this.property.align) : null;
        //this.property.child = this.property.child != undefined ? this.this.appendChild(this.property.child) : null;

        this.align  = (value) => { this.this.setAttribute('align',value);};

    }

}


class Radio extends Widget {
    constructor(prop){

        Radio.property = prop;
        let text = Radio.property.text;
        Radio.property.tag = 'input';
        delete Radio.property.text;

        super(Radio.property);

        this.this.setAttribute('type','radio') ;
        console.log(this.property.value);
        this.property.value != undefined? this.this.setAttribute('value',this.property.value): this.this.setAttribute('value',text) ;
        
        this.this.checked = this.property.checked;

        let textContent = document.createTextNode(text)
        
        text != undefined? this.this.parentNode.appendChild(textContent) : null;

        this.checked  = (value) => { this.this.checked = value};
        this.value  = (value) => { return this.this.value = value != undefined ? value: this.this.value ;};
        this.text = (value) => {
            if (this.property.value != undefined) textContent.nodeValue = value;
            else {
                textContent.nodeValue = value;
                this.this.setAttribute('value',value);
            }
        };
    }

}

//checkbox
class Checkbox extends Widget {
    constructor(prop){

        Checkbox.property = prop;
        let text = Checkbox.property.text;
        Checkbox.property.tag = 'input';
        delete Checkbox.property.text;

        super(Checkbox.property);

        this.this.setAttribute('type','checkbox') ;
        console.log(this.property.value);
        this.property.value != undefined? this.this.setAttribute('value',this.property.value): this.this.setAttribute('value',text) ;
        
        this.this.checked = this.property.checked;

        let textContent = document.createTextNode(text)
        
        text != undefined? this.this.parentNode.appendChild(textContent) : null;

        this.checked  = (value) => { this.this.checked = value};
        this.value  = (value) => { return this.this.value = value != undefined ? value: this.this.value ;};
        this.text = (value) => {
            if (this.property.value != undefined) textContent.nodeValue = value;
            else {
                textContent.nodeValue = value;
                this.this.setAttribute('value',value);
            }
        };
    }

}

//input
class Input extends Widget {
    constructor(prop){
        Input.property = prop;
        Input.property.tag = 'input';
        super(Input.property);

        function props4Num (){

            this.property.autocomplete = this.property.autocomplete != undefined? this.this.autocomplete = this.property.autocomplete : null;
            this.property.max = this.property.max != undefined? this.this.max = this.property.max : null;
            this.property.min = this.property.min != undefined? this.this.min = this.property.min : null;
            this.property.placeholder = this.property.placeholder != undefined? this.this.placeholder = this.property.placeholder : null;     
            this.property.required = this.property.required != undefined? this.this.required = this.property.required : null;           
            this.property.value = this.property.value != undefined? this.this.value = this.property.value : null;

            this.autocomplete  = (value) => { this.this.autocomplete = value;};
            this.max  = (value) => { this.this.max = value;};
            this.min  = (value) => { this.this.min = value;};
            this.placeholder  = (value) => { this.this.placeholder = value;};
            this.required  = (value) => { this.this.required = value;};
            this.value  = (value) => { return this.this.value = value != undefined ? value: this.this.value ;};
        }
        

        //this.property.password  = this.property.password == true? this.this.setAttribute('type','password') : null ;
        this.property.type  = ['number','date','datetime','datetime-local','month','week','email','text','password'].includes(this.property.type)? this.this.type = this.property.type : this.this.type = 'text';

        this.property.defaultValue = this.property.defaultValue != undefined? this.this.defaultValue = this.property.defaultValue : null;
        this.property.disabled = this.property.disabled != undefined? this.this.disabled = this.property.disabled : null;
        this.property.readOnly = this.property.readOnly != undefined? this.this.readOnly = this.property.readOnly : null;

        this.defaultValue  = (value) => { this.this.defaultValue = value;};
        this.disabled  = (value) => { this.this.disabled = value;};
        this.readOnly  = (value) => { this.this.readOnly = value;};

        if (['number','date','datetime','datetime-local','month','week'].includes(this.this.type)) props4Num();
        else if (this.this.type == 'email') {
            props4Num();

            this.property.pattern = this.property.pattern != undefined? this.this.pattern = this.property.pattern : null;
            this.property.size = this.property.size != undefined? this.this.size = this.property.size : null;

            this.pattern  = (value) => { this.this.pattern = value;};
            this.size  = (value) => { this.this.size = value;};
        }
        else {
            this.property.accessKey = this.property.accessKey != undefined? this.this.accessKey = this.property.accessKey : null;
            this.property.alt = this.property.alt != undefined? this.this.alt = this.property.alt : null;
            this.property.maxLength = this.property.maxLength != undefined? this.this.maxLength = this.property.maxLength : null;
            this.property.tabIndex = this.property.tabIndex != undefined? this.this.tabIndex = this.property.tabIndex : null;

            this.accessKey  = (value) => { this.this.accessKey = value;};
            this.alt  = (value) => { this.this.alt = value;};
            this.maxLength  = (value) => { this.this.maxLength = value;};
            this.tabIndex  = (value) => { this.this.tabIndex = value;};
        }
        
        //this.password  = (value) => { value == true ? this.this.setAttribute('type','password') : null;};

    }
}

//file
class File extends Widget {
    constructor(prop){
        File.property = prop;
        File.property.tag = 'input';
        super(File.property);
        
        this.this.type = 'file'

        this.property.accept = this.property.accept != undefined? this.this.accept = this.property.accept :null;
        this.property.capture = this.property.capture != undefined? this.this.capture = this.property.capture :null;
        this.property.files = this.property.files != undefined? this.this.files = this.property.files :null;
        this.property.multiple = this.property.multiple != undefined? this.this.multiple = this.property.multiple :null;

        this.accept  = (value) => { this.this.accept = value;};
        this.capture  = (value) => { this.this.capture = value;};
        this.files  = (value) => { this.this.files = value;};
        this.multiple  = (value) => { this.this.multiple = value;};

    }
}
//slider
class Slider extends Widget {
    constructor(prop){
        Slider.property = prop;
        Slider.property.tag = 'input';
        super(Slider.property);
        
        this.this.type = 'range'

        this.property.autocomplete = this.property.autocomplete != undefined? this.this.autocomplete = this.property.autocomplete : null;
        this.property.defaultValue = this.property.defaultValue != undefined? this.this.defaultValue = this.property.defaultValue : null;
        this.property.disabled = this.property.disabled != undefined? this.this.disabled = this.property.disabled : null;
        this.property.max = this.property.max != undefined? this.this.max = this.property.max : null;
        this.property.min = this.property.min != undefined? this.this.min = this.property.min : null;       
        this.property.value = this.property.value != undefined? this.this.value = this.property.value : null;

        this.autocomplete  = (value) => { this.this.autocomplete = value;};
        this.defaultValue  = (value) => { this.this.defaultValue = value;};
        this.disabled  = (value) => { this.this.disabled = value;};
        this.max  = (value) => { this.this.max = value;};
        this.min  = (value) => { this.this.min = value;};
        this.value  = (value) => { return this.this.value = value != undefined ? value: this.this.value ;};

    }
}

//color
class Color extends Widget {
    constructor(prop){
        Color.property = prop;
        Color.property.tag = 'input';
        super(Color.property);
        
        this.this.type = 'color'

        this.property.span = this.property.span != undefined? this.this.span = this.property.span : null;
        this.property.autocomplete = this.property.autocomplete != undefined? this.this.autocomplete = this.property.autocomplete : null;
        this.property.defaultValue = this.property.defaultValue != undefined? this.this.defaultValue = this.property.defaultValue : null;
        this.property.disabled = this.property.disabled != undefined? this.this.disabled = this.property.disabled : null;     
        this.property.value = this.property.value != undefined? this.this.value = this.property.value : null;

        this.span  = (value) => { return this.this.span = value != undefined ? value: this.this.span ;};
        this.autocomplete  = (value) => { this.this.autocomplete = value;};
        this.defaultValue  = (value) => { this.this.defaultValue = value;};
        this.disabled  = (value) => { this.this.disabled = value;};
        this.value  = (value) => { return this.this.value = value != undefined ? value: this.this.value ;};

    }
}


//image
class Image extends Widget {
    constructor(prop){
        Input.property = prop;
        Input.property.tag = 'img';
        super(Input.property);

        this.property.url = this.property.url != undefined? this.this.setAttribute('src',this.property.url):null;
        this.property.alt != undefined? this.this.setAttribute('alt',this.property.alt) : null;

        this.url  = (value) => { this.this.setAttribute('src',value)};
        this.alt  = (value) => { this.this.setAttribute('alt',value)};

    }
}
//voice
class Voice extends Widget {
    constructor(prop){
        Voice.property = prop;
        Voice.property.tag = 'audio';
        Voice.property.controls = 'controls';
        super(Voice.property);
        let preloadMode = ['auto','meta','none'];

        this.property.url = this.property.url != undefined? this.this.setAttribute('src',this.property.url):null;
        this.this.autoplay = this.property.autoplay;
        this.this.loop = this.property.loop; 
        this.this.muted = this.property.muted; 
        this.this.preload = preloadMode.includes(this.property.preload)? this.property.preload: 'none';

        this.url  = (value) => { this.this.setAttribute('src',value)};
        this.autoplay  = (value) => { this.this.autoplay = value};
        this.loop  = (value) => { this.this.loop = value};
        this.muted  = (value) => { this.this.muted = value};
        this.preload  = (value) => { preloadMode.includes(value)? value : 'none'};
    }
}

//video
class Video extends Widget {
    constructor(prop){
        Video.property = prop;
        Video.property.tag = 'video';
        Video.property.controls = 'controls';
        super(Video.property);
        let preloadMode = ['auto','meta','none'];

        this.property.url = this.property.url != undefined? this.this.setAttribute('src',this.property.url):null;
        this.property.poster = this.property.poster != undefined? this.this.setAttribute('poster',this.property.poster):null;
        this.this.autoplay = this.property.autoplay;
        this.this.loop = this.property.loop; 
        this.this.muted = this.property.muted; 
        this.this.preload = preloadMode.includes(this.property.preload)? this.property.preload: 'none';

        this.url  = (value) => { this.this.setAttribute('src',value)};
        this.autoplay  = (value) => { this.this.autoplay = value};
        this.loop  = (value) => { this.this.loop = value};
        this.muted  = (value) => { this.this.muted = value};
        this.poster  = (value) => { this.this.poster = value};
        this.preload  = (value) => { preloadMode.includes(value)? value : 'none'};
    }
}

class Component {
    constructor(prop) {
        this.property = prop;
        this.this = WidgetBuilder.init(this.property);
        for (let childWidgets in this.property.children)  this.this.appendChild (this.property.children[childWidgets]);
        //layout

        this.attr = (attribute, value) => { WidgetBuilder.attr(attribute, value, this); };//???other
        this.id = (value) => { WidgetBuilder.id(value, this); };
        this.name = (value) => { WidgetBuilder.name(value, this); };
        this.class = (value) => { WidgetBuilder.class(value, this); };
        this.style = (value) => { WidgetBuilder.style(value, this); };
        this.height = (value) => { WidgetBuilder.height(value, this); };
        this.width = (value) => { WidgetBuilder.width(value, this); };
        this.children = (nodes) => {for (let childWidgets in nodes)  this.this.appendChild (nodes[childWidgets]);}

        docFragment.append(this.this);
    }
}


