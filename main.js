Messages = new Mongo.Collection("messages");

sampleMessages = [
    {text: "Hello Meteor! (m1)", from: "db"},
    {text: "Hello Meteor! (m2)", from: "db"},
    {text: "Hello Meteor! (m3)", from: "db"}
]

if (Meteor.isClient) {
    Template.body.helpers({
        messages() {
            return Messages.find();
        }
    })
}

if (Meteor.isServer) {
    if (Messages.find().count() === 0) {
        for (let message of sampleMessages) {
            Messages.insert(message);
        }
    }
}

