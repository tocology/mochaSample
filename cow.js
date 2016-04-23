(function(exports) {
    'use strict'

    function Cow(name) {
        this.name = name || "Anon cow"
    }
    exports.Cow = Cow

    Cow.prototype = {
        greets: (target) => {
            if(!target)
                throw new Error("missing target")
            return this.name + " greets " + target
        },

        lateGreets: (target, cb) => {
            setTimeout(self => {
                try {
                    cb(null, self.greets(target))
                } catch (err) {
                    cb(err)
                }
            }, 1000, this)
        },

        logGreets: target => {
            if(!target)
                throw console.error("Missing target")
            console.log(this.name + " greets " + target)
        },
    }
})(this)
