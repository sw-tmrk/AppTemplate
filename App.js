Ext.define('CustomApp', {
  extend: 'Rally.app.App',
  componentCls: 'app',

  launch: function() {
    Rally.data.ModelFactory.getModel({
      type: 'UserStory',
      success: function(model) {
        this.grid = this.add({
          xtype: 'rallygrid',
          model: model,
          columnCfgs: [
            'FormattedID',
            'Name',
            'Notes',
            'Owner'
          ],
          storeConfig: {
            filters: [
              {
              property: 'ScheduleState',
              operator: '=',
              value: 'Accepted'
            }
            ]
          }
        });
      },
      scope: this
    });
  }
});

Rally.launchApp('CustomApp', {
  name: 'Grid Example'
});
