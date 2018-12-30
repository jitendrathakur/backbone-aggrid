(function($) {

	var UserInputView = Backbone.View.extend({

		el : '#CustomerForm',

		initialize : function() {
			this.customerListView = new CustomerListView();
		},

		events : {
			'click button' : 'addCustomerCollection'
		},

		addCustomerCollection : function(e) {					
			var customer = new Customer({
				email : this.$('input[name=email]').val(),				
				mobile : this.$('input[name=mobile]').val(),
			});
			this.customerListView.collection.add(customer);			
		}
	});

	var Customer = Backbone.Model.extend({
		initialize : function() {
			this.email = 'email';
			this.mobile = 'mobile';
		}
	});

	var columnDefs = [
      {headerName: "Email", field: "email"},
      {headerName: "Mobile", field: "mobile"}      
    ];

    // let the grid know which columns and what data to use
    var gridOptions = {
      columnDefs: columnDefs,
      enableSorting: true,
      enableFilter: true
    };

    var eGridDiv = document.querySelector('#myGrid');
	new agGrid.Grid(eGridDiv, gridOptions); 

	var data = data || [];
	var ListView = Backbone.View.extend({		
		render : function() {
						
			var payload = {"email":this.model.get('email'),"mobile":this.model.get('mobile')};
			data.push(payload);
									
			gridOptions.api.setRowData(data);
			return this;
		}
	});

	var CustomerList = Backbone.Collection.extend({
		model : Customer
	});

	var CustomerListView = Backbone.View.extend({

		el : '#myGrid',

		initialize : function() {
			
			_.bindAll(this, 'render', 'appendToCustomerList');
			this.collection = new CustomerList();
			this.collection.bind('add', this.appendToCustomerList);
		},

		render:function(){

			$.each(this.collection.models, function(i, customerObj){
				self.appendToCustomerList(customerObj);
			});
		},

		appendToCustomerList : function(customerObj) {
			var listView = new ListView({
				model : customerObj
			});
			$(this.el).append(listView.render().el);
		}
	});

	new UserInputView();

	var HomeView = Backbone.View.extend({
	      template: '<h1>Home</h1>',
	      initialize: function () {
	          this.render();
	      },
	      render: function () {
	          this.$el.html(this.template);
	      }
	});
	  

	var AboutView = Backbone.View.extend({
	      template: '<h1>About</h1>',
	      initialize: function () {
	          this.render();
	      },
	      render: function () {
	          this.$el.html(this.template);
	      }
	  });
	  
	  var AppRouter = Backbone.Router.extend({
	      routes: {          
	          '': 'homeRoute',
	          'home': 'homeRoute',
	          'about': 'aboutRoute',          
	      },
	      homeRoute: function () {
	          var homeView = new HomeView();          
	          $("#content").html(homeView.el);
	      },
	      aboutRoute: function () {
	          var aboutView = new AboutView();          
	          $("#content").html(aboutView.el);
	      }
	  });

	  var appRouter = new AppRouter();
	  Backbone.history.start();

   

})(jQuery);
