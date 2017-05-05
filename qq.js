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

new Vue({
    el: '#myFirstApp',
    data: {
        message: 'Hello Vue!',
        contact: Object.assign({}, contactModel),
        contacts: JSON.parse(localStorage.getItem("contacts") || "[]"),
        opened: contactModel,
        departs: departs,
        indexOfSelected: 0,
        selected: false
    },
mounted: function(){
        var index = this.contacts.length - 1;
        this.opened = this.contacts[index];
        //console.log(this.opened.phone);
},
    methods: {
        add:function () {
            if(this.isSet(this.contact)){
                if(this.selected){
                    this.contacts[this.indexOfSelected] = this.contact;
                    this.contact = Object.assign({}, contactModel);
                    localStorage.setItem("contacts", JSON.stringify(this.contacts));
                }
                else{
                    this.contacts.push(this.contact);
                    this.contact = Object.assign({}, contactModel);
                    localStorage.setItem("contacts", JSON.stringify(this.contacts));
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
                localStorage.setItem("contacts", JSON.stringify(this.contacts));

                this.selected = false;
            }
            return false;
        },
        edit:function () {
            if(this.selected){
                this.contact = this.contacts[this.indexOfSelected];
            }
        },
        isSet:function (obj) {
            if(obj.name == '' && obj.phone == '' && obj.email == '' &&
                (obj.fakultet == undefined || obj.fakultet == '')  && obj.address == '')
                return false;
            else return true;
        },
        setClass:function () {
            $(".list-group-item").removeClass("selected");
            $(".list-group-item").eq(this.indexOfSelected).addClass("selected");
        },
        clearContact:function () {
            
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
