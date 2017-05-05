var contactModel = {
    name:'',
    phone:'',
    email:'',
    fakultet:'',
    address:''
};

var departs = [
    {
        id:1,
        label:'ФРТС',
        dekan:'Степанов'
    },
    {
        id:2,
        label:'БВТ',
        dekan:'Иванов'
    },
    {
        id:3,
        label:'ИТФ',
        dekan:'Петров'
    },
    {
        id:4,
        label:'НГД',
        dekan:'Сидоров'
    },
    {
        id:5,
        label:'ОВФ',
        dekan:'Белов'
    },
];



var vml = new Vue({
    el: '#myFirstApp',
    data: {
        message: 'Hello Vue!',
        contact: Object.assign({}, contactModel),
        contacts: [], 
        //contacts: gcontacts, 
        //contacts: JSON.parse(localStorage.getItem("contacts") || "[]"),
        opened: contactModel,
        departs: departs,
        indexOfSelected: 0,
        selected: false
    },

    mounted: function(){
        $.ajax({url: "readDB", type: "POST", data:"2", async: false, success: function(DBdata){
            this.contacts = JSON.parse(DBdata);
            //console.log(this.contacts);
        }.bind(this)});
        //this.loadDB();

        var index = this.contacts.length - 1;
        this.opened = this.contacts[index];

        /*$.ajax({url: "readDB", type: "POST", data:"1", async: false, success: function(DBdata){
            this.contacts = JSON.parse(DBdata);
            console.log(this.contacts);
        }.bind(this)});*/

        setInterval(function(){
            $.ajax({url: "readDB", type: "POST", data:"4", async: false, success: function(DBdata){
                vml._data.contacts = JSON.parse(DBdata);
                //console.log(vml._data.contacts);
            }.bind(this)});
        }, 2000);
    },  

    methods: {
        add:function () {
            if(this.isSet(this.contact)){
                if(this.selected){
                    this.contacts[this.indexOfSelected] = this.contact;
                    //this.contacts.push(this.contact);
                    this.contact = Object.assign({}, contactModel);
                    //localStorage.setItem("contacts", JSON.stringify(this.contacts));
                    this.updateDataBase();
                    //$.ajax("updDB", {type: "POST", data: JSON.stringify(this.contacts)});
                }
                else{
                    this.contacts.push(this.contact);
                    this.contact = Object.assign({}, contactModel);
                    //localStorage.setItem("contacts", JSON.stringify(this.contacts));
                    this.updateDataBase();
                    //$.ajax({type: "POST", url: "updDB", data: JSON.stringify(this.contacts)});
                }
            }
        },
        show:function (item) {
            this.opened =  item;
            this.indexOfSelected = this.contacts.indexOf(item);
            this.selected = true;
            this.setClass();
        },
        remove:function(){
            if(this.selected){
                this.contacts.splice(this.indexOfSelected, 1);
                console.log('removed')
                //.setItem("contacts", JSON.stringify(this.contacts));
                //var data2 = JSON.stringify(this.contacts);
                this.updateDataBase();
                //$.ajax({type: "POST", url: "updDB", data: JSON.stringify(this.contacts)});
                this.selected = false;
            }
            return false;
        },
        edit:function () {
            if(this.selected){
                this.contact = this.contacts[this.indexOfSelected];
                this.updateDataBase();
                //$.ajax({type: "POST", url: "updDB", data: JSON.stringify(this.contacts)});
            }
        },
        isSet:function (obj) {
            if((obj.name == '' && obj.phone == '' && obj.email == '' &&
                (obj.fakultet == undefined || obj.fakultet == '')  && obj.address == ''))
                return false;
            else return true;
        },
        setClass:function () {
            $(".list-group-item").removeClass("selected");
            $(".list-group-item").eq(this.indexOfSelected).addClass("selected");
        },
        clearContact:function () {
            
        },
        loadDB: function(){
                 $.ajax({url: "readDB", type: "POST", data:"1", async: false, success: function(DBdata){
                    this.contacts = JSON.parse(DBdata);
                    //console.log(this.contacts);
            }.bind(this)});
        },
        updateDataBase: function(){
            $.ajax({type: "POST", url: "updDB", data: JSON.stringify(this.contacts)});
        },
        updatePage: function(){

        }
    },
    computed: {
        getLastContactDepart: function(){
           var id = this.contacts[this.contacts.length-1].fakultet;
            for(var i = 0; i < departs.length; i++){
                if(departs[i].id == id)
                    return departs[i].label + ' ' + departs[i].dekan;
            }
        },
        getOpenedDep: function () {
            var id = this.opened.fakultet;
            for(var i = 0; i < departs.length; i++){
                if(departs[i].id == id)
                    return departs[i].label + ' ' + departs[i].dekan;
            }
        }
    }

})
