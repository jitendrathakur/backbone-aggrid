(function($) {

	var UserInputView = Backbone.View.extend({

		el : '#UserInput',

		initialize : function() {
			this.doctorListView = new DoctorListView();
		},

		events : {
			'click button' : 'addDoctorCollection'
		},

		addDoctorCollection : function(e) {
			
			var doctor = new Doctor({
				name : this.$('input').val()
			});
			this.doctorListView.collection.add(doctor);
		}
	});

	var Doctor = Backbone.Model.extend({
		initialize : function() {
			this.name = 'name'
		}
	});

	var ListView = Backbone.View.extend({
		tagName : 'li',
		render : function() {
			$(this.el).html('Mr ' + this.model.get('name'));
			return this;
		}
	});

	var DoctorList = Backbone.Collection.extend({
		model : Doctor
	});

	var DoctorListView = Backbone.View.extend({

		el : '#DoctorList',

		initialize : function() {
			
			_.bindAll(this, 'render', 'appendToDoctorList');
			this.collection = new DoctorList();
			this.collection.bind('add', this.appendToDoctorList);
		},

		render:function(){

			$.each(this.collection.models, function(i, doctorObj){
				self.appendToDoctorList(doctorObj);
			});
		},

		appendToDoctorList : function(doctorObj) {
			var listView = new ListView({
				model : doctorObj
			});
			$(this.el).append(listView.render().el);
		}
	});

	new UserInputView();

})(jQuery);
