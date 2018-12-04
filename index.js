// const canvas = d3.select('.canvas');
// const svg = canvas.append('svg')
//     .attr('height', 600)
//     .attr('width', 600);

//     const group = svg.append('g')
//                   .attr('transform', 'translate(0,100)');
// //append shapes to svg
// group.append('rect')
// .attr('height', 100)
// .attr('width', 200)
// .attr('fill', 'blue')
// .attr('x', 20)
// .attr('y', 20);

// group.append('circle')
// .attr('r', 50)
// .attr('fill', 'pink')
// .attr('cx', 300)
// .attr('cy', 70)
// .attr('stroke', 'red');

// group.append('line')
// .attr('x1', 370)
// .attr('y1', 20)
// .attr('x2', 400)
// .attr('y2',120)
// .attr('stroke', 'red');

// svg.append('text')
// .attr('x', 20)
// .attr('y', 60)
// .attr('fill','red')
// .text('Sumit')
// .style('font-family','arial');

// const data = [{
//     width:100,
//     height:100,
//     fill:'purple'
// },
// {
//     width:100,
//     height:50,
//     fill:'yellow'
// },
// {
//     width:100,
//     height:10,
//     fill:'green'
// }
// ];

// const svg = d3.select('svg');
// const rect = svg.selectAll('rect')
// .data(data);
// // .attr('width',(d,i,  n )=>{
// //    // console.log(this);// represents window
// //   //  console.log(n[i]);//selects the current element
// //     return d.width})
// // .attr('height',d=>d.height)//if one line we dont need {} and return  also we dont need () if there is only one parameters
// // .attr('fill', d=>{// if two lines we need both
// //     return d.fill});
// rect.enter()
// .append('rect')
// .attr('width',(d,i,  n )=>d.width)
//  .attr('height',d=>d.height)
//  .attr('fill', d=>d.fill);

// const svg = d3.select('svg');
// d3.json('planet.json').then(data => {
//     const circle = svg.selectAll('circle')
//     .data(data);

//     circle.attr('cy',200)
//     .attr('cx', d=> d.distance)
//     .attr('r', d=> d.radius)
//     .attr('fill', d=> d.fill);
//     circle.enter()
//     .append('circle')
//     .attr('cy',200)
//     .attr('cx', d=> d.distance)
//     .attr('r', d=> d.radius)
//     .attr('fill', d=> d.fill);

// })

const svg = d3.select('.canvas')
.append('svg')
.attr('width', 600)
.attr('height',600);

const margin = {top:20, right: 20 , bottom:100, left:100};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g')
.attr('width', graphWidth)
.attr('height', graphHeight)
.attr('transform', `translate(${margin.left}, ${margin.top})`)

const xAxisGroup = graph.append('g').attr('transform', `translate(0, ${graphHeight})`);
const yAxisFroup = graph.append('g');

d3.json('menu.json').then(data => {
    const min = d3.min(data, d => d.orders);
    const max = d3.max(data, d => d.orders);
    const extent = d3.extent(data, d=> d.orders);

    const y = d3.scaleLinear()
    .domain([0,extent[1]])
    .range([graphHeight, 0]);

    const x = d3.scaleBand()
    .domain(data.map(item=> item.name))
    .range([0,500])
    .paddingInner(0.2)
    .paddingOuter(0.2);


    const rects = graph.selectAll('rect')
    .data(data);

    rects.attr('width',x.bandwidth)
    .attr('height',graphHeight - y(d=> d.orders))
    .attr('fill', 'orange')
    .attr('x', d => x(d.name))
    .attr('y', d=>  y(d.orders));

    rects.enter()
    .append('rect')
    .attr('width',x.bandwidth)
    .attr('height', d=> graphHeight - y(d.orders))
    .attr('fill','orange'  )
    .attr('x', d => x(d.name))
    .attr('y', d=> y(d.orders));



    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y)
    .ticks(5)
    .tickFormat(d=> d + ' orders');

    xAxisGroup.call(xAxis);
    yAxisFroup.call(yAxis);

    xAxisGroup.selectAll('text')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end')
    .attr('fill', 'grey')
})