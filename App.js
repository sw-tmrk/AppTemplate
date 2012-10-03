 Ext.define('CustomApp', {
     extend: 'Rally.app.App',
     componentCls: 'app',

     launch: function() {
         Ext.create('Rally.data.WsapiDataStore', {
             model: 'UserStory',
             autoLoad: true,
             listeners: {
                 load: this._onDataLoaded,
                 scope: this
             }
         });
     },

     _onDataLoaded: function(store, data) {
         var records = [];
         Ext.Array.each(data, function(record) {
             //Perform custom actions with the data here
             //Calculations, etc.
             var portfolioItem = record.get('PortfolioItem') !== null ? record.get('PortfolioItem').get('InvestmentCategory') : null; 
             records.push({
                 ScheduleState: record.get('ScheduleState'),
                 Name: record.get('Name'),
                 Tasks: record.get('Tasks').length,
                 Defects: record.get('Defects').length,
                 InvestmentCategory: portfolioItem
             });
         });

         this.add({
             xtype: 'rallygrid',
             store: Ext.create('Rally.data.custom.Store', {
                 data: records,
                 pageSize: 5
             }),
             columnCfgs: [{
                 text: 'Name',
                 dataIndex: 'Name',
                 flex: 1
             }, {
                 text: 'Schedule State',
                 dataIndex: 'ScheduleState'
             }, {
                 text: 'Tasks',
                 dataIndex: 'Tasks'
             }, {
                 text: 'Defects',
                 dataIndex: 'Defects'
             }, {
                 text: 'Investment Category',
                 dataIndex: 'InvestmentCategory'
             }
             ]
         });
     }
 });

 Rally.launchApp('CustomApp', {
     name: 'Grid With Freeform Data Example'
 });