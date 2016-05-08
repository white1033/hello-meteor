Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
    Template.body.helpers({
        messages() {
            return Messages.find({}, {sort: {createdAt: -1}});
        }
    })

    Template.body.events({
        "change #inputMessage": function(e, t) {
            let text = $(e.target).val();
            $(e.target).val("");
            let message = {
                text,
                from: "db",
                createdAt: new Date(),
            };
            Messages.insert(message);
        }
    })
}

