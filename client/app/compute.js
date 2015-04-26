'use strict';

(function(app, $, ko) {
    
    var Computed = function () {
     
        var self = this;
        
        self.subtotal = ko.observable(20);
        self.tax = ko.observable(0.5);
        
        self.total = ko.computed(function() {
           var subtotal = parseFloat(self.subtotal()),
               tax = parseFloat(self.tax());
            
            return subtotal * (1 + tax);
        });
    
        self.total = ko.computed({
            
            write: function(newValue) {
                var resultado = newValue / (1 + parseFloat(self.tax()));
                self.subtotal(resultado);
            },
            
            read: function() {
                var subtotal = parseFloat(self.subtotal()),
                    tax = 1 + parseFloat(self.tax());
                return subtotal * tax;
            }
            
        });
        
        
        var OnChangeTotal = self.total.subscribe(function(oldvalue) {
            console.log('this is the old value: %d', oldvalue);
        }, self, 'beforeChange');
        
    }
    
    
    $(document).ready(function() {
        ko.applyBindings(new Computed());
    });
    
})(window.app = window.app || {}, jQuery, ko);