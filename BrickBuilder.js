//BrickBuilder
//Version 1.2

const docFragment = document.createDocumentFragment();

WidgetBuilder = {
    init: prop => {
        let widget = document.createElement(prop.tag);
        
        const basicProps = ['id', 'class', 'style', 'name','value'];
        prop.name != undefined ? widget.setAttribute('name', prop.name) : null;
        prop.id != undefined ? widget.setAttribute('id', prop.id) : null;
        prop.class != undefined ? widget.setAttribute('class', prop.class) : null;
        prop.value != undefined ? widget.setAttribute ('value',prop.value) : null;
        widget.innerHTML = prop.text != undefined ? prop.text : null;
        //typeof prop.visible === 'boolean' ? widget.hidden = !prop.visible : null;
 
        if (prop.style != undefined) {
            let style = JSON.stringify(prop.style).replace(/["{}]/g, '');
            style = style.replace(/_/g, '-');
            widget.setAttribute('style', style.replace(/,/g, ';'));
        }

        for (let key in prop.other) ! basicProps.includes(key) ? widget.setAttribute(key, prop.other[key]) : null;
        //widget.innerHTML = prop.text != undefined ? prop.text : null;

        return widget;
    },

    //attr: (attribute, value, widget) => { (attribute != 'id') && (attribute != 'class') && (attribute != 'style') && (attribute != 'name') ? widget.this.setAttribute(attribute, value) : null; },
    other: (attribute, value, widget) => { 
        ! basicProps.includes(attribute) ? 
            vaule != undefined ?
                widget.this.setAttribute(attribute, value) 
            : null
        : null;
    },

    id: (value, widget) => { 
        value != undefined ? widget.this.setAttribute('id', value) : null; 
        return widget.this.getAttribute('id');
    },

    name: (value, widget) => { 
        //console.log(widget.this.attributes.name);
        value != undefined ? widget.this.setAttribute('name', value) : null;
        return widget.this.getAttribute('name');
    },

    class: (value, widget) => {
        value != undefined ? widget.this.setAttribute('class', value) : null;
        return widget.this.getAttribute('class');
    },

    value: (value, widget) => {
        value != undefined ? widget.this.setAttribute('value', value) : null;
        return widget.this.getAttribute('value');
    },

    style: (value, widget) => {
        widget.property.style = value;
        console.log(widget.property.style);
        if (widget.property.style != undefined) {
            let style = JSON.stringify(widget.property.style).replace(/["{}]/g, '');
            style = style.replace(/_/g, '-');
            widget.this.setAttribute('style', style.replace(/,/g, ';'));
        }
        //return the string type;
        //convert string type into the object before return
        let strStyle = widget.this.getAttribute('style').replaceAll(';','","');

        return eval ('({"'+strStyle.replaceAll(':','":"')+'"})');
    },

    height: (value, widget) => {
        let style = widget.this.getAttribute("style");
        value != undefined ?
            widget.property.style.height != undefined ?
                style = style.indexOf('height') == 0 ?
                    style.replace(/^height:[ ]{0,}[-0-9.0-9]{1,}[ ]{0,}[A-Za-z]{0,5}/g, 'height:' + value)
                : style.replace(/;height:[ ]{0,}[-0-9.0-9]{1,}[ ]{0,}[A-Za-z]{0,5}/g, ';height:' + value)
            : style = style + ';height:' + value
        : null;
        widget.this.setAttribute('style', style);

        let strStyle = widget.this.getAttribute('style').replaceAll(';','","');

        return eval ('({"'+strStyle.replaceAll(':','":"')+'"})').height;

    },

    width: (value, widget) => {
        let style = widget.this.getAttribute("style");
        value != undefined ?
            widget.property.style.width != undefined ?
                style = style.indexOf('width') == 0 ?
                    style.replace(/^width:[ ]{0,}[-0-9.0-9]{1,}[ ]{0,}[A-Za-z]{0,5}/g, 'width:' + value) 
                : style.replace(/;width:[ ]{0,}[-0-9.0-9]{1,}[ ]{0,}[A-Za-z]{0,5}/g, ';width:' + value)
            : style = style + ';width:' + value
        : null;
        widget.this.setAttribute('style', style);

        let strStyle = widget.this.getAttribute('style').replaceAll(';','","');

        return eval ('({"'+strStyle.replaceAll(':','":"')+'"})').width;
    },

    text: (value, widget) => {return widget.this.innerHTML = value != undefined ? value : widget.this.innerHTML;}


};

//属性attr 改成other；修复visible 是false的状态；增加layout{height,width}
//标准属性分为：id, name, class, visible, other, style, layout {height, width, x, y, z} 
class Widget {
    constructor(prop) {
        this.property = prop;
        console.log(prop);
        this.this = WidgetBuilder.init(this.property);
        //this.this.innerHTML = prop.text != undefined ? prop.text : null;

        this.other = (attribute, value) => { WidgetBuilder.other(attribute, value, this); };//改other
        this.id = value => WidgetBuilder.id(value, this);
        this.name = value => WidgetBuilder.name(value, this);
        this.class = value => WidgetBuilder.class(value, this);
        this.value = value => WidgetBuilder.value(value, this);
        this.style = value => WidgetBuilder.style(value, this);
        this.height = value => WidgetBuilder.height(value, this);
        this.width = value => WidgetBuilder.width(value, this);
        //this.text = value =>  this.this.innerHTML = value != undefined ? value : this.this.innerHTML;
        this.text = value => WidgetBuilder.text(value, this);
        
        docFragment.append(this.this);
    }

}

class Container extends Widget {
    constructor(prop) {
        Container.property = prop;
        Container.property.tag = 'container';
        super(Container.property);

        //this.text = value =>  this.this.innerHTML = value != undefined ? this.this.innerHTML = value :  this.this.innerHTML =  this.this.innerHTML;
    }
}

class Button extends Widget {
    constructor(prop) {
        Button.property = prop;
        Button.property.tag = 'button';
        super(Button.property);

        //this.text = value =>  this.this.innerHTML = value != undefined ? this.this.innerHTML = value :  this.this.innerHTML =  this.this.innerHTML;
    }
}

// HTML中的文本控制

class Text extends Widget {
    constructor(prop) {
        Text.property = new Object();
        if (typeof prop === 'string') {
            Text.property.text = prop;
        }
        else if (typeof prop === 'object') {
            Text.property = prop;
        }

        Text.property.tag = 'p';

        super(Text.property);

        this.property.align != undefined ? this.this.align = this.property.align : null;

        this.align = value => this.this.align = value != undefined ? value : this.this.align = 'left';
        this.text = value =>  this.this.innerHTML = value != undefined ? value :  this.this.innerHTML =  this.this.innerHTML;
    }

}

class Radio extends Widget {
    constructor(prop) {

        Radio.property = prop;
        let text = Radio.property.text;
        Radio.property.tag = 'input';
        delete Radio.property.text;

        super(Radio.property);

        //this.this.setAttribute('type','radio') ;
        this.this.type = 'radio';
        console.log(this.property.value);
        this.property.value != undefined ? this.this.value = this.property.value : this.this.value = text;
        this.this.value = this.property.value != undefined ? this.property.value : text;
        this.this.checked = this.property.checked;

        let textContent = document.createTextNode(text)
        text != undefined ? this.this.parentNode.appendChild(textContent) : null;

        this.checked = value => this.this.checked = value != undefined ? value : this.this.checked;
        //this.value = value => this.this.value = value != undefined ? value : this.this.value;
        this.text = value => {
            textContent.nodeValue = value != undefined ? value : textContent.nodeValue;
            this.property.value != undefined ? this.this.value = textContent.nodeValue : null;
            return textContent.nodeValue
        };
    }

}

//checkbox
class Checkbox extends Widget {
    constructor(prop) {
        
        Checkbox.property = prop;
        let text = Checkbox.property.text;
        Checkbox.property.tag = 'input';
        delete Checkbox.property.text;

        super(Checkbox.property);

        this.this.type = 'checkbox';
        //console.log(this.property.value);
        // this.property.value != undefined ? this.this.value = this.property.value : this.this.value = text;
        this.this.value = this.property.value != undefined ? this.property.value : text;
        this.this.checked = this.property.checked;

        let textContent = document.createTextNode(text)
        text != undefined ? this.this.parentNode.appendChild(textContent) : null;

        this.checked = value => this.this.checked = value != undefined ? value : this.this.checked;
        //this.value = value => this.this.value = value != undefined ? value : this.this.value;
        this.text = value => {
            textContent.nodeValue = value != undefined ? value : textContent.nodeValue;
            this.property.value != undefined ? this.this.value = textContent.nodeValue : null;
            return textContent.nodeValue
        };
    }

}

//input
class Input extends Widget {
    constructor(prop) {
        Input.property = prop;
        let text = Input.property.text;
        Input.property.tag = 'input';
        delete Input.property.text;

        super(Input.property);
        let textContent = document.createTextNode(text)
        text != undefined ? this.this.parentNode.insertBefore(textContent,this.this) : null;

        function props4Num() {
            this.property.autocomplete = this.property.autocomplete != undefined ? this.this.autocomplete = this.property.autocomplete : null;
            this.property.max = this.property.max != undefined ? this.this.max = this.property.max : null;
            this.property.min = this.property.min != undefined ? this.this.min = this.property.min : null;
            this.property.placeholder = this.property.placeholder != undefined ? this.this.placeholder = this.property.placeholder : null;
            this.property.required = this.property.required != undefined ? this.this.required = this.property.required : null;
            //this.property.value = this.property.value != undefined ? this.this.value = this.property.value : null;

            this.autocomplete = value => this.this.autocomplete = value != undefined ? value :this.this.autocomplete;
            this.max = value => this.this.max = value != undefined ? value :this.this.max;
            this.min = value => this.this.min = value != undefined ? value :this.this.min;
            this.placeholder = value => this.this.placeholder = value != undefined ? value :this.this.placeholder;
            this.required = value => this.this.required = value != undefined ? value :this.this.required;
            //this.value = value => this.this.value = value != undefined ? value : this.this.value;
        }

        this.this.type = ['number', 'date', 'datetime', 'datetime-local', 'month', 'week', 'email', 'text', 'password'].includes(this.property.type) ? 
        this.property.type : 'text';

        this.property.defaultValue = this.property.defaultValue != undefined ? this.this.defaultValue = this.property.defaultValue : null;
        this.property.disabled = this.property.disabled != undefined ? this.this.disabled = this.property.disabled : null;
        this.property.readOnly = this.property.readOnly != undefined ? this.this.readOnly = this.property.readOnly : null;


        this.text = value => textContent.nodeValue = value != undefined ? value : textContent.nodeValue;
        this.defaultValue = value => this.this.defaultValue = value != undefined ? value :this.this.defaultValue;
        this.disabled = value => this.this.disabled = value != undefined ? value :this.this.disabled;
        this.readOnly = value => this.this.readOnly = value != undefined ? value :this.this.readOnly;

        if (['number', 'date', 'datetime', 'datetime-local', 'month', 'week'].includes(this.this.type)) props4Num();
        else if (this.this.type == 'email') {
            props4Num();

            this.property.pattern = this.property.pattern != undefined ? this.this.pattern = this.property.pattern : null;
            this.property.size = this.property.size != undefined ? this.this.size = this.property.size : null;

            this.pattern = value => this.this.pattern = value != undefined ? value :this.this.pattern;
            this.size = value => this.this.size = value != undefined ? value :this.this.size;
        }
        else {
            this.property.accessKey = this.property.accessKey != undefined ? this.this.accessKey = this.property.accessKey : null;
            this.property.alt = this.property.alt != undefined ? this.this.alt = this.property.alt : null;
            this.property.maxLength = this.property.maxLength != undefined ? this.this.maxLength = this.property.maxLength : null;
            this.property.tabIndex = this.property.tabIndex != undefined ? this.this.tabIndex = this.property.tabIndex : null;

            this.accessKey = value => this.this.accessKey = value != undefined ? value :this.this.accessKey;
            this.alt = value => this.this.alt = value != undefined ? value :this.this.alt;
            this.maxLength = value => this.this.maxLength = value != undefined ? value :this.this.maxLength;
            this.tabIndex = value => this.this.tabIndex = value != undefined ? value :this.this.tabIndex;
        }

        //this.password  = (value) => { value == true ? this.this.setAttribute('type','password') : null;};

    }
}

//file
class File extends Widget {
    constructor(prop) {
        File.property = prop;
        File.property.tag = 'input';
        super(File.property);

        this.this.type = 'file'

        this.property.accept = this.property.accept != undefined ? this.this.accept = this.property.accept : null;
        this.property.capture = this.property.capture != undefined ? this.this.capture = this.property.capture : null;
        this.property.files = this.property.files != undefined ? this.this.files = this.property.files : null;
        this.property.multiple = this.property.multiple != undefined ? this.this.multiple = this.property.multiple : null;

        this.accept = value => this.this.accept = value != undefined ? value : this.this.accept;
        this.capture = value => this.this.capture = value != undefined ? value : this.this.capture;
        this.files = value => this.this.files = value != undefined ? value : this.this.files;
        this.multiple = value => this.this.multiple = value != undefined ? value :this.this.multiple;

    }
}
//slider
class Slider extends Widget {
    constructor(prop) {
        Slider.property = prop;
        Slider.property.tag = 'input';
        super(Slider.property);

        this.this.type = 'range'

        this.property.autocomplete = this.property.autocomplete != undefined ? this.this.autocomplete = this.property.autocomplete : null;
        this.property.defaultValue = this.property.defaultValue != undefined ? this.this.defaultValue = this.property.defaultValue : null;
        this.property.disabled = this.property.disabled != undefined ? this.this.disabled = this.property.disabled : null;
        this.property.max = this.property.max != undefined ? this.this.max = this.property.max : null;
        this.property.min = this.property.min != undefined ? this.this.min = this.property.min : null;
        //this.property.value = this.property.value != undefined ? this.this.value = this.property.value : null;

        this.autocomplete = value => this.this.autocomplete = value != undefined ? value :this.this.autocomplete;
        this.defaultValue = value => this.this.defaultValue = value != undefined ? value :this.this.defaultValue;
        this.disabled = value => this.this.disabled = value != undefined ? value :this.this.disabled;
        this.max = value => this.this.max = value != undefined ? value :this.this.max;
        this.min = value => this.this.min = value != undefined ? value :this.this.min;
        //this.value = value => this.this.value = value != undefined ? value : this.this.value;

    }
}

//color
class Color extends Widget {
    constructor(prop) {
        Color.property = prop;
        Color.property.tag = 'input';
        super(Color.property);

        this.this.type = 'color'

        this.property.span = this.property.span != undefined ? this.this.span = this.property.span : null;
        this.property.autocomplete = this.property.autocomplete != undefined ? this.this.autocomplete = this.property.autocomplete : null;
        this.property.defaultValue = this.property.defaultValue != undefined ? this.this.defaultValue = this.property.defaultValue : null;
        this.property.disabled = this.property.disabled != undefined ? this.this.disabled = this.property.disabled : null;
        //this.property.value = this.property.value != undefined ? this.this.value = this.property.value : null;

        this.span = value => this.this.span = value != undefined ? value : this.this.span;
        this.autocomplete = value => this.this.autocomplete = value != undefined ? value :this.this.autocomplete;
        this.defaultValue = value => this.this.defaultValue = value != undefined ? value :this.this.defaultValue;
        this.disabled = value => this.this.disabled = value != undefined ? value :this.this.disabled;
        //this.value = value => this.this.value = value != undefined ? value : this.this.value;

    }
}

//image
class Image extends Widget {
    constructor(prop) {
        Input.property = prop;
        Input.property.tag = 'img';
        super(Input.property);

        this.property.url = this.property.url != undefined ? this.this.src = this.property.url : null;
        this.property.alt != undefined ? this.this.alt = this.property.alt : null;

        //this.url = value => this.this.setAttribute('src', value);
        this.url = value => this.this.src != undefined ? value :this.this.src;
        // this.alt = value => this.this.setAttribute('alt', value);
        this.alt = value => this.this.alt != undefined ? value :this.this.alt;

    }
}
//voice
class Voice extends Widget {
    constructor(prop) {
        Voice.property = prop;
        Voice.property.tag = 'audio';
        Voice.property.controls = 'controls';
        super(Voice.property);

        this.property.url = this.property.url != undefined ? this.this.src = this.property.url : null;
        this.this.autoplay = this.property.autoplay;
        this.this.loop = this.property.loop;
        this.this.muted = this.property.muted;
        this.this.preload = ['auto', 'meta', 'none'].includes(this.property.preload) ? this.property.preload : 'none';

        // this.url = value => this.this.setAttribute('src', value);
        this.url = value => this.this.src = value != undefined ? value :this.this.src;
        this.autoplay = value => this.this.autoplay = value != undefined ? value :this.this.autoplay;
        this.loop = value => this.this.loop = value != undefined ? value :this.this.loop;
        this.muted = value => this.this.muted = value != undefined ? value :this.this.muted;
        this.preload = value => ['auto', 'meta', 'none'].includes(value) ? value : 'none';
    }
}

//video
class Video extends Widget {
    constructor(prop) {
        Video.property = prop;
        Video.property.tag = 'video';
        Video.property.controls = 'controls';
        super(Video.property);

        this.property.url = this.property.url != undefined ? this.this.src = this.property.url : null;
        this.property.poster = this.property.poster != undefined ? this.this.poster = this.property.poster : null;
        this.this.autoplay = this.property.autoplay;
        this.this.loop = this.property.loop;
        this.this.muted = this.property.muted;
        this.this.preload = ['auto', 'meta', 'none'].includes(this.property.preload) ? this.property.preload : 'none';

        // this.url = value => this.this.setAttribute('src', value);
        this.url = value => this.this.src = value != undefined ? value :this.this.src;
        this.autoplay = value => this.this.autoplay = value != undefined ? value :this.this.autoplay;
        this.loop = value => this.this.loop = value != undefined ? value :this.this.loop;
        this.muted = value => this.this.muted = value != undefined ? value :this.this.muted;
        this.poster = value => this.this.poster = value != undefined ? value :this.this.poster;
        this.preload = value => ['auto', 'meta', 'none'].includes(value) ? value : 'none';
    }
}

class Component {
    constructor(prop) {
        this.property = prop;
        //layout config
        this.property.style = {display : 'flex', flex_direction : this.property.layout, flex_wrap : this.property.wrap, ...prop.style};
        delete this.property.value;
        delete this.property.text;

        this.this = WidgetBuilder.init(this.property);

        for (let childWidgets in this.property.children) this.this.appendChild(this.property.children[childWidgets].this);
        this.other = (attribute, value) => { WidgetBuilder.other(attribute, value, this); };//改other
        this.id = value => WidgetBuilder.id(value, this);
        this.name = value => WidgetBuilder.name(value, this);
        this.class = value => WidgetBuilder.class(value, this);
        this.style = value => WidgetBuilder.style({...this.property.style,...value}, this);
        this.height = value => WidgetBuilder.height(value, this);
        this.width = value => WidgetBuilder.width(value, this);
        this.children = nodes => { 
            if (nodes === undefined ) return this.property.children;
            if (typeof nodes === 'number' ) return this.property.children[nodes];
            for (let childWidgets in nodes) this.this.appendChild(nodes[childWidgets]);
        }

        docFragment.append(this.this);
    }
}


