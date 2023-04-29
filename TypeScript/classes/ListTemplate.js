var ListTemplate = /** @class */ (function () {
    function ListTemplate(container) {
        this.container = container;
    }
    ListTemplate.prototype.render = function (item, heading, pos) {
        var li = document.createElement('li');
        var h4 = document.createElement('h4');
        h4.innerText = heading;
        li.append(h4);
        var p = document.createElement('p');
        p.innerText = item.format(); //format is the method of an interface that I made (HasFormatter)
        li.append(p);
        //We need to check whether the li sits at the start or end of the ul
        if (pos == 'start') {
            this.container.prepend(li); //prepend is the start
        }
        else {
            this.container.append(li); //this is the end
        }
    }; //heading sits at the top of the li tag, position can be at the start or end
    return ListTemplate;
}());
export { ListTemplate };
