define(['Backbone', 'marionette', 'underscore', 'text!app/views/tabs/revisions.tpl'], function(Backbone, Marionette, _, template) {


    var RevisionView = Marionette.ItemView.extend({
        tagname: 'li',
        template: _.template(template),
        events: {
            'click .revert': 'revert',
            'click .viewDiff': 'viewDiff'
        },
        revert: function(e) {
            e.preventDefault();
        },
        viewDiff: function(e) {
            e.preventDefault();
        }
        
    }); 

    var RevisionsView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'reverseOrderedList',
        itemView: RevisionView
    });

    return RevisionsView;
}); 