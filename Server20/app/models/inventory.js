const Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

const InventorySchema = new Schema({
	systemName: { type: String },
	description: { type: String },
	dateCreated: { type: Date,  default: Date.now },
	modelNumber: { type: String },
	serialNumber: { type: String },
	type: { type: String },

	datePurchased: { type: Date },
	vendorName: { type: String },
	poNumber: { type: String },
	documents: [{
		categoryCode: { type: Number },
		categoryName: { type: String },
		fileName: { type: String },
		default: { type: Boolean, default: true } 
	}],
	vendorContact: { type: String },
	vendorPhone: { type: String },
	vendorEmail: { type: String },

	adminUserId: { type: String },
	adminPassword: { type: String },
	IPAddress: [{ 
		description: { type: String },
		address: { type: String }
	 }],
	systemUrl: { type: String },

	maintenanceProvider: { type: String },
	maintenanceContract: { type: String },
	maintenanceCustomerNumber: { type: String },
	maintenanceContact: { type: String },
	maintenancePhone: { type: String },
	maintenanceEmail: { type: String },
	maintenanceUrl: { type: String },
	maintenaceUserId: { type: String },
	maintenancePassword: { type: String },
	maintenanceStartDate: { type: Date },
	maintenanceEndDate: { type: Date },
	systemSunsetDate: { type: Date },
	maintenanceAlert: { type: Number },
	maintenanceHistory: [{
		serviceDate: { type: Date, default: Date.now },
		servcieDetails: { type: String }
	}]

});

module.exports = Mongoose.model('Inventory', InventorySchema);