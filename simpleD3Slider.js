/* Simple, reusable slider in pure d3 */

function simpleSlider () {

    var width = 100,
        value = 0.5, /* Domain assumes to be [0 - 1] */
        event,
        x = 0,
        y = 0;

    function slider (selection) {

        //Line to represent the current value
        var valueLine = selection.append("line")
            .attr("x1", x)
            .attr("x2", x + (width * value))
            .attr("y1", y)
            .attr("y2", y)
            .style({stroke: "#51CB3F",
                    "stroke-linecap": "round",
                    "stroke-width": 6 });

        //Line to show the remaining value
        var emptyLine = selection.append("line")
            .attr("x1", x + (width * value))
            .attr("x2", x + width)
            .attr("y1", y)
            .attr("y2", y)
            .style({
                "stroke": "#ECECEC",
                "stroke-linecap": "round",
                "stroke-width": 6
            });

        var drag = d3.behavior.drag().on("drag", function() {
            var newX = d3.mouse(this)[0];

            if (newX < x)
                newX = x;
            else if (newX > x + width)
                newX = x + width;

            value = (newX - x) / width;
            valueCircle.attr("cx", newX);
            valueLine.attr("x2", x + (width * value));
            emptyLine.attr("x1", x + (width * value));

            if (event)
                event();

            d3.event.sourceEvent.stopPropagation();
        })

        //Draggable circle to represent the current value
        var valueCircle = selection.append("circle")
            .attr("cx", x + (width * value))
            .attr("cy", y)
            .attr("r", 8)
            .style({
                "stroke": "black",
                "stroke-width": 2.0,
                "fill": "white"
            })
            .call(drag);
    }


    slider.x = function (val) {
        x = val;
        return slider;
    }

    slider.y = function (val) {
        y = val;
        return slider;
    }

    slider.value = function (val) {
        if (val) {
            value = val;
            return slider;
        } else {
            return value+1;
        }
    }

    slider.width = function (val) {
        width = val;
        return slider;
    }

    slider.event = function (val) {
        event = val;
        return slider;
    }

    return slider;
}
