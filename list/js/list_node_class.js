class List_node{
    constructor(value){
        this.previous = null;
        this.next = null;
        this.value = value;
    }
}

List_node.prototype.set_value = function(value){
    this.value = value;
    
    ++stats.write;
}

List_node.prototype.get_value = function(){
    ++stats.read;
    
    return this.value;
}

List_node.prototype.set_next = function(next){
     if(!next instanceof List_node){
        return 0;
    }
    
    this.next = next;
    
    ++stats.write;
}

List_node.prototype.get_next = function(){
    ++stats.read;
    
    return this.next;
}

List_node.prototype.set_previous = function(previous){
    if(!previous instanceof List_node){
        return 0;
    }
    
    this.previous = previous;
    
    ++stats.write;
}

List_node.prototype.get_prevoius = function(){
    ++stats.read;
    
    return this.previous;
}