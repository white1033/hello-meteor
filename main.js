Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
    Template.body.helpers({
        messages() {
            return Messages.find({}, {sort: {createdAt: -1}});
        }
    })

    Template.body.events({
        "submit form": function(e, t) {
            let text = $(e.target).find("#inputMessage").val();
            let user = $(e.target).find("#inputUser").val();
            $("form > input").val("");
            if (user === "") {
                user = "aya";
            }
            let message = {
                text,
                user,
                from: "db",
                createdAt: new Date(),
            };
            Messages.insert(message);
        }
    })
}

