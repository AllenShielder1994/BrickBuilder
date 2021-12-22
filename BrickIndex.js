function upsertPage(){
    document.body.append(docFragment);
}

// let test1 = new Widget({
//     name:'test2',
//     text:'ceshi',
//     attr:{
//         id: 'test1',
//         class: 'tret',
//         name:'hehe'
//     },
//     style:{
//         //height: '30px',
//         color: 'blue',
//         font_size: '20px',
//         height: '30px',
//         width:'23px',
//         //height: '30px'

//     }, 
// });

// test1.height('11px');


// test1.id('f32');

//console.log (test1);


// let testbtn = new Button ({
//     name:'p',
//     id: '123',
//     text:'sdfsdfsdf'
// });

//testbtn.id('mm');



let RadTest = new Radio({
    //name:'ck',
    id: 'ck',
    text:'girlsd',
    value: 'girlsd'
    
});

// let txTest = new Text({
//     text: 'gener',
// });
new Text('te2');
// let inptTest = new Input({
//     text: 'hh',
//     id: 'ts'
//     //password: true
// });
// inptTest.password(true)
RadTest.text ('hh');


let voiceA = new Voice ({
    // url:'test',
    muted: true,
    autoplay: true
    //preload:'auto'
});

let fileTest = new File ({
    id: 'avatar',

    accept: "image/png, image/jpeg"
});

fileTest.accept ("image/png");

let sliderTester = new Slider ({
    id: 'slidertest',
    autocomplete : 'no',
    name:'name',
    visible: false
});
console.log(sliderTester.value());

let contTest = new Container({
    id: 'container',
    name: 'container'
});
sliderTester.name('tets2');

let cmpTest = new Component({
    tag: 'test1',
    id: 'cmp1',
    name: 'test1',
    // children: [
    //     new Container({
    //         id: 'child1',
    //         name: 'child1'
    //     }).this,

    //     new Container({
    //         id: 'child2',
    //         name: 'child2'
    //     }).this
    // ]

});
upsertPage();
