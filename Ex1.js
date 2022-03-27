let date ="";
let num_option="";
$('date').ready(get_current_date);

function get_current_date() {

    let url ="http://benaa.mysoft.jce.ac.il/Ex1/get_current_date.php"
    $.ajax(url,{
        dataType:"text",
        timeout:1000,
        success: function (data) { date = data; $("#date_of_the_day").html("<b>Date :" + data + "</b>"); },
        error: function () { $("#date_of_the_day").html("Error: Getting today's date"); }
    });
}
function choice_amount_of_animals(amount){

    num_option=amount;
    if(num_option==4){
        $.ajax("https://zoo-animal-api.herokuapp.com/animals/rand/4",
      {  dataType: 'JSON',
        success: function (data){create_tables(data)},
        error: function (xhr, status, errorMsg)
        {
            alert("Error: selecting animals");
        } 
    });
    }
    if(num_option==8){
        $.ajax("https://zoo-animal-api.herokuapp.com/animals/rand/8",
        {  dataType: 'JSON',
          success: function (data){create_tables(data)},
          error: function (xhr, status, errorMsg)
          {
              alert("Error: selecting animals");
          } 
      });
    }
    if(num_option==10){
        $.ajax("https://zoo-animal-api.herokuapp.com/animals/rand/10",
        {  dataType: 'JSON',
          success: function (data){create_tables(data)},
          error: function (xhr, status, errorMsg)
          {
              alert("Error: selecting animals");
          } 
      });
    }
}
function create_tables(data) {

    if(num_option==4){
    let body = document.getElementById("tables_for_the_picture");
    body.innerHTML ="";
    let table = document.createElement("table");
    let section = document.createElement("section");
    let row_info = document.createElement("tr");
    for (let i = 0; i < 4; i++) {
        let animal = document.createElement("td");
        animal.setAttribute("onclick", "information_about_the_animals("+JSON.stringify(data[i])+")");
        let img = document.createElement("img");
        img.setAttribute("src", data[i].image_link);
        img.setAttribute("class", "pictures_for_8_or_4");
        let name =document.createElement("label");
        name.innerText = data[i].name;
        animal.appendChild(img);
        animal.appendChild(name);
        row_info.appendChild(animal);    
    }
    section.appendChild(row_info);
    table.appendChild(section);
    body.appendChild(table);
    table.setAttribute("border", "1");
}
    if(num_option==8){
    let body = document.getElementById("tables_for_the_picture");
    body.innerHTML ="";
    let table = document.createElement("table");
    let section = document.createElement("section");
    let row_info = document.createElement("tr");
    for (let i = 0; i < 4; i++) {
        let animal = document.createElement("td");
        animal.setAttribute("onclick", "information_about_the_animals("+JSON.stringify(data[i])+")");
        let img = document.createElement("img");
        img.setAttribute("src", data[i].image_link);
        img.setAttribute("class", "pictures_for_8_or_4");
        let name =document.createElement("label");
        name.innerText = data[i].name;

        animal.appendChild(img);
        animal.appendChild(name);
        row_info.appendChild(animal);    
    }
    let row_2_info = document.createElement("tr"); 
    for (let i = 0; i < 4; i++) {
        let animal = document.createElement("td");
        animal.setAttribute("onclick", "information_about_the_animals("+JSON.stringify(data[i+4])+")");
        let img = document.createElement("img");
        img.setAttribute("src", data[i+4].image_link);
        img.setAttribute("class", "pictures_for_8_or_4");
        let name =document.createElement("label");
        name.innerText = data[i+4].name;
        animal.appendChild(img);
        animal.appendChild(name);
        row_2_info.appendChild(animal);    
    }
    section.appendChild(row_info);
    section.appendChild(row_2_info);
    table.appendChild(section);
    body.appendChild(table);
    table.setAttribute("border", "1");
}
    if(num_option==10){
    let body = document.getElementById("tables_for_the_picture");
    body.innerHTML ="";
    let table = document.createElement("table");
    let section = document.createElement("section");
    let row_info = document.createElement("tr");
    for (let i = 0; i < 5; i++) {
        let animal = document.createElement("td");
        animal.setAttribute("onclick", "information_about_the_animals("+JSON.stringify(data[i])+")");
        let img = document.createElement("img");
        img.setAttribute("src", data[i].image_link);
        img.setAttribute("class", "pictures_for_10");
        let name =document.createElement("label");
        name.innerText = data[i].name;
        animal.appendChild(img);
        animal.appendChild(name);
        row_info.appendChild(animal);    
    }
     let row_2_info = document.createElement("tr"); 
     for (let i = 0; i < 5; i++) {
        let animal = document.createElement("td");
        animal.setAttribute("onclick", "information_about_the_animals("+JSON.stringify(data[i+5])+")");
        let img = document.createElement("img");
        img.setAttribute("src", data[i+5].image_link);
        img.setAttribute("class", "pictures_for_10");
        let name =document.createElement("label");
        name.innerText = data[i+5].name;
        animal.appendChild(img);
        animal.appendChild(name);
        row_2_info.appendChild(animal);   
    }
    section.appendChild(row_info);
    section.appendChild(row_2_info);
    table.appendChild(section);
    body.appendChild(table);
    table.setAttribute("border", "1");
}

}
function information_about_the_animals(data){

    let body = document.getElementById("information_about_the_animals");
    body.innerHTML = "Family: "+data.animal_type+'<br></br>'+
    "Food: "+data.diet+'<br></br>'+
    "Life Expectancy: "+data.lifespan+' Years<br></br>'+
    "Minimum length: "+(data.length_min*0.3048).toFixed(2)+' Meters<br></br>'+
    "Maximum length: "+(data.length_max*0.3048).toFixed(2)+' Meters<br></br>'+
    "Minimum weight: "+(data.weight_min/2.20462).toFixed(2)+' kilogram<br></br>'+
    "Maximum weight: "+(data.weight_max/2.20462).toFixed(2)+' kilogram<br></br>';
    get_viewers_from_wikipedia(data.name);
}
function get_viewers_from_wikipedia(name){

    let url="https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/";
     for (let i=0;i<name.length;i++){
        if(name[i]==" "){
            url+="%20";
          
        }else{
            url+=name[i];
        }
    }
    url+="/daily/";
    let temp= new Date();
    let temp1="";
    let text="";
    temp1=temp.getFullYear();
    text=temp1.toString();
    url+=text;
    if(temp.getMonth()<10){
        temp1='0'+(temp.getMonth()+1);
    }else{
        temp1=temp.getMonth();
    }
    text=temp1.toString();
    url+=text;
    if(temp.getDate()<10||temp.getDate()-7<10){
        temp1=temp.getDate()-7;
        url+='0';
    }else{
        temp1=temp.getDate()-7;
    }
    text=temp1.toString();
    url+=text;
    url+='/';
    temp1=temp.getFullYear();
    text=temp1.toString();
    url+=text;

    if(temp.getMonth()<10){
        temp1='0'+(temp.getMonth()+1);
    }else{
        temp1=temp.getMonth();
    }
    text=temp1.toString();
    url+=text;

    if(temp.getDate()<10){
        temp1=temp.getDate();
        url+='0';
    }else{
        temp1=temp.getDate();
    }
    text=temp1.toString();
    url+=text;

    let counter=0;
    $.ajax(url,{
        dataType: "JSON",
        timeout: 1000,
        success: function (data){console.log(data)
             for (let i=0; i<data.items.length; i++){
                counter += data.items[i].views;
            }
            $("#information_about_the_animals").append("<br>Wikipedia views: " + counter )},
        error: function (){$("#information_about_the_animals").append("<br>Wikipedia views: Can not be accepted")}
    });
}
