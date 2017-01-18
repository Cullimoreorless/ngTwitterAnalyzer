
loadSentimentEmot = function(gData ){
    $('#sentimentGraphEmot').html('');
    var svg = d3.select('#sentimentGraphEmot').append('svg');
    let  w=400;
    let h=350
    let margin = {top:20, right: 20, bottom: 50, left: 50};
    let width = w - margin.left - margin.right;
    let height = h - margin.top - margin.bottom;
    svg.attr('width',w).attr('height',h)
    var xScale = d3.scaleLinear().rangeRound([0, width]),
        yScale = d3.scaleBand().rangeRound([height,0]).padding(0.1);
    
    var g = svg.append('g')
            .attr('transform','translate('+margin.left+','+margin.top+')')
    
    
    yScale.domain(gData.map(function(d){ return d['sentiment'];}))
    xScale.domain([0, d3.max(gData, function(d){ return d['percentage'] + 0.05; })])


    g.append('g')
        .attr('transform', 'translate(0,'+height+')')
        .call(d3.axisBottom(xScale).ticks(10, '%'));

    g.append('g')
        .call(d3.axisLeft(yScale))
        .append('text')
        .attr('transform','rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Y Axis Maybe')

    g.selectAll('.bar')
        .data(gData)
        .enter().append('rect')
            .attr('class','bar')
            .attr('x', function(d){ return 0; })
            .attr('y', function(d){ return yScale(d['sentiment']); })
            .attr('height', yScale.bandwidth())
            .attr('width', function(d){ return  xScale(d['percentage']); })

}
loadSentimentHoriz = function(gData){
    $('#sentimentGraphHoriz').html('');
    var svg = d3.select('#sentimentGraphHoriz').append('svg');
    let w=400; 
    let h=350;
    let margin = {top:20, right: 20, bottom: 50, left: 50};
    let width = w - margin.left - margin.right;
    let height = h - margin.top - margin.bottom;
    svg.attr('width',w).attr('height',h)
    var xScale = d3.scaleLinear().rangeRound([0, width]),
        yScale = d3.scaleBand().rangeRound([height,0]).padding(0.1);
    
    var g = svg.append('g')
            .attr('transform','translate('+margin.left+','+margin.top+')')
    
    yScale.domain(gData.map(function(d){ return d['sentiment'];}))
    xScale.domain([0, d3.max(gData, function(d){ return d['percentage'] + 0.05; })])


    g.append('g')
        .attr('transform', 'translate(0,'+height+')')
        .call(d3.axisBottom(xScale).ticks(10, '%'));

    g.append('g')
        .call(d3.axisLeft(yScale))
        .append('text')
        .attr('transform','rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Y Axis Maybe')

    g.selectAll('.bar')
        .data(gData)
        .enter().append('rect')
            .attr('class','bar')
            .attr('x', function(d){ return 0; })
            .attr('y', function(d){ return yScale(d['sentiment']); })
            .attr('height', yScale.bandwidth())
            .attr('width', function(d){ return  xScale(d['percentage']); })

};

loadLineGraph = function(elemId, gData, w, h, xColumn, yColumn, xLabel, yLabel){
    $('#'+elemId).html('');
    
    var margin = {top: 20, right: 20, bottom: 50, left: 50};
    var width = w - margin.left - margin.right;
    var height = h - margin.top - margin.bottom;

    var gRegion = d3.select("#"+elemId);

    var svg = gRegion.append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    //svg.style({"width":w, "height":h});
    
    var xScale = d3.scalePoint()
            .domain(gData.map(function(row){ return row[xColumn]}))
            .range([0,width]);

    ymin = d3.min(gData, function(d){ return d[yColumn]});
    ymax = d3.max(gData, function(d){ return d[yColumn]});
    yScaleMin = ymin > 0 ? 0 : ymin;
    var yScale = d3.scaleLinear()
            .domain([yScaleMin, ymax])
            .range([height, 0]);

    var valueline = d3.line()
        .x(function(d) { return xScale(d[xColumn]); })
        .y(function(d) { return yScale(d[yColumn]); });
    

    // Add the valueline path.
    svg.append("path")
        .data([gData])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(yScale).tickFormat(d3.format('.0%')));

    svg.append("text")             
        .attr("transform",
                "translate(" + (width/2) + " ," + 
                            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text(xLabel);

    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(yLabel);   
    
}

loadWordCloud = function(id, data){
    var cnvs = $('#'+id).width('100%');
    WordCloud(document.getElementById(id), { list: data } );
}