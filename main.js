Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
    Meteor.startup(function() {
        Meteor.subscribe('lastTenMessages', 20)
    })

    Template.body.helpers({
        messages() {
            return Messages.find({}, {sort: {createdAt: -1}});
        }
    })

    Template.body.events({
        "submit form": function(e, t) {
            e.preventDefault();
            let text = $(e.target).find("#inputMessage").val();
            $("input").val("");
            let message = {text};
            Meteor.call("createdMessage", message);
        }
    })
}

if (Meteor.isServer) {
    Meteor.publish('lastTenMessages', function(limit) {
        // console.log(this.userId)
        return Messages.find({}, {sort: {createdAt: -1}, limit})
    })

    Meteor.methods({
        createdMessage(message) {
            let user = Meteor.userId();
            if (user) {
                message.user = Meteor.user().emails[0].address;
                message.createdAt = new Date();
                Messages.insert(message);
            }
        }
    })
}
