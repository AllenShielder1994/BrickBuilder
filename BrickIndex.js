function upsertPage(){
    document.body.append(docFragment);
}

let test1 = new Widget({
    tag:'Tagtest2',
    name:'Nametest2',
    text:'ceshi',
    id:'Idtest2',
    class: 'test2class',
    //value: 'ceshi',
    attr:{
        id: 'test1',
        class: 'tret',
        name:'hehe'
    },
    style:{
        //height: '30px',
        color: 'blue',
        font_size: '20px',
        height: '30px',
        width:'23px',
        //height: '30px'

    }, 
});


//console.log(test1.name('newNameTest2'));
//console.log(test1.style());
// let newStyle = test1.style();
// console.log (newStyle)
console.log(test1.value());
console.log(test1.text('newCeshi'));
console.log(test1.style());
//test1.style(styleTest);

//test1.height('11px');


// test1.id('f32');

//console.log (test1);


// let testbtn = new Button ({
//     name:'p',
//     id: '123',
//     text:'sdfsdfsdf'
// });

//testbtn.id('mm');



let RadTest = new Checkbox({
    //name:'ck',
    id: 'ck',
    text:'girlsd',
    //value: 'girlsd'
    //checked: true,
    
});
//console.log(RadTest.value);
console.log(RadTest.text('hh'));
console.log(RadTest.value());

// let txTest = new Text({
//     text: 'gener',
//     align: 'right',
// });
//new Text('te2');
// let inptTest = new Input({
//     text: 'hh',
//     id: 'ts'
//     //password: true
// });
// console.log (inptTest.text());
// console.log (inptTest.text('newInputTest'));
//RadTest.text ('hh');


// let voiceA = new Voice ({
//     // url:'test',
//     muted: true,
//     autoplay: true
//     //preload:'auto'
// });

// let fileTest = new File ({
//     id: 'avatar',

//     accept: "image/png, image/jpeg"
// });

// fileTest.accept ("image/png");

// let sliderTester = new Slider ({
//     id: 'slidertest',
//     autocomplete : 'no',
//     name:'name',
//     visible: false
// });
// console.log(sliderTester.value());

// let contTest = new Container({
//     id: 'container',
//     name: 'container'
// });
// console.log (contTest.text('containerTest'));
//contTest.text('containerTest');
//sliderTester.name('tets2');
let testStyle = {
    height: '100px',
    width: '100px',
    background: 'blue'
};
// let cmpTest = new Component({
//     tag: 'cmp1',
//     id: 'cmp1',
//     name: 'cmp1',
//     //layout: 'row',
//     children: [
//         new Container({
//             id: 'child1',
//             name: 'child1',
//             style: testStyle     
//         }).this,

//         new Container({
//             id: 'child2',
//             name: 'child2',
//             style: testStyle
//         }).this
//     ]

// });

function Select (){

        let selectTest = new Component({
            tag: 'select',
            id: 'select',
            name : 'selectTest',
            style : {
                height : '10px',
            },
            text:'test',
            //layout : 'column',
            children: [
                new Widget ({tag: 'option', text : 'A', value:'A'}),
                new Widget ({tag: 'option', text : 'B', value:'B'}),
                new Widget ({tag: 'option', text : 'C', value:'C'}),
            ]
        });
        //console.log(selectTest.text('newtest'));
        console.log(selectTest.style({ height: '20px' }));
        
        console.log (selectTest.children(0));
        selectTest.children(0).id('tt')
        
        // let option = ['Volvo','Saab','Mercedes','Audi'];
        // let node = [];
        
        // for (key in option)  node.push(new Widget ({tag: 'option', text : option[key], attr: {value:option[key]}}).this)
        // selectTest.children(node);
        // console.log (selectTest.children(0));
    
}

let a = Select();



// selectTest.children([new Widget ({tag: 'option', text : 'D', attr: {value:'D'}}).this]);

//console.log (selectTest.children())



upsertPage();
