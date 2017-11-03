//bubble chart
var diameter = 400;
var format = d3.format(",d");
var colors = ['#C70039', '#FFD344', '#FF5733', '#FF7052'];
var color = d3.scale.category10().range(colors);
var bubble = d3.layout.pack()
    .sort(function(a, b){return b.value - a.value})
    .size([diameter * 2, diameter]) //size of the bubble chart
    .padding(10);
var svg = d3.select("body").select("#svg_bubble");
var tooltip = d3.select("body") //set the tooltip
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("background-color", "rgba(0, 0, 0, 0.75)")
    .style("border-radius", "6px")
    .style("padding", "5px")
    .style("font", "12px PT Sans")
var data = [
    {race: "black", gender: "M", name: "Samuel L. Jackson", value: 5149},
    {race: "white", gender: "M", name: "Harrison Ford", value: 4954},
    {race: "white", gender: "M", name: "Tom Hanks", value: 4522},
    {race: "black", gender: "M", name: "Morgan Freeman", value: 4515},
    {race: "white", gender: "M", name: "Robert Downey Jr", value: 4281},
    {race: "black", gender: "M", name: "Eddie Murphy", value: 3811},
    {race: "white", gender: "M", name: "Tom Cruise", value: 3774},
    {race: "white", gender: "M", name: "Stanley Tucci", value: 3758},
    {race: "white", gender: "F", name: "Scarlett Johanssen", value: 3674},
    {race: "white", gender: "M", name: "Ian McKellen", value: 3654},
    {race: "white", gender: "M", name: "Johnny Depp", value: 3541},
    {race: "white", gender: "M", name: "Anthony Daniels", value: 3420},
    {race: "white", gender: "M", name: "Michael Caine", value: 3396},
    {race: "white", gender: "M", name: "Gary Oldman", value: 3377},
    {race: "white", gender: "M", name: "Robin Williams", value: 3279},
    {race: "white", gender: "M", name: "Robert DeNiro", value: 3233},
    {race: "white", gender: "F", name: "Emma Watson", value: 3206},
    {race: "black", gender: "M", name: "Will Smith", value: 3205},
    {race: "white", gender: "M", name: "Bruce Willis", value: 3189},
    {race: "white", gender: "M", name: "Stellan Skarsgard", value: 3175},
    {race: "white", gender: "M", name: "Matt Damon", value: 3162},
    {race: "other", gender: "M", name: "Andy Serkis", value: 3037},
    {race: "white", gender: "F", name: "Cameron Diaz", value: 3031},
    {race: "white", gender: "M", name: "Woody Harrelson", value: 2994},
    {race: "white", gender: "M", name: "Orlando Bloom", value: 2988},
    {race: "white", gender: "M", name: "Liam Neeson", value: 2954},
    {race: "white", gender: "M", name: "Bradley Cooper", value: 2947},
    {race: "white", gender: "M", name: "Ralph Fiennes", value: 2903},
    {race: "black", gender: "M", name: "Don Cheadle", value: 2885},
    {race: "white", gender: "M", name: "Ben Stiller", value: 2829},
    {race: "white", gender: "F", name: "Helena Bonham Carter", value: 2822},
    {race: "other", gender: "M", name: "Vin Diesel", value: 2813},
    {race: "white", gender: "F", name: "Elizabeth Banks", value: 2811},
    {race: "black", gender: "M", name: "Dwayne Johnson", value: 2807},
    {race: "white", gender: "F", name: "Cate Blanchett", value: 2803},
    {race: "white", gender: "F", name: "Julia Roberts", value: 2780},
    {race: "white", gender: "M", name: "Mark Wahlberg", value: 2773},
    {race: "white", gender: "M", name: "Brad Pitt", value: 2721},
    {race: "white", gender: "M", name: "Tommy Lee Jones", value: 2693},
    {race: "black", gender: "M", name: "Idris Elba", value: 2663},
    {race: "white", gender: "M", name: "Adam Sandler", value: 2661},
    {race: "white", gender: "M", name: "Steve Carell", value: 2649},
    {race: "black", gender: "F", name: "Zoe Saldana", value: 2639},
    {race: "white", gender: "M", name: "Jeremy Renner", value: 2634},
    {race: "white", gender: "M", name: "Daniel Radcliffe", value: 2634},
    {race: "white", gender: "M", name: "Jonah Hill", value: 2620},
    {race: "white", gender: "M", name: "Simon Pegg", value: 2620},
    {race: "white", gender: "M", name: "Ewan McGregor", value: 2593},
    {race: "black", gender: "M", name: "Tyrese Gibson", value: 2593},
    {race: "white", gender: "M", name: "Jim Carrey", value: 2545},
    {race: "white", gender: "M", name: "Dustin Hoffman", value: 2522},
    {race: "white", gender: "M", name: "Leonardo DiCaprio", value: 2518},
    {race: "white", gender: "M", name: "Hugh Jackman", value: 2515},
    {race: "white", gender: "M", name: "Michael Keaton", value: 2509},
    {race: "white", gender: "F", name: "Jennifer Lawrence", value: 2486},
    {race: "white", gender: "M", name: "Chris Evans", value: 2482},
    {race: "white", gender: "M", name: "Philip Seymour Hoffman", value: 2463},
    {race: "white", gender: "F", name: "Sandra Bullock", value: 2462},
    {race: "white", gender: "M", name: "Sylvester Stallone", value: 2440},
    {race: "white", gender: "M", name: "Alec Baldwin", value: 2437},
    {race: "white", gender: "F", name: "Anne Hathaway", value: 2419},
    {race: "black", gender: "M", name: "Laurence Fishburne", value: 2410},
    {race: "white", gender: "M", name: "Nicolas Cage", value: 2407},
    {race: "white", gender: "M", name: "John Travolta", value: 2398},
    {race: "white", gender: "M", name: "Rupert Grint", value: 2390},
    {race: "black", gender: "M", name: "Denzel Washington", value: 2387},
    {race: "other", gender: "M", name: "Antonio Banderas", value: 2386},
    {race: "other", gender: "F", name: "Michelle Rodriguez", value: 2368},
    {race: "white", gender: "F", name: "Kathy Bates", value: 2330},
    {race: "white", gender: "M", name: "Ben Affleck", value: 2288},
    {race: "white", gender: "F", name: "Sigourney Weaver", value: 2280},
    {race: "white", gender: "M", name: "Jon Voight", value: 2266},
    {race: "white", gender: "M", name: "James Franco", value: 2262},
    {race: "white", gender: "F", name: "Carrie Fisher", value: 2258},
    {race: "white", gender: "M", name: "John Goodman", value: 2230},
    {race: "white", gender: "M", name: "Christian Bale", value: 2215},
    {race: "white", gender: "M", name: "Mike Myers", value: 2211},
    {race: "white", gender: "M", name: "Seth Rogen", value: 2208},
    {race: "white", gender: "M", name: "Kurt Russell", value: 2208},
    {race: "white", gender: "M", name: "Will Ferrell", value: 2192},
    {race: "white", gender: "M", name: "Hugo Weaving", value: 2189},
    {race: "white", gender: "F", name: "Kristen Wiig", value: 2182},
    {race: "white", gender: "F", name: "Angelina Jolie", value: 2179},
    {race: "white", gender: "M", name: "Mark Hamill", value: 2176},
    {race: "white", gender: "M", name: "Alan Tudyk", value: 2174},
    {race: "white", gender: "M", name: "Anthony Hopkins", value: 2165},
    {race: "black", gender: "M", name: "Jamie Foxx", value: 2154},
    {race: "white", gender: "M", name: "Shia LaBeouf", value: 2129},
    {race: "white", gender: "F", name: "Amy Adams", value: 2126},
    {race: "white", gender: "M", name: "Mel Gibson", value: 2113},
    {race: "black", gender: "M", name: "Forest Whitaker", value: 2112},
    {race: "white", gender: "M", name: "Kevin Costner", value: 2095},
    {race: "white", gender: "M", name: "Josh Hutcherson", value: 2094},
    {race: "white", gender: "M", name: "Christopher Walken", value: 2093},
    {race: "white", gender: "M", name: "Chris Pratt", value: 2083},
    {race: "white", gender: "M", name: "George Clooney", value: 2078},
    {race: "white", gender: "F", name: "Natalie Portman", value: 2077},
    {race: "white", gender: "F", name: "Sally Field", value: 2075},
    {race: "white", gender: "F", name: "Julianne Moore", value: 2074}
];
var node = svg.selectAll(".node")
    .data(bubble.nodes({children:data}).filter(function(d) { return !d.children; }))
  .enter().append("g") 
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

