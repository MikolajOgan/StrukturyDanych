class List {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}

List.prototype.get_length = function () {
    ++stats.read;

    return this.length;
}

List.prototype.length_i = function () {
    ++stats.write;

    ++this.length;
}

List.prototype.length_di = function () {
    ++stats.write;

    --this.length;
}

List.prototype.get_first = function () {
    ++stats.read;

    return this.head;
}

List.prototype.set_first = function (node) {
    if (!node instanceof List_node) {
        return 0;
    }
    ++stats.write;

    this.head = node;
}

List.prototype.get_last = function () {
    ++stats.read;

    return this.tail;
}

List.prototype.set_last = function (node) {
    if (!node instanceof List_node) {
        return 0;
    }
    ++stats.write;

    this.tail = node;
}




List.prototype.push_back = function (value) {
    if (!this.tail) {
        this.set_last(new List_node(value));
        this.set_first(this.get_last());
    } else {
        const tmp = new List_node(value);
        tmp.set_previous(this.get_last());
        this.tail.set_next(tmp);
        this.set_last(tmp);
    }

    this.length_i();
}

List.prototype.push_front = function (value) {
    if (!this.get_first()) {
        this.set_tail(new List_node(value));
        this.set_head(this.get_last());
    } else {
        const tmp = new List_node(value);
        tmp.set_next(this.get_first());
        this.get_first().set_previous(tmp);
        this.set_first(tmp);
    }

    this.length_i();
}

List.prototype.pop_front = function () {
    if (this.get_length() === 0) {
        return null;
    }

    if (this.get_length() === 1) {
        delete this.get_first();
        this.set_first(null);
        this.set_last(null);
    } else {
        const tmp = this.get_first().get_next();
        delete this.get_first();
        this.set_first(tmp);
        tmp.set_previous(null);
    }
    this.length_di();
}


List.prototype.pop_back = function () {
    if (this.get_length() === 0) {
        return null;
    }

    if (this.length === 1) {
        delete this.get_first();
        this.set_first(null);
        this.set_last(null);
    } else {
        const tmp = this.get_last().get_prevoius();
        delete this.get_last();
        this.set_last(tmp);
        tmp.set_next(null);
    }
    this.length_di();
}

List.prototype.set_value = function (value, position) {
    if (position < 0 || position >= this.get_length()) {
        return 0;
    }
    let tmp;
    if (position > this.get_length() / 2) {
        tmp = this.get_last();
        list_postion = this.get_length() - 1;
        for (var i = this.get_length() - 1; i !== position; --i) {
            tmp = tmp.get_prevoius();
        }
    } else {
        tmp = this.get_first();
        list_postion = 0;
        for (var i = 0; i !== position; ++i) {
            tmp = tmp.get_next();
        }
    }
    tmp.set_value(value);
}

List.prototype.get_value = function (position) {
    if (position < 0 || position >= this.get_length()) {
        return 0;
    }
    let tmp;
    if (position > this.get_length() / 2) {
        tmp = this.get_last();
        list_postion = this.get_length() - 1;
        for (var i = this.get_length() - 1; i !== position; --i) {
            tmp = tmp.get_prevoius();
        }
    } else {
        tmp = this.get_first();
        list_postion = 0;
        for (var i = 0; i !== position; ++i) {
            tmp = tmp.get_next();
        }
    }
    return tmp.get_value();
}


List.prototype.insert = function (value, position) {
    if (position < 0 || position > this.get_length()) {
        return 0;
    } else if (this.get_length() === 0) {
        this.set_first(new List_node(value));
        this.set_last(this.get_first());
        return this.get_first();
    }

    let tmp;
    if (position > this.get_length() / 2) {
        tmp = this.get_last();
        for (var i = this.get_length(); i !== position; --i) {
            tmp = tmp.get_prevoius();
        }
    } else {
        tmp = this.get_first();
        for (var i = 0; i !== position; ++i) {
            tmp = tmp.get_next();
        }
    }

    const new_node = new List_node(value);

    if (!tmp.get_prevoius()) {
        new_node.set_next(this.get_first());
        this.set_first(new_node);
    } else if (!tmp.get_next()) {
        new_node.set_previous(this.get_last());
        this.get_last().set_next(new_node);
        this.set_last(new_node);
    } else {
        tmp.get_prevoius().set_next(new_node);
        new_node.set_next(tmp);
        new_node.set_previous(tmp.get_prevoius())
        tmp.set_previous(new_node);
    }

    this.length_i();
    return new_node;
}

List.prototype.remove = function (position) {
    if (position < 0 || position >= this.get_length() || this.get_length() === 0) {
        return 0;
    } else if (this.get_length() === 1) {
        delete this.get_first();
        this.set_first(null);
        this.set_last(null);
        return null;
    }

    let tmp;
    if (position > this.get_length() / 2) {
        tmp = this.get_last();
        for (var i = this.get_length() - 1; i !== position; --i) {
            tmp = tmp.get_prevoius();
        }
    } else {
        tmp = this.get_first();
        for (var i = 0; i !== position; ++i) {
            tmp = tmp.get_next();
        }
    }

    if (!tmp.get_prevoius()) {
        this.set_first(tmp.get_next());
        this.get_first().set_previous(null);
    } else if (!tmp.get_next()) {
        this.set_last(tmp.get_prevoius());
        this.get_last.set_next(null);
    } else {
        tmp.get_prevoius().set_next(tmp.get_next());
        tmp.get_next().set_previous(tmp.get_prevoius());
    }

    delete tmp;
    this.length_di();
}

List.prototype.clear = function () {
    if (!this.get_first()) {
        return 0;
    }
    let tmp = this.get_first();
    while (tmp.get_next()) {
        let to_remove = tmp;
        tmp = tmp.get_next();
        delete to_remove;
    }
    this.set_first(null);
    this.set_last(null);
    this.length = 0;
}

List.prototype.print = function () {
    if (!this.get_first()) {
        return 0;
    }
    let tmp = this.get_first();
    while (tmp.get_next()) {
        console.log(tmp.get_value());
        tmp = tmp.get_next();
    }
    console.log(tmp.get_value());
}
