(function($) {

	var UserInputView = Backbone.View.extend({

		el : '#CustomerForm',

		initialize : function() {
			
			//this.customerListView = new CustomerListView();
		},

		events : {
			'click button' : 'addCustomerCollection'
		},

		addCustomerCollection : function(e) {	
			window.location.hash = '/about';	

			var customer = new Customer({
				email : this.$('input[name=email]').val(),				
				mobile : this.$('input[name=mobile]').val(),
			});
			//this.customerListView.collection.add(customer);		

			
		}
	});

	var Customer = Backbone.Model.extend({
		initialize : function() {
			this.email = 'email';
			this.mobile = 'mobile';
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

	

	var homeView = '<form id="CustomerForm">';
        homeView += '<div class="container">';
            homeView += '<h1>Customer Information</h1>';
            homeView += '<p>Please put customer information</p>';
            homeView += '<hr>';
            homeView += '<label for="email"><b>Email</b></label>';
            homeView += '<input type="text" placeholder="Enter Email" name="email">';
            homeView += '<label for="mobile"><b>Mobile</b></label>';
            homeView += '<input type="text" placeholder="Mobile" name="mobile">';
            homeView += '<button type="button" class="registerbtn">Register</button>';
        homeView += '</div>';
        homeView += '<div class="container signin">';
            homeView += '<p>Already have an account? <a href="#">Sign in</a>.</p>';
        homeView += '</div>';
    homeView += '</form>';

	var HomeView = Backbone.View.extend({
	    template: homeView,
	    initialize: function () {
	        this.render();
	    },
	    render: function () {
	        this.$el.html(this.template);
	        setTimeout(function() {
	        	new UserInputView();
	        },3000)
	        
	    }
	});
	  

	var AboutView = Backbone.View.extend({
	    template: '<div id="myGrid" style="height: 200px;width:800px;" class="ag-theme-balham"></div>',
	    initialize: function () {
	        this.render();
	    },
	    render: function () {
	        this.$el.html(this.template);
	        setTimeout(function() {
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
				var payload = {"email":"test@test.com","mobile":"3434344343"};
						data.push(payload);
												
						gridOptions.api.setRowData(data);
				var ListView = Backbone.View.extend({		
					render : function() {
									
						//var payload = {"email":this.model.get('email'),"mobile":this.model.get('mobile')};
						
						return this;
					}
				});
	        }, 1000)
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
