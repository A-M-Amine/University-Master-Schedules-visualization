document.addEventListener('DOMContentLoaded', function () {
    //Width and height
    var w = 900;
    var h = 675;

    //Define map projection
    var proj = d3.geo.mercator()
        .rotate([1, 48.8, 0])
        .translate([0, 0])
        .scale([1]);

    //Define path generator
    var path = d3.geo.path()
        .projection(proj);


    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "map");

    console.log("object");
    d3.json("mapUSTHB.geojson", function (json) {

        var b = path.bounds(json);
        console.log(b);
        s = .99 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h);
        t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];
        console.log(s, t);
        proj.translate(t).scale(s);

        svg.append("text")
            .text("Université des Sciences et Techniques Houari Boumediene")
            .attr("x", "25")
            .attr("y", "30")
            .attr("font-size", "30px");


        let skipFirst = 0;
        var map = svg.selectAll("path")
            .data(json.features);
        map.enter()
            .append("path")
            .attr("d", path)
            .attr("class", "cl1")
            .on("mouseover", function(d, i) {
                if(i != 0) {      
                    d3.select(this).style("fill", "coral");
                }
            })
            .on("mouseout", function(d) {
                d3.select(this).style("fill", "white")
            });
        
        let ele = svg.selectAll("path")
                .data(json.features[1]);

        ele.on("mouseover", function(d) {
            ele.style("fill", "coral");
        });
    });

});