node.append("image")
    .attr("xlink:href", function(d) {
        newName = d.name.toLowerCase().replace(/\s/g,'')
        return "images/" + newName +".png"
    })
    .attr("height", function(d){
        return d.value/110
    })
    .attr("width", function(d){
        return d.value/110
    })
    .on("mouseover", function(d) {
        d3.select(this).style("stroke", "#383838");
        d3.select(this).style("stroke-width", "2px");
        tooltip.text(d.name + ", " + "$"+d.value);
        tooltip.style("visibility", "visible");
    })
    .on("mousemove", function() {
        return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    })
    .on("mouseout", function(){
        //d3.select(this.parentNode).select("text").text(function(d) { return d.name; });
        d3.select(this).style("stroke-width", "0px");
        d3.select(this).style("fill", function(d) { return color(d.race); });
        return tooltip.style("visibility", "hidden");
    });


function refresh(){
    var circle = svg.selectAll(".node").select("image")
    circle.attr("x", 0);
    document.getElementById("caption").innerHTML = '<p> Source: https://www.census.gov/quickfacts/fact/table/US/PST045216, http://www.boxofficemojo.com/people/?view=Actor&sort=sumgross&order=DESC&p=.htm </p>'
    document.getElementById("hollywood_left").innerHTML = '';
    document.getElementById("hollywood_right").innerHTML = '';
    document.getElementById("usa_left").innerHTML = '';
    document.getElementById("usa_right").innerHTML = '';
}

function groupByRace(){
    var img = svg.selectAll(".node").select("image")
    img.attr("x", function(d){ return d.race == "white"? -200:300;});
    document.getElementById("caption").innerHTML = ''
    document.getElementById("hollywood_left").innerHTML = 'Hollywood: 83% White';
    document.getElementById("hollywood_right").innerHTML = '13% Black, 4% "Other"';
    document.getElementById("usa_left").innerHTML = 'USA: 61% White non-Hispanic/Latinx';
    document.getElementById("usa_right").innerHTML = '13% Black,  18 Hispanic or Latino, 6% Asian, 4% Other';
}

function groupByGender(){
    var img = svg.selectAll(".node").select("image")
    img.attr("x", function(d){ return d.gender == "F"? 300:-200;});
    document.getElementById("caption").innerHTML = ''
    document.getElementById("hollywood_left").innerHTML = 'Hollywood: 79% Male';
    document.getElementById("hollywood_right").innerHTML = '21% Female';
    document.getElementById("usa_left").innerHTML = 'USA: 49.4% Male';
    document.getElementById("usa_right").innerHTML = '50.6% Female';
